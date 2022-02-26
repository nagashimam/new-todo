import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { UserQuery } from '../service/user/user.query';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string | undefined = undefined;
  constructor(
    private userQuery: UserQuery,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userQuery.user$.pipe(skip(1)).subscribe((user) => {
      if (user.id && user.password) {
        this.router.navigate(['/todos']);
      }
    });
    this.userQuery.selectError().subscribe((error) => {
      console.log(error);
      this.error = error.error.message;
      this.loginFormGroup.reset();
    });
  }
  loginFormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
      ]),
    ],
  });

  login() {
    const id = this.loginFormGroup.controls['id'].value;
    const password = this.loginFormGroup.controls['password'].value;
    this.userService.findOne({ id, password });
  }
}
