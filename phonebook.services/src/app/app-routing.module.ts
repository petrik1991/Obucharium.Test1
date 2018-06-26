import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { Route } from '@angular/compiler/src/core';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const routes: Routes = [
  {path: "", redirectTo: "/contacts", pathMatch: "full"},
  {path: "contacts", component: ContactsComponent},
  {path: "detail/:id", component: PersonDetailComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
