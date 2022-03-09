import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [ReactiveFormsModule, BrowserModule, MatProgressSpinnerModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
