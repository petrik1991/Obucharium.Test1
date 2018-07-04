import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  contact: Person;
  errors: string[] = [];

  constructor(private contactService: ContactService, private activetedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact(){
    const id = +this.activetedRoute.snapshot.paramMap.get('id');
    this.contactService.getContact(id).subscribe(c => this.contact = c);
  }
  
  save(){
    debugger
    this.contactService.updateContact(this.contact).subscribe(() => this.goBack(), 
    errors => this.errors = errors.messages);
  }

  goBack(){
    this.location.back();
  }
}
