import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Observable<Person[]>;

  selectedPerson: Person;

  isLoading: boolean = false;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.people = this.activatedRoute
    .params
    .pipe(
      tap(() => this.isLoading = true),
      switchMap(params => this.getContacts(params['term'])
      .pipe(finalize(() => this.isLoading = false)))
    );
  }

  getContacts(term: string): Observable<Person[]>{
    if(term){
      return this.contactService.searchcontacts(term);
    }else{
      return this.contactService.getContacts();
    }
    
  }

  onDelete(contact: Person){
    this.contactService.deleteContact(contact);
  }

  onSelect(contact: Person){
    this.selectedPerson = contact;
  }

}
