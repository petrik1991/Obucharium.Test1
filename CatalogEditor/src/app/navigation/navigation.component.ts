import { Component, Input } from '@angular/core';
import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';
import { observable, action } from 'mobx';
import { CatalogService } from '../catalog.service';
import { CatalogStates } from '../catalog.states';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

@Injectable()
export class NavigationComponent {

  @Input()
  @observable categories: Category[] = [];

  constructor(
    private productService: CatalogService,
    private catalogState: CatalogStates) {
        this.categories = this.productService.getCategories();
    };

  @action onCategoryClick(event: MouseEvent, clickedCategory: Category){
    event.stopPropagation();

    clickedCategory.isCollapsed = !clickedCategory.isCollapsed;
    clickedCategory = !clickedCategory.subcategory && clickedCategory.isCollapsed ? clickedCategory : null;
    
    this.productService.selectCategory(clickedCategory);
    this.catalogState.setState(!!clickedCategory ? 'SHOW_ITEMS' : 'NAVIGATION');
  }

  needShowNode(category: Category): boolean{
    return category.isCollapsed;
  }

  checkCategory(category: Category): string{
    return this.needShowNode(category) ? 'collapsed' : '';
  }
}
