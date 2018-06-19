import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Person[] = [
    {name: 'Ilya', number: '111111'},
    {name: 'Ivan', number: '222222'},
    {name: 'Dima', number: '333333'}
  ];

  selectedPerson: Person;

  constructor() { }

  ngOnInit() {
  }

  onSelect(person: Person){
    this.selectedPerson = person;
  }

}
