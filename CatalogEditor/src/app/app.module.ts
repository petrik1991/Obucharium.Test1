import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Model } from './model/repository.model';
import { ProductsListComponent } from './products-list/products-list.component';
import { CatalogService } from './catalog.service';
import { ProductComponent } from './product/product.component';
import { CatalogStates } from './catalog.states';
import { AddProductComponent } from './add-product/add-product.component';
import { FileValueDirective } from './file-value.directive';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProductsListComponent,
    ProductComponent,
    AddProductComponent,
    FileValueDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Model, NavigationComponent, CatalogService, CatalogStates],
  bootstrap: [AppComponent]
})
export class AppModule { }
