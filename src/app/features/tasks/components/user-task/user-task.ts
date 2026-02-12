import { Component, computed, inject, input, Input, OnInit, output } from '@angular/core';
import { TaskList } from "../task-list/task-list";
import { User } from '../../../../core/models/user.model';
import { LIST_USERS } from '../../../../core/data/dummy-users';
import { UpsertTask } from "../upsert-task/upsert-task";
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-task',
  imports: [TaskList, UpsertTask],
  templateUrl: './user-task.html',
  styleUrl: './user-task.css',
})
export class UserTask {
  //user: User | undefined;
  private userService = inject(UsersService);
  userId = input.required<string>();
  isUpserting = { id: '', upserting: false };
  userName = computed(() => {
    //console.log(this.userId());
    return this.userService.getUserById(this.userId())?.name;
  });
  // @Input() user: User | undefined;
  //name? = input<string | undefined>();
  sortingIsDesc = false;
  onAddTask() {
    this.isUpserting = { id: '', upserting: true };
  }
  onCloseBox(isUpserting: { id: string, upserting: boolean }) {
    this.isUpserting = { id: '', upserting: false };
  }
  onEditingTask(isUpserting: { id: string, upserting: boolean }) {
    //console.log(isUpserting);
    this.isUpserting = isUpserting;
  }
  onChangeSorting() {
    this.sortingIsDesc = !this.sortingIsDesc;
  }
}
