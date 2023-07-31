import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { HelppageComponent } from './helppage/helppage.component';




@NgModule({
  declarations: [
    AppComponent,
    HelppageComponent, 

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
