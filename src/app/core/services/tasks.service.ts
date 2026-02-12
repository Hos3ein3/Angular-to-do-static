import { Injectable, signal } from '@angular/core';
import { LIST_TASKS } from '../data/dummy-tasks';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor() {
    const dbTask = localStorage.getItem('tasks');
    if (dbTask) {
      this.tasks = JSON.parse(dbTask);
    }
    else {

    }

  }
  private tasksSignal = signal<Task[]>(LIST_TASKS);
  tasks = this.tasksSignal.asReadonly();


  getUserTasks(userId: string, isDesc: boolean = false): Task[] {
    return this.tasks().filter((task) => task.userId === userId).sort((a, b) => {
      if (isDesc) {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });
  }


  getAllTasks(isDesc: boolean = false): Task[] {
    return this.tasks().sort((a, b) => {
      if (isDesc) {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });
  }

  removeTask(taskId: string) {
    this.tasksSignal.update(tasks =>
      tasks.filter(t => t.id !== taskId)
    );
    this.saveTasks();
  }

  addTask(task: Task) {
    this.tasksSignal.update(tasks => [...tasks, task]);
    this.saveTasks();
  }

  getTask(taskId: string): Task | undefined {
    return this.tasks().find(task => task.id === taskId);
  }

  updateTask(taskId: string, task: Task) {
    this.tasksSignal.update(tasks =>
      tasks.map(t => t.id === taskId ? task : t)
    );
    this.saveTasks();
  }
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

}
