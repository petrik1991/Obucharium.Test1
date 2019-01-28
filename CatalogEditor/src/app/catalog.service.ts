import { Injectable } from '@angular/core';
import { Category } from './model/category.model';
import { Product } from './model/product.model';
import { observable, action, computed } from 'mobx';
import { Model } from './model/repository.model';

@Injectable({
  providedIn: 'root'
})

export class CatalogService {

  @observable private selectedCategory: Category = null;
  @observable private selectedProduct: Product = null;

  constructor(private model: Model) { }

  @action selectCategory(category: Category){
    this.selectedCategory = category;
  }

  @computed get SelectedCategory(): Category{
    return this.selectedCategory;
  }

  @action selectProduct(product: Product){
    this.selectedProduct = product;
  }

  @computed get SelectedProduct(): Product{
    return this.selectedProduct;
  }

  deleteProduct(id: number){
    this.model.deleteProduct(id);
  }

  getProductById(id: number): Product{
    return this.getProducts().find((product)=>{
      return product.id == id;
    });
  }

  getProducts(): Product[]{
    return this.model.getProducts();
  }

  getCategories(): Category[]{
    return !!this.selectedCategory ? this.selectedCategory.subcategory: this.model.getCategories();
  }

  compareCategories(category: Category): boolean{
    return this.selectedCategory != null && category == this.selectedCategory;
  }

  saveProduct(newProduct: Product){
    this.model.saveProduct(newProduct);
  }

}
