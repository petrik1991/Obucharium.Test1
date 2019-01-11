import { Component, Input } from '@angular/core';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  @Input()
  categories: Category[] = [];
  currentCategory = null;

  constructor() { };

  onCategoryClick(category: Category){
    if(this.currentCategory != null && this.currentCategory == category){
      this.currentCategory = null;
      return;
    }
    this.currentCategory = category;
  }

  checkCategory(category: Category){
    return this.currentCategory != null && category == this.currentCategory;
  }
}
