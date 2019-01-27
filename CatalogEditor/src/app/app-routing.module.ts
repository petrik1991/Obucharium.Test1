import { NgModule } from '@angular/core';
import { NavigationComponent } from './/navigation/navigation.component';
import { ProductsListComponent } from './/products-list/products-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {path: "", redirectTo: "/categories", pathMatch: "full"},
  {path: "categories", component: NavigationComponent},
  {path: "products-list", component: ProductsListComponent},
  {path: "addProduct", component: AddProductComponent},
  {path: "productDetail/:id", component: AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
