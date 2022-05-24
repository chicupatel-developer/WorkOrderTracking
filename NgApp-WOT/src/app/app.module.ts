import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PartComponent } from './part/part.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { OperationComponent } from './operation/operation.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateOperatorLogComponent } from './create-operator-log/create-operator-log.component';
import { ViewOperatorLogComponent } from './view-operator-log/view-operator-log.component';

// services

// auth

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PartComponent,
    CustomerOrderComponent,
    WorkOrderComponent,
    OperationComponent,
    SigninComponent,
    RegistrationComponent,
    CreateOperatorLogComponent,
    ViewOperatorLogComponent
  ],
  imports: [   
    BrowserModule,    
    NgbModule,
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxNavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
