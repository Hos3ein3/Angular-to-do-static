import { Component, inject, input, output, OnInit } from '@angular/core';
import { TasksService } from '../../../../core/services/tasks.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-upsert-task',
  imports: [FormsModule],
  templateUrl: './upsert-task.html',
  styleUrl: './upsert-task.css',
})
export class UpsertTask implements OnInit {
  private taskService = inject(TasksService);
  userId = input.required<string>();

  isUpserting = output<{ id: string, upserting: boolean }>();
  taskId = input<string>('');

  title = '';
  summary = '';
  dueDate = '';

  ngOnInit() {
    console.log(this.taskId());

    if (this.taskId()) {
      const task = this.taskService.getTask(this.taskId());
      if (task) {
        this.title = task.title;
        this.summary = task.summary;
        this.dueDate = task.dueDate;
      }
    }
  }

  onSubmitingTask() {
    console.log('submiting');

    if (this.taskId()) {
      const taskData: Task = {
        id: this.taskId(),
        title: this.title,
        summary: this.summary,
        dueDate: this.dueDate,
        userId: this.userId(),
      };
      this.taskService.updateTask(this.taskId(), taskData);
    }

    this.taskService.addTask({
      id: new Date().getTime().toString(),
      title: this.title,
      summary: this.summary,
      dueDate: this.dueDate,
      userId: this.userId(),
    });

    this.isUpserting.emit({ id: '', upserting: false });
  }
  onCloseBox() {
    //console.log('canceling');

    this.isUpserting.emit({ id: '', upserting: false });
  }
}
