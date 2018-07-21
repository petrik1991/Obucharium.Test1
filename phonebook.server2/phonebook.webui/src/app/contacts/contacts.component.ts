import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { GroupService } from '../group.service';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { PersonWrapper } from '../personWrapper';
import { Group } from '../group';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Observable<PersonWrapper[]>;
  selectedPerson: PersonWrapper;
  isLoading: boolean = false;

  constructor(private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService) { }

  ngOnInit() {
    this.people = this.activatedRoute
    .params
    .pipe(
      tap(() => this.isLoading = true),
      switchMap(params => this.getContacts(params['term'])
      .pipe(finalize(() => this.isLoading = false)))
    );
  }

  getContacts(term: string): Observable<PersonWrapper[]>{
    let gettedContacts: Observable<Person[]>;

    if(term){
      gettedContacts = this.contactService.searchcontacts(term);
    }else{
      gettedContacts = this.contactService.getContacts();
    }

    return forkJoin(gettedContacts,
    this.groupService.getGroups()).pipe(
      map(([contacts, groups])=>{
        let wrappedContacts: PersonWrapper[] = [];
        contacts.forEach(c => {
          if(c.groupId != null){
            let index: number = groups.findIndex(g => g.id == c.groupId);
            wrappedContacts.push(PersonWrapper.createPersonWrap(c, index > -1 ? groups[index].name : ""));
          }else{
            wrappedContacts.push(PersonWrapper.createPersonWrap(c, ""));
          }
        });
        return wrappedContacts; 
      })
    );
  }

  onDelete(contact: PersonWrapper){
    this.contactService.deleteContact(contact.id).
    subscribe(() => {
      this.people = this.people.pipe(
        tap(people => {
          const index = people.indexOf(contact);
          if (index > -1) {
            people.splice(index, 1);
          }
        })
      );
    });
  }

  onSelect(contact: PersonWrapper){
    this.selectedPerson = contact;
  }
}
