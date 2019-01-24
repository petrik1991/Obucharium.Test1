import { Component, OnInit } from '@angular/core';
import { Model } from '../model/repository.model';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { observable, action } from 'mobx';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent {
  
  @observable products: Product[] = [];
  maxProductsOnPage: Number = 5;
  selectedPage: Number = 1;

  constructor(private productService: ProductsServiceService) {}

  getProductsOnPage(): Product[]{
    return this.productService.getProductsOnPage();
  }

  getProducts(): Product[]{
    return this.productService.getProducts();
  }

  checkSelectedProduct(): boolean{
    return this.productService.neesShowList();
  }

  getNumberOfProducts(): Number[]{
    return this.getProductsOnPage().map((p, i) => { return i; });
  }

  onSelectPage(value: number){
    this.selectedPage = value + 1;
  }
}
