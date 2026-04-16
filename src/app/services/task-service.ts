import { inject, Injectable, Signal, signal } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient)
  private refreshTrigger = new BehaviorSubject(0)

  errorMsg = signal('')
  isLoading = signal(false)
  tasks: Signal<Task[] | undefined>

  constructor() {
    this.tasks = toSignal(this.refreshTrigger.asObservable()
      .pipe(
        switchMap(() => this.fetchTasks()
        )
      )
    )
  }

  fetchTasks(): Observable<Task[]> {
    this.errorMsg.set('')
    this.isLoading.set(true)

    return this.http.get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap({
          next: () => this.isLoading.set(false),
          error: (error) => { this.errorMsg.set(error), this.isLoading.set(false) }
        }),
      )
  }

  refreshTasks() {
    this.refreshTrigger.next(0)
  }
}
