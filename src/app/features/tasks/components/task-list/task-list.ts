import { LIST_TASKS } from './../../../../core/data/dummy-tasks';
import { Component, computed, inject, input, Input, OnInit, output } from '@angular/core';
import { TaskItem } from "../task-item/task-item";
import { Task } from '../../../../core/models/task.model';
import { TasksService } from '../../../../core/services/tasks.service';


@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  userId = input.required<string>();
  private taskService = inject(TasksService);
  isEditing = output<{ id: string, isEditing: boolean }>();
  userTask = computed(() => {
    //console.log('TaskList computing for userId:', this.userId());
    return this.taskService.getUserTasks(this.userId());
  });


  onTaskCompleted(taskId: string) {
    console.log(taskId);
    this.taskService.removeTask(taskId);
  }
  onEditingTask(isEditing: { id: string, isEditing: boolean }) {
    this.isEditing.emit(isEditing);
  }


}
