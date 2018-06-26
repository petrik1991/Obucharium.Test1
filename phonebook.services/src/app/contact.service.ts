import { Injectable } from '@angular/core';
import { Contacts } from './fake-contacts';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {}

  getContacts(): Person[]{
    return Contacts;
  }

  getContact(id: number): Person{
    return Contacts.find(c => c.id == id);
  }
}
