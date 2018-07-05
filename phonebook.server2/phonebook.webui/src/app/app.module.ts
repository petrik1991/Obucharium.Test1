import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { PhonePipe } from './phone.pipe';
import { ErrorDirective } from './error.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PersonDetailComponent,
    AddContactComponent,
    PageNotFoundComponent,
    SearchComponent,
    AboutComponent,
    PhonePipe,
    ErrorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
