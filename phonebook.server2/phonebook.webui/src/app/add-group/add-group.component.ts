import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  id: number;
  errors: string[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private groupService: GroupService,
    private location: Location
  ) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.setGroup( Math.max.apply(null, groups.map(function(p) { return p.id; })) + 1);
    });
  }

  setGroup(id: number) {
    this.id = id;

    this.form.setValue({
      name: ''
    });
  }

  onSubmit() {
    const model = this.form.value;
    const group: Group = {
      id: this.id,
      name: model.name
    };

    this.groupService.addGroup(group)
      .subscribe(() => this.goBack(), errors => this.errors = errors.messages);
  }

  goBack(){
    this.location.back();
  }
}