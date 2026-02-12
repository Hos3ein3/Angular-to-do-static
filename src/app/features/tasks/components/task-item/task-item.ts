import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  //isEditing = false;
  @Input({ required: true }) task?: Task | null;
  @Output() taskId = new EventEmitter<string>();
  isEditing = output<{ id: string, isEditing: boolean }>();

  onCompletingTask(taskId: string) {
    //console.log(taskId);
    this.taskId.emit(taskId);
  }

  onEditingTask(taskId: string) {
    this.isEditing.emit({ id: taskId, isEditing: true });
  }
}
