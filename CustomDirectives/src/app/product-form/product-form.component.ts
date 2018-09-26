import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Product } from "../product.model";
import { Model } from "../repository.model";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input("products-model")
  model: Model;
  
  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    category: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
    price: new FormControl("", Validators.compose([Validators.required, Validators.pattern("[0-9\.]+")]))
  });

  product: Product = new Product();

  getProduct(id: number): Product {
    this.product = this.model.getProduct(id);
    if(this.product == null)
    {
        this.product = new Product();
    }
    return this.product;
  }

  addProduct(procuct: Product){
    this.model.saveProduct(procuct);
  }

  submitForm(form: any) {
    if (form.valid) {
      this.addProduct(this.product);
      this.product = new Product();
      this.form.reset();
    }
  }
}
