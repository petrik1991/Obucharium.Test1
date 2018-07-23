import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { GroupService } from '../group.service';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonWrapper } from '../personWrapper';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: PersonWrapper[];
  selectedPerson: PersonWrapper;
  isLoading: boolean = false;

  constructor(private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getContacts(this.activatedRoute.params['term']);    
  }

  getContacts(term: string): void{
    let gettedContacts: Observable<Person[]>;

    if(term){
      gettedContacts = this.contactService.searchcontacts(term);
    }else{
      gettedContacts = this.contactService.getContacts();
    }

    this.groupService.getGroups()
    .subscribe(groups => {
      gettedContacts
      .subscribe(contacts => {
        let wrappedContacts: PersonWrapper[] = [];
        contacts.forEach(c => {
          if(c.groupId != null){
            let index: number = groups.findIndex(g => g.id == c.groupId);
            wrappedContacts.push(PersonWrapper.createPersonWrap(c, index > -1 ? groups[index].name : ""));
          }else{
            wrappedContacts.push(PersonWrapper.createPersonWrap(c, ""));
          }
        });
        this.people = wrappedContacts;
        this.isLoading = false; 
      })
    })
  }

  onDelete(contact: PersonWrapper){
    this.contactService.deleteContact(contact.id).
    subscribe(() => {
        const index = this.people.indexOf(contact);
        if (index > -1) {
          this.people.splice(index, 1);
        }
    });
  }

  onSelect(contact: PersonWrapper){
    this.selectedPerson = contact;
  }
}
