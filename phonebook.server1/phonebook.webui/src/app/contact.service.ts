import { Injectable } from '@angular/core';
import { Contacts } from './fake-contacts';
import { Person } from './person';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsUrl = 'http://localhost:57628/api/Contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Person[]>{
    let p = this.http.get<Person[]>(this.contactsUrl);
    return p;
  }

  getContact(id: number): Observable<Person>{
    return this.http.get<Person>(`${this.contactsUrl}/${id}`);
  }

  updateContact(contact: Person){
    this.http.put(`${this.contactsUrl}/${contact.id}`, contact);
  }

  deleteContact(id: number){
    this.http.delete(`${this.contactsUrl}/${id}`);
  }

  addContact(name:string, number: string){
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

    let contact: Person = {id: id, name: name, number: number};
    this.http.post(`${this.contactsUrl}`, contact);
  }

  generateId(): number{
    return Math.round(Math.random() * 100);
  }
}
