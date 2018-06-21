import { Component, OnInit } from '@angular/core';
import { ContactsComponent } from '../contacts/contacts.component'
import { Person } from "../person";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  name: string;
  surname: string;
  number: string;
  person: Person;

  constructor(private contacts: ContactsComponent) { }

  ngOnInit() {
  }

  onAddPerson(name: string, surname: string, number: string){
    this.contacts.people.push({name: name, surname: surname, number: number});
  }

}
