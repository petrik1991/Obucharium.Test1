import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Model } from './model/repository.model';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsServiceService } from './products-service.service';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProductsListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Model, NavigationComponent, ProductsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
