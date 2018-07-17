import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service'; 
import { Group } from './group';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsUrl = 'http://localhost:57628/api/Groups';

  constructor(private http: HttpClient,
  private logger: LoggerService) { }

  getGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(this.groupsUrl)
    .pipe(tap(() => this.logger.debug("groups are loaded")));
  }
}
