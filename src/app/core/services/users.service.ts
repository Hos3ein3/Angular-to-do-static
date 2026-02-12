import { Injectable, signal } from '@angular/core';
import { LIST_USERS } from '../data/dummy-users';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSignal = signal<User[]>(LIST_USERS);
  users = this.usersSignal.asReadonly();

  getUserById(id: string): User | undefined {
    return this.users().find((user) => user.id === id);
  }
  getAll() {
    return this.users();
  }

}
