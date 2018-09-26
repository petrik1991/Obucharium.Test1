import { Component, ViewChild } from '@angular/core';
import { Model } from "./repository.model"; 
import { ProductTableComponent } from "./product-table/product-table.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model: Model = new Model();

  @ViewChild(ProductTableComponent)
  productTableChild: ProductTableComponent;

  ngAfterViewInit(){
    this.productTableChild.rows.changes.subscribe(() => {
      this.changeRowColor();
    });
    this.changeRowColor();
  }

  changeRowColor(){
    setTimeout(() => {
      this.productTableChild.rows.forEach((row, i) => {
        row.nativeElement.style.backgroundColor = i % 2 != 1 ? "aqua" : "lightgreen";
      })
    }, 0);
  }
}
