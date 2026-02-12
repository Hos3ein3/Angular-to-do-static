import { Component, output, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LIST_USERS } from './core/data/dummy-users';
import { User } from './core/models/user.model';
import { Header } from "./core/layout/header/header";
import { UserList } from "./features/users/components/user-list/user-list";
import { UserTask } from "./features/tasks/components/user-task/user-task";
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, UserList, UserTask],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  selectedUserId!: string;

  onUserSelected(userId: string) {
    //console.log(userId);
    this.selectedUserId = userId;
  }
  // users: User[] = LIST_USERS;
  // selectedUserId?: string;
  // name = output<string>();

  // get PassUserToChild() {
  //   return this.users.find(u => u.id === this.selectedUserId);
  // }
  // onSelectingUser(id: string) {
  //   this.selectedUserId = id;
  // }
}
