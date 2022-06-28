import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PartComponent } from './part/part.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerOrderCreateComponent } from './customer-order-create/customer-order-create.component';
import { CustomerOrderEditComponent } from './customer-order-edit/customer-order-edit.component';
import { CustomerOrderRemoveComponent } from './customer-order-remove/customer-order-remove.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { OperationComponent } from './operation/operation.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateOperatorLogComponent } from './create-operator-log/create-operator-log.component';
import { ViewOperatorLogComponent } from './view-operator-log/view-operator-log.component';
import { PartCreateComponent } from './part-create/part-create.component';
import { PartEditComponent } from './part-edit/part-edit.component';
import { PartRemoveComponent } from './part-remove/part-remove.component';
import { AuthGuard } from './auth/auth.guard';
import { PartUploadComponent } from './part-upload/part-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'part', component: PartComponent, canActivate: [AuthGuard] },
  { path: 'customer-order', component: CustomerOrderComponent, canActivate: [AuthGuard] },
  { path: 'customer-order-create', component: CustomerOrderCreateComponent, canActivate: [AuthGuard] },
  { path: 'customer-order-edit/:id', component: CustomerOrderEditComponent, canActivate: [AuthGuard] },
  { path: 'customer-order-remove/:id', component: CustomerOrderRemoveComponent, canActivate: [AuthGuard] },
  { path: 'work-order', component: WorkOrderComponent, canActivate: [AuthGuard] },
  { path: 'operation', component: OperationComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create-op-log', component: CreateOperatorLogComponent, canActivate: [AuthGuard] },
  { path: 'view-op-log', component: ViewOperatorLogComponent, canActivate: [AuthGuard] },
  { path: 'part-create', component: PartCreateComponent, canActivate: [AuthGuard] },
  { path: 'part-edit/:id', component: PartEditComponent, canActivate: [AuthGuard] },
  { path: 'part-remove/:id', component: PartRemoveComponent, canActivate: [AuthGuard] },
  { path: 'part-upload/:id', component: PartUploadComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
