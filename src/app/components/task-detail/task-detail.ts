import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  private taskService = inject(TaskService)
  private taskDetail = inject(ActivatedRoute)

  errorMsg = this.taskService.errorMsg
  isLoading = this.taskService.isLoading

  taskId = this.taskDetail.snapshot.paramMap.get('id')
  task = computed(() => this.taskService.tasks()?.find((task) => task.id === Number(this.taskId)))

}
