import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path: "", redirectTo: "/contacts", pathMatch: "full"},
  {path: 'contacts/:term', component: ContactsComponent},
  {path: "contacts", component: ContactsComponent},
  {path: "groups", component: GroupComponent},
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
