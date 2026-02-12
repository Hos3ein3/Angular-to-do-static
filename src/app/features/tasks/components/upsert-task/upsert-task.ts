import { Component, inject, input, output, OnInit } from '@angular/core';
import { TasksService } from '../../../../core/services/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upsert-task',
  imports: [FormsModule],
  templateUrl: './upsert-task.html',
  styleUrl: './upsert-task.css',
})
export class UpsertTask implements OnInit {
  private taskService = inject(TasksService);
  userId = input.required<string>();
  isAddingTask = output<boolean>();
  taskId = input<string>('');

  title = '';
  summary = '';
  dueDate = '';

  ngOnInit() {
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

    this.taskService.addTask({
      id: new Date().getTime().toString(),
      title: this.title,
      summary: this.summary,
      dueDate: this.dueDate,
      userId: this.userId(),
    });

    this.isAddingTask.emit(false);
  }
  onCloseBox() {
    console.log('canceling');
    this.isAddingTask.emit(false);
  }
}
