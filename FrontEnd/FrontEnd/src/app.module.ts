import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // Added import for BrowserModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Added import for HttpClientModule

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AppModule { }