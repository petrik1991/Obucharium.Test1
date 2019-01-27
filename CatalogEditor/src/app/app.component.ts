import { Component } from '@angular/core';
import { CatalogStates } from './catalog.states';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private catalogStates: CatalogStates,
    private catalogService: CatalogService){}

    onClose(){
      switch (this.catalogStates.getState()){
        case 'SHOW_ITEMS':
          this.catalogStates.setState('NAVIGATION');
        break;
        case 'NEW_ITEM':
          this.catalogStates.setState('SHOW_ITEMS');
        break;
        case 'EDIT_ITEM':
          this.catalogStates.setState('SHOW_ITEMS');
        break;
      }
    }

    showHeaderName(){
      switch (this.catalogStates.getState()){
        case 'NAVIGATION':
          return "Каталог";
        break;
        case 'SHOW_ITEMS':
          return this.catalogService.SelectedCategory.name;
        break;
        case 'NEW_ITEM':
          return "Новый товар";
        break;
        case 'EDIT_ITEM':
          return "Товар " + this.catalogService.SelectedProduct.name;
        break;
      }
    }
}
