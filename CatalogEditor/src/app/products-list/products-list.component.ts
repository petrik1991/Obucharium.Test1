import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { CatalogService } from '../catalog.service';
import { CatalogStates } from '../catalog.states';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent {
  
  maxProductsOnPage: number = 5;
  selectedPage: number = 1;
  ids: number[] = [];

  constructor(
    private catalogService: CatalogService,
    private catalogStates: CatalogStates) {}

  getProductsCountOnPage(): number[]{
    return new Array<number>(Math.ceil(this.getProductsByCategory().length / this.maxProductsOnPage));
  }

  getProductsOnPage(): Product[]{
    return this.getProductsByCategory().slice(this.startInterval() - 1, this.endInterval());
  }

  onSelectPage(value: number){
    this.selectedPage = value + 1;
  }

  isCategorySelected(): boolean{
    if(this.catalogService.SelectedCategory == null){
      this.catalogStates.setState('NAVIGATION');
      return false;
    }
    return true;
  }

  deleteProduct(){
    if(!!this.catalogService.SelectedProduct){
      this.catalogService.deleteProduct(this.catalogService.SelectedProduct.id);
    }

    if(this.ids.length > 0){
      this.ids.forEach((id) => {
        this.catalogService.deleteProduct(id);
      })
      this.ids = [];
    }
  }

  onChecked(id: number){
    this.ids.push(id);
  }

  equalSelected(id: number){
    let selected = this.catalogService.SelectedProduct
    return !selected ? false : selected.id == id;
  }

  onSelectRow(product: Product){
    this.catalogService.selectProduct(product);
  }

  addNewProduct(){
    this.catalogStates.setState('NEW_ITEM');
  }

  editRow(product: Product){
    this.catalogService.selectProduct(product);
    this.catalogStates.setState('EDIT_ITEM');
  }

  countInterval(): string{
    return this.startInterval() + ' - ' + this.endInterval() + ' of ' + this.getProductsByCategory().length;
  }

  getProductsByCategory(): Product[]{
    return this.catalogService.getProducts().map(product => 
      {
        if(this.findCategory(product.category)){
          return product;
        }
      }
    );
  }

  private findCategory(category: Category): boolean{
    if(category == this.catalogService.SelectedCategory){
      return true;
    }

    let result = false;
    category.subcategory.forEach(cat => 
    {
      result = this.findCategory(cat);
    });

    return result;
  }

  private startInterval(): number{
    return this.selectedPage * this.maxProductsOnPage - this.maxProductsOnPage + 1;
  }

  private endInterval(): number{
    let productsCount = this.getProductsByCategory().length;
    let end = this.selectedPage * this.maxProductsOnPage;
    return end > productsCount ? productsCount : end;
  }
}
