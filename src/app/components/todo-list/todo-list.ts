import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  private taskService = inject(TaskService)

  errorMsg = this.taskService.errorMsg
  isLoading = this.taskService.isLoading
  tasks = this.taskService.tasks

  refreshTasks() {
    this.taskService.refreshTasks()
  }
}
