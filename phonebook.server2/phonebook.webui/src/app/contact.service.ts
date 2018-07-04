import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { LoggerService } from './logger.service';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsUrl = 'http://localhost:57628/api/Contacts';

  constructor(private http: HttpClient, private logger: LoggerService) {}

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
    .pipe(tap(() => this.logger.debug(`contact with id='${contact.id}' is updated`)),
    catchError(this.handlerUpdateError()));
  }

  deleteContact(contact: Person): Observable<any>{
    return this.http.delete(`${this.contactsUrl}/${contact.id}`)
    .pipe(tap(() => this.logger.debug(`contact with id='${contact.id}' is deleted`)));
  }

  addContact(contact): Observable<any>{
    contact.id;
    return this.http.post(`${this.contactsUrl}`, contact)
    .pipe(tap(() => this.logger.debug(`new contact added`)));
  }

  private handleError<T>(action: string = "action", result?: T){
    return (error: any) => {
      this.logger.debug(action);
      return of(result);
    }
  }

  handlerUpdateError(){
    return (error: any) => {
      this.logger.debug(error.message);

      let messages: string[] = [];
      if(error.error.ModelState){
        for(let field in error.error.ModelState)        {
          messages = messages.concat(error.error.ModelState[field]);
        }
      }
      else{
        messages.push(error.message);
      }

      return throwError({
        messages: messages
      })
    }
  }

  searchcontacts(term: string){
    return this.http.get<Person[]>(`${this.contactsUrl}?term=${term}`)
    .pipe(tap(() => this.logger.debug("search contacts")));
  }
}
