import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  people: Person[] = [
    {name: 'Ilya', surname: "Petrov", number: '111111'},
    {name: 'Ivan', surname: "Sidorov", number: '222222'},
    {name: 'Dima', surname: "Ivanov", number: '333333'}
  ];

  selectedPerson: Person;

  constructor() { }

  ngOnInit() {
  }

  onDelete(person: Person){
    this.people.splice(this.people.indexOf(person), 1);
  }

  onSelect(person: Person){
    this.selectedPerson = person;
  }

}
