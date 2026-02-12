import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { Card } from "../../../../core/layout/card/card";
import { TasksService } from '../../../../core/services/tasks.service';
import { UpsertTask } from "../upsert-task/upsert-task";

@Component({
  selector: 'app-task-item',
  imports: [Card, DatePipe, UpsertTask],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  //isEditing = false;
  @Input({ required: true }) task!: Task;
  @Output() taskId = new EventEmitter<string>();
  isUpserting = output<{ id: string, upserting: boolean }>();

  constructor(private taskService: TasksService) {

  }

  onTaskCompleting(taskId: string) {
    console.log(taskId);
    this.taskService.removeTask(taskId);
  }

  onEditingTask(taskId: string) {
    //console.log(taskId);
    this.isUpserting.emit({ id: taskId, upserting: true });
  }
}
