import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  private taskService = inject(TaskService)

  titleControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  formControl = new FormGroup({title: this.titleControl})

  errorMsg = this.taskService.errorMsg
  isLoading = this.taskService.isLoading
  allTasks = this.taskService.allTasks

  addTask(){
    this.taskService.addTask(this.formControl.value.title ?? '')
    this.formControl.reset()
  }

  refreshTasks() {
    this.taskService.refreshTasks()
  }
}
