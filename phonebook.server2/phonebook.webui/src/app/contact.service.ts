import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { LoggerService } from './logger.service';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsUrl = 'http://localhost:57628/api/Contacts';

  constructor(private http: HttpClient,
     private logger: LoggerService,
     private errorHandler: ErrorHandlerService) {}

  getContacts(): Observable<Person[]>{
    return this.http.get<Person[]>(this.contactsUrl)
    .pipe(tap(() => this.logger.debug("contacts are loaded")));
  }

  getContact(id: number): Observable<Person>{
    return this.http.get<Person>(`${this.contactsUrl}/${id}`)
    .pipe(tap(contact => this.logger.debug(`contact with id='${contact.id}' is loaded`)));
  }

  updateContact(contact: Person): Observable<any> {
    return this.http.put(`${this.contactsUrl}/${contact.id}`, contact)
    .pipe(
      tap(
        () => this.logger.debug(`contact with id='${contact.id}' is updated`)),
        catchError(this.errorHandler.handlerUpdateError()));
  }

  deleteContact(id: number): Observable<any>{
    return this.http.delete(`${this.contactsUrl}/${id}`)
    .pipe(tap(() => this.logger.debug(`contact with id='${id}' is deleted`)));
  }

  addContact(contact): Observable<any>{
    contact.id;
    return this.http.post(`${this.contactsUrl}`, contact)
    .pipe(tap(() => this.logger.debug(`new contact added`)));
  }

  searchcontacts(term: string){
    return this.http.get<Person[]>(`${this.contactsUrl}?term=${term}`)
    .pipe(tap(() => this.logger.debug("search contacts")));
  }
}
