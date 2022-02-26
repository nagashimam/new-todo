import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prisma, User } from '@prisma/client';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly endpoint = `${environment.endpoint}/user`;
  constructor(private userStore: UserStore, private http: HttpClient) {}

  findOne(params: Omit<Prisma.UserCreateInput, 'Todo'>) {
    const { id, password } = params;
    return this.http
      .put<User>(this.endpoint, { id, password })
      .pipe(
        catchError((err) => {
          this.userStore.setError(err);
          return of({});
        })
      )
      .subscribe((user) => {
        this.userStore.update(user);
      });
  }

  create(params: Prisma.UserCreateInput) {
    return this.http.post<User>(this.endpoint, { params }).subscribe((user) => {
      this.userStore.update(user);
    });
  }
}
