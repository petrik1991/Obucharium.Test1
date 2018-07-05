import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { Route } from '@angular/compiler/src/core';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "", redirectTo: "/contacts", pathMatch: "full"},
  {path: 'contacts/:term', component: ContactsComponent},
  {path: "contacts", component: ContactsComponent},
  {path: "detail/:id", component: PersonDetailComponent},
  {path: "addContact", component: AddContactComponent},
  {path: "about", component: AboutComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: "**", redirectTo: "/404", pathMatch: "full"}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
