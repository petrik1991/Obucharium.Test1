import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Person } from "../person";
import { Location } from "@angular/common";

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

  constructor(private contactservice: ContactService, private location: Location) { }

  ngOnInit() {
  }

  onAddPerson(name: string, surname: string, number: string){
    this.contactservice.addContact(name, surname, number);
    this.goBack();
  }

  goBack(){
    this.location.back();
  }

}
