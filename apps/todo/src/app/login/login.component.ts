import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = true;
  constructor(public auth: AuthService, private router: Router) {
    this.auth.isAuthenticated$.subscribe(async (isAuthenticated) => {
      this.loading = false;
      if (isAuthenticated) {
        this.router.navigateByUrl('./todos');
      }
    });
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
