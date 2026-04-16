import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient)
  tasks = signal<Task[]>([])

  errorMsg = signal('')
  isLoading = signal(false)


  fetchTasks() {
    this.errorMsg.set('')
    this.isLoading.set(true)
    this.http.get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (data) => { this.tasks.set(data); this.errorMsg.set(""); this.isLoading.set(false) },
        error: () => { this.errorMsg.set('Failed to fetch task list.'); this.isLoading.set(false) }
      })
  }
}
