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

  person: Person;

  constructor(private contactService: ContactService, private activetedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact(){
    const id = +this.activetedRoute.snapshot.paramMap.get('id');
    this.person = this.contactService.getContact(id);
  }

  goBack(){
    this.location.back();
  }
}
