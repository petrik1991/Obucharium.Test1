import { Component } from '@angular/core';
import { Model } from './model/repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private model: Model){}
}
