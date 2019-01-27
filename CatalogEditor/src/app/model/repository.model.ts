import { Product } from "./product.model";
import { Category } from "./category.model";
import { DataSource } from "./datasource.model";
import { Injectable } from '@angular/core';
import { observable, action } from 'mobx';
@Injectable()
export class Model {
    private dataSource: DataSource;
    @observable private products: Product[];
    @observable private categories: Category[];

    constructor() {
        this.dataSource = new DataSource();
        this.products = new Array<Product>();
        this.categories = new Array<Category>();
        this.dataSource.getProducts().forEach(p => this.products.push(p));
        this.dataSource.getCategories().forEach(c => this.categories.push(c));
    }

    @action deleteProduct(id: number) {
        let index: number = this.products.findIndex((p) => p.id == id);
        if(index >= 0){
            this.products.splice(index, 1);
        }
    }

    @action getProducts(): Product[] {
        return this.products;
    }

    @action getCategories(): Category[] {
        return this.categories;
    }

    @action getProduct(id: number) : Product {
        return this.products.find(p => p.id == id);
    }

    @action saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
            Math.max.apply(null, this.products.map(p => p.id)) + 1;
            this.products.push(product);
        }
        else{
            let index = this.products.findIndex(p => p.id == product.id);
            this.products.splice(index, 1, product);
        }
    }
}
