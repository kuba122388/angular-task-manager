import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient)
  private refreshTrigger = new BehaviorSubject(0)

  errorMsg = signal('')
  isLoading = signal(false)

  private tasks: Signal<Task[] | undefined>
  private localTasks = signal<Task[]>([])
  allTasks: Signal<Task[]>

  constructor() {
    this.tasks = toSignal(this.refreshTrigger.asObservable()
      .pipe(
        switchMap(() =>
          this.fetchTasks().pipe(
            catchError(
              () => {
                this.errorMsg.set("Failed to fetch tasks.")
                return of([])
              }
            )
          )
        )
      )
    )
    this.allTasks = computed(() => [...(this.tasks() ?? []), ...this.localTasks()])
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

  addTask(title: string) {
    this.localTasks.update((list) => [...list, { title: title, id: Math.max(...this.allTasks().map((o) => o.id), 0) + 1, userId: 10, completed: "Pending" }])
  }

  refreshTasks() {
    this.refreshTrigger.next(0)
  }
}
