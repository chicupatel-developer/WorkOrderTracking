import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PartComponent } from './part/part.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { OperationComponent } from './operation/operation.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'part', component: PartComponent },
  { path: 'customer-order', component: CustomerOrderComponent },
  { path: 'work-order', component: WorkOrderComponent },
  { path: 'operation', component: OperationComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
