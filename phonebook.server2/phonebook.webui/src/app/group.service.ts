import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service'; 
import { Group } from './group';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsUrl = 'http://localhost:57628/api/Groups';

  constructor(private http: HttpClient,
  private logger: LoggerService,
  private errorHandler: ErrorHandlerService) { }

  getGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(this.groupsUrl)
    .pipe(
      tap(() => this.logger.debug("groups are loaded")),
      catchError(this.errorHandler.handleError<Group[]>('getGroups', [])));
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.put(`${this.groupsUrl}/${group.id}`, group)
    .pipe(tap(() => this.logger.debug(`group with id='${group.id}' is updated`)),
    catchError(this.errorHandler.handlerUpdateError()));
  }

  deleteGroup(id: number): Observable<any>{
    return this.http.delete(`${this.groupsUrl}/${id}`)
    .pipe(
      tap(() => this.logger.debug(`group with id='${id}' is deleted`)),
      catchError(this.errorHandler.handlerUpdateError()));
  }

  addGroup(group): Observable<any>{
    group.id;
    return this.http.post(`${this.groupsUrl}`, group)
    .pipe(
      tap(() => this.logger.debug(`new group added`)),
      catchError(this.errorHandler.handlerUpdateError()));
  }

  getGroup(id: number): Observable<Group>{
    return this.http.get<Group>(`${this.groupsUrl}/${id}`)
    .pipe(
      tap(group => this.logger.debug(`group with id='${group.id}' is loaded`)),
      catchError(this.errorHandler.handlerUpdateError()));
  }
}
