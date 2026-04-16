import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit{
  private taskService = inject(TaskService)
  
  tasks = this.taskService.tasks
  errorMsg = this.taskService.errorMsg
  isLoading = this.taskService.isLoading

  ngOnInit(): void {
    this.taskService.fetchTasks()
  }

  refreshTasks() {
    this.taskService.fetchTasks()
  }
}
