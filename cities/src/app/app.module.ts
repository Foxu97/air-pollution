import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { materialModule } from './materialModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiAdresses } from './Models/ApiAdresses';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // ApiAdresses,
    FormsModule,
    ReactiveFormsModule,
    materialModule,
    BrowserAnimationsModule
  ],
  providers: [ApiAdresses],
  bootstrap: [AppComponent]
})
export class AppModule { }
