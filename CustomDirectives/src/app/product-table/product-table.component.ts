import { Component, Input, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Product } from "../product.model";
import { Model } from "../repository.model";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {

  @Input("table-products-model")
  model: Model;

  @ViewChildren('row', {read: ElementRef})
  rows: QueryList<ElementRef>;

  getProducts(): Product[]{
    return this.model.getProducts();
  }
}
