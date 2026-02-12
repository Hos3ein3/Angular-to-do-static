import { Component, inject, Input, output } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserItem } from "../user-item/user-item";
import { LIST_USERS } from '../../../../core/data/dummy-users';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [UserItem],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UsersService);
  //userId = input.required<string>();
  //@Input({ required: true }) userId!: string;
  //@Input({ required: true }) user!: User;

  @Input() userSampleObject!: {
    id: string;
    avatar: string;
    name: string;
  };

  //@Output() select = new EventEmitter();
  //@Output() select = new EventEmitter<string>();
  selectedUserId = output<string>();

  //avatar = input.required<string>();
  users = this.userService.getAll();

  onUserSelected(userId: string) {
    //console.log(userId);

    this.selectedUserId.emit(userId);
  }

}
