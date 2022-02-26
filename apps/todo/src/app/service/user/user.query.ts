import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { User } from '@prisma/client';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<User> {
  user$ = this.select();
  constructor(protected override store: UserStore) {
    super(store);
  }
}
