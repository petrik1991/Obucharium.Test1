import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { GroupService } from '../group.service';
import { Person } from "../person";
import { Location } from "@angular/common";
import { PersonWrapper } from '../personWrapper';
import { Group } from '../group';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: PersonWrapper;
  groups: Group[];
  group: Group;

  constructor(private contactservice: ContactService,
    private groupService: GroupService,
    private location: Location) { }

  ngOnInit() {
    this.contact = new PersonWrapper();
    this.groupService.getGroups()
    .subscribe(groups => {
        let emptyGroup = {id: -1, name:'-'};
        groups.push(emptyGroup);
        this.groups = groups;
      } 
    );
  }

  onAddPerson(contact: PersonWrapper, group: Group){
    let created: Person = new Person();
      created.groupId = group.id == -1 ? null : group.id,
      created.name = contact.name,
      created.age = contact.age,
      created.number = contact.number
    
    this.contactservice.addContact(created).subscribe(() => this.goBack());
  }

  goBack(){
    this.location.back();
  }

}
