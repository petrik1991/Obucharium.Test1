import { Component, Input, QueryList, ViewChildren, ElementRef, ContentChild } from '@angular/core';
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

  @ContentChild('colorBlock', {read: ElementRef})
  colorBlock: ElementRef;

  getProducts(): Product[]{
    return this.model.getProducts();
  }

  onClick(){
    let color: string = `#${this.getChannelColor()}${this.getChannelColor()}${this.getChannelColor()}`;
    this.colorBlock.nativeElement.style.backgroundColor = color;
  }

  getChannelColor(){
    return Math.floor(Math.random()*256).toString(16);
  }
}
