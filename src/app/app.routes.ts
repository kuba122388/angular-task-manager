import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TaskDetail } from './components/task-detail/task-detail';

const tasks = "tasks"
const wildCard = tasks

export const routes: Routes = [
    {
        path: (""),
        redirectTo: tasks,
        pathMatch: 'full'
    },
    {
        path: tasks,
        component: TodoList
    },
    {
        path: ("tasks/:id"),
        component: TaskDetail
    },
    {
        path: ("**"),
        redirectTo: wildCard
    },
];
