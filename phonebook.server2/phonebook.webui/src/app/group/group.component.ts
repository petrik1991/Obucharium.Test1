import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { tap, finalize, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Observable<Group[]>;

  isLoading: boolean = false;

  constructor(private groupService: GroupService,
  private activatedRoute: ActivatedRoute,
  private contactService: ContactService) { }

  ngOnInit() {
    this.groups = this.activatedRoute
    .params
    .pipe(
      tap(() => this.isLoading = true),
      () => this.getGroups().pipe(finalize(() => this.isLoading = false))
    );
  }

  getGroups(): Observable<Group[]>{
    return this.groupService.getGroups();
  }

  onDelete(id: number) {
    this.contactService.getContacts().pipe(
      tap(contacts => {
        contacts.forEach(c => {
          if (c.groupId === id) {
            c.groupId = null;
            this.contactService.updateContact(c);
          }
        });
      })
    );

    this.groupService.deleteGroup(id).subscribe(() => {
      this.groups = this.groups.pipe(
        tap(groups => {
          const index = groups.findIndex(g => g.id == id);
          if (index > -1) {
            groups.splice(index, 1);
          }
        })
      );
    });
  }

}
