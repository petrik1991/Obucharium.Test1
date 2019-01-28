import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { CatalogService } from '../catalog.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  newProduct: Product = new Product();
  product: Product = null;
  basePhotoImg: string = "..//..//assets/nophoto.jpg";

  constructor(private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private location: Location){}

  form = new FormGroup({
    photo: new FormControl(''),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.compose([Validators.required,
                                Validators.pattern("[0-9\.]+")])),
    qty: new FormControl('', Validators.pattern("[0-9]+"))
  });

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    let id = +this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.product = this.catalogService.getProductById(id);
      this.setProduct(this.product);
    }
  }

  setProduct(product: Product){
    this.form.setValue({
      photo: product.photo,
      name: product.name,
      price: product.price,
      qty: product.qty,
    })
  }

  getErrors(control: any, controlName: string): string[]{
    let errors: string[] = [];

    if(control.errors){
      for(let error in control.errors){
        switch(error){
          case "required":
            errors.push(`Поле ${controlName} обязательно для ввода`);
          break;
          case "pattern":
            errors.push(`Поле ${controlName} должно содержать только цифры`);
          break;
        }
      }
    }

    return errors;
  }

  uploadFile(elem: HTMLInputElement){
    elem.click();
  }

  onChange(event: Event, elem: HTMLImageElement){
    let input = event.target as HTMLInputElement;
    let file: File = input.files[0];
    elem.src = "..//..//assets/" + file.name;
  }

  onSubmit(elem: HTMLImageElement){
    if(this.form.valid){
      const model = this.form.value;
      let product: Product = {
        photo: "..//.." + elem.src.replace(document.location.origin, ""),
        name: model.name,
        price: model.price,
        qty: model.qty,
        category: !!this.product ? this.product.category : this.catalogService.SelectedCategory,
        id: !!this.product ? this.product.id : null
      }
      
      this.catalogService.saveProduct(product);
      this.location.back();
    }
  }

  private getPhotoPath(){
    return !this.product ? this.basePhotoImg : !!this.product.photo ? this.product.photo : this.basePhotoImg;
  }

  private resetForm(elem: HTMLImageElement){
      if(!!this.product){
        elem.src = this.getPhotoPath();
        this.setProduct(this.product);
      }else{
        elem.src = this.basePhotoImg;
        this.newProduct = new Product();
        this.form.reset();
      }
  }
}
