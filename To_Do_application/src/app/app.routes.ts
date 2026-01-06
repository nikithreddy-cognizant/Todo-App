import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Todo } from './components/todo/todo';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { TaskList } from './components/task-list/task-list';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
    {path:"",component:Login},
    {path:"login",component:Login},
    {path:"register",component:Register},
    {path:"addTask",component:Todo,canActivate:[authGuard]},
    {path:"taskList",component:TaskList,canActivate:[authGuard]},
    {path:"**",component:PageNotFound}
];
