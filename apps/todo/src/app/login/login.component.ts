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
  label: { title: string; button: string; linkText: string; linkHref: string };

  constructor(
    private userQuery: UserQuery,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.label = this.router.url.includes('login')
      ? {
          title: 'Login',
          button: 'ログイン',
          linkText: 'アカウント登録',
          linkHref: './registration',
        }
      : {
          title: 'Registration',
          button: '登録',
          linkText: 'ログイン',
          linkHref: './login',
        };

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

  submit() {
    const id = this.loginFormGroup.controls['id'].value;
    const password = this.loginFormGroup.controls['password'].value;
    if (this.label.title === 'Login') {
      this.userService.findOne({ id, password });
    } else {
      this.userService.create({ id, password });
    }
  }
}
