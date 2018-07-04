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

  contact: Person;

  constructor(private contactservice: ContactService, private location: Location) { }

  ngOnInit() {
    this.contact = new Person();
  }

  onAddPerson(name: string, age: string, number: string){
    this.contactservice.addContact(this.contact).subscribe(() => this.goBack());
  }

  goBack(){
    this.location.back();
  }

}
