import { Injectable } from '@angular/core';
import { Category } from './model/category.model';
import { Product } from './model/product.model';
import { observable, action } from 'mobx';
import { Model } from './model/repository.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {

  @observable selectedCategory: Category = null;

  constructor(private model: Model) { }

  @action selectCategory(category: Category){
    if(category == null){
      this.selectedCategory.isCollapsed = false;
      this.selectedCategory = category;
    }else{
      category.isCollapsed = !category.isCollapsed;
      this.selectedCategory = category;
    }
  }

  getProducts(): Product[]{
    return this.model.getProducts();
  }

  neesShowList(): boolean{
    return this.selectedCategory != null && this.selectedCategory.subcategory == null;
  }

  needShowCategory(category: Category): boolean{
    return category.isCollapsed;
  }

  compareCategories(category: Category): boolean{
    return this.selectedCategory != null && category == this.selectedCategory;
  }

  hasSubcategory(category: Category):boolean{
    return category.subcategory != null
  }

  getProductsOnPage():Product[]{
    return this.model.getProducts().map(product => 
      {
        if(this.findCategory(product.category)){
          return product;
        }
      }
    );
  }

  private findCategory(category: Category): boolean{
    if(category == this.selectedCategory){
      return true;
    }

    let result = false;
    category.subcategory.forEach(cat => 
    {
      result = this.findCategory(cat);
    });

    return result;
  }

}
