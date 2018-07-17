import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { tap, finalize, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Observable<Group[]>;

  isLoading: boolean = false;

  constructor(private groupService: GroupService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.groups = this.activatedRoute
    .params
    .pipe(
      tap(() => this.isLoading = true),
      switchMap(params => this.getGroups().pipe(finalize(() => this.isLoading = false)))
    );
  }

  getGroups(): Observable<Group[]>{
    return this.groupService.getGroups();
  }

}
