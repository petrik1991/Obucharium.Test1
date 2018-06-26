import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
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

  constructor(private contactservice: ContactService) { }

  ngOnInit() {
  }

  onAddPerson(name: string, surname: string, number: string){
    this.contactservice.getContacts().push({id: this.contactservice.getContacts().length, name: name, surname: surname, number: number});
  }

}
