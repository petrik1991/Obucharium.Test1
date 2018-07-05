import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorDirective } from '../error.directive';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  contactId: number;
  errors: string[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required, this.phoneValidator])
  });

  constructor(
    private contactService: ContactService,
    private activetedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.loadContact();
  }

  setContact(contact: Person) {
    this.contactId = contact.id;

    this.form.setValue({
      name: contact.name,
      age: contact.age,
      number: contact.number
    });
  }

  loadContact() {
    const id = +this.activetedRoute.snapshot.paramMap.get('id');
    this.contactService
      .getContact(id)
      .subscribe(c => this.setContact(c),
        error => this.router.navigate(['404']));
  }

  save(contact: Person) {
    debugger
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
