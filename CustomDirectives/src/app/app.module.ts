import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdStructureDirective } from './structure.directive';
import { CdAttrDirective } from './attr.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdChangeColor } from "./changeRowColor.directive";

import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent, CdStructureDirective, CdAttrDirective, ProductTableComponent, ProductFormComponent, CdChangeColor
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
