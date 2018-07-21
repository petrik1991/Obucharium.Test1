import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  contactId: number;
  errors: string[] = [];
  selectedGroup: Group;
  groups: Group[];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required, this.phoneValidator]),
    group: new FormControl(''),
  });

  constructor(
    private contactService: ContactService,
    private activetedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private groupService: GroupService) { }

  ngOnInit() {
    this.loadContact();
  }

  setContact(contact: Person) {
    this.contactId = contact.id;

    this.form.setValue({
      name: contact.name,
      age: contact.age,
      number: contact.number,
      group: this.selectedGroup
    });
  }

  loadContact() {
    const id = +this.activetedRoute.snapshot.paramMap.get('id');
    this.contactService
      .getContact(id)
      .subscribe(c => {
        this.groupService.getGroups().subscribe(groups => {
          let emptyGroup = {id: -1, name:'-'};
          groups.push(emptyGroup);
          this.groups = groups;
          if(c.groupId){
            this.selectedGroup = groups.find(g => g.id == c.groupId);
          }else{
            this.selectedGroup = emptyGroup;
          }
          this.setContact(c);
        })
        },
        error => this.router.navigate(['404']));
  }

  save(contact: Person) {
    this.contactService.updateContact(contact).subscribe(() => this.goBack(),
      errors => this.errors = errors.messages);
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const model = this.form.value;
    const contact: Person = {
      id: this.contactId,
      groupId: model.group.id == -1 ? null : model.group.id,
      name: model.name,
      age: model.age,
      number: model.number
    }

    this.save(contact);
  }

  phoneValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || /^\d+$/.test(control.value)) {
      return null;
    }
    return { 'numberValidator': true };
  }
}
