import { Injectable, signal } from '@angular/core';
import { LIST_TASKS } from '../data/dummy-tasks';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksSignal = signal<Task[]>(LIST_TASKS);
  tasks = this.tasksSignal.asReadonly();

  getUserTasks(userId: string): Task[] {
    return this.tasks().filter((task) => task.userId === userId);
  }

  getAllTasks(): Task[] {
    return this.tasks();
  }

  removeTask(taskId: string) {
    this.tasksSignal.update(tasks =>
      tasks.filter(t => t.id !== taskId)
    );
  }

  addTask(task: Task) {
    this.tasksSignal.update(tasks => [...tasks, task]);
  }

  getTask(taskId: string): Task | undefined {
    return this.tasks().find(task => task.id === taskId);
  }

}
