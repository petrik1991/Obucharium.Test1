import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Person[];

  selectedPerson: Person;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.loadContacts(params['term']));
  }

  loadContacts(term: string){
    if(term){
      this.contactService.searchcontacts(term).subscribe(c => this.people = c);
    }else{
      this.contactService.getContacts().subscribe(c => this.people = c);
    }
    
  }

  onDelete(contact: Person){
    this.contactService.deleteContact(contact).subscribe(
      () => {
        let index = this.people.findIndex(item => item == contact);
        this.people.splice(index, 1);
      }
    );
  }

  onSelect(contact: Person){
    this.selectedPerson = contact;
  }

}
