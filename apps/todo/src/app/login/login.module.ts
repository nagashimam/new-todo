import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [ReactiveFormsModule, BrowserModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
