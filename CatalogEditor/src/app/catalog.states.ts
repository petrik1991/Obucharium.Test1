import { Injectable } from '@angular/core';
import { action, observable} from 'mobx';
import { Router } from '@angular/router';
import { CatalogService } from './catalog.service';

export type States = 'NAVIGATION' | 'SHOW_ITEMS' | 'EDIT_ITEM' | 'NEW_ITEM';

@Injectable()
export class CatalogStates {
  @observable private state: States = 'NAVIGATION';

  constructor(private router: Router,
    private catalogService: CatalogService){}

  @action setState(state: States) {
    this.state = state;
    
    switch(this.state){
      case 'NAVIGATION':
        if(this.catalogService.SelectedCategory != null){
          this.catalogService.SelectedCategory.isCollapsed = false;
        }
        
        this.catalogService.selectCategory(null);
        this.router.navigate(["/categories"]);
      break;
      case 'SHOW_ITEMS':
        this.router.navigate(["/products-list"]);
      break;
      case 'NEW_ITEM':
        this.router.navigate(["/addProduct/"]);
      break;
      case 'EDIT_ITEM':
        this.router.navigate(["/productDetail/" + this.catalogService.SelectedProduct.id]);
      break;
    }
  }

   @action getState(): States{
     return this.state;
   }
}