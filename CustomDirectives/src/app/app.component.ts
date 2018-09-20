import { Component } from '@angular/core';
import { Product } from "../product.model";
import { Model } from "../repository.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model: Model = new Model();
  findProduct: Product = new Product();

  getProducts(): Product[]{
    return this.model.getProducts();
  }

  getProduct(id: number): Product {
    this.findProduct = this.model.getProduct(id);
    if(this.findProduct == null)
    {
        this.findProduct = new Product();
    }
    return this.findProduct;
  }
}
