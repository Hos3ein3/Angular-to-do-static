import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-user-item',
  imports: [],
  templateUrl: './user-item.html',
  styleUrl: './user-item.css',
})
export class UserItem {

  @Input({ required: true }) user!: User;
  selectedUserId = output<string>();
  onUserSelecting() {
    //console.log(this.user.id);
    this.selectedUserId.emit(this.user.id);
  }

  get imagePath() {
    return "users/" + this.user.avatar;

  }
}
