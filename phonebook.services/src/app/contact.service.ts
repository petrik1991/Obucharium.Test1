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

  deleteContact(contact: Person){
    let index = Contacts.findIndex(c => c == contact);
    Contacts.splice(index, 1);
  }

  addContact(name:string, surname: string, number: string){
    let id = Contacts.findIndex(c => c.id == Contacts.length);

    if(id > -1){
      while(true){
        id = this.generateId();
        if(Contacts.findIndex(c => c.id == id) < 0){
          break;
        }
      }
    }else{
      id = Contacts.length;
    }

    Contacts.push({id: id, name: name, surname: surname, number: number});
  }

  generateId(): number{
    return Math.round(Math.random() * 100);
  }
}
