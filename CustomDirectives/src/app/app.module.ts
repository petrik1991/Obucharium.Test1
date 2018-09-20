import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdStructureDirective } from './structure.directive';
import { CdAttrDirective } from './attr.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, CdStructureDirective, CdAttrDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
