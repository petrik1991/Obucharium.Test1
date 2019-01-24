import { Component, Input } from '@angular/core';
import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';
import { observable, action } from 'mobx';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

@Injectable()
export class NavigationComponent {

  @Input()
  @observable categories: Category[] = [];

  constructor(private productService: ProductsServiceService) { };

  @action onCategoryClick(event: MouseEvent, clickedCategory: Category){
    event.stopPropagation();

    let category: Category = this.productService.compareCategories(clickedCategory) && this.productService.needShowCategory(clickedCategory) ? null : clickedCategory;
    
    this.productService.selectCategory(category);
  }

  needShowNode(category: Category): boolean{
    return this.productService.needShowCategory(category);
  }

  checkCategory(category: Category): string{
    return this.needShowNode(category) || !this.productService.hasSubcategory(category)? 'collapsed' : '';
  }
}
