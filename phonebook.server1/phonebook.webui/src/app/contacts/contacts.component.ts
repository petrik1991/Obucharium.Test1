import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Person[];

  selectedPerson: Person;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts(){
    this.contactService.getContacts().subscribe(c => this.people = c);
  }

  onDelete(person: Person){
    this.people.splice(this.people.indexOf(person), 1);
  }

  onSelect(person: Person){
    this.selectedPerson = person;
  }

}
