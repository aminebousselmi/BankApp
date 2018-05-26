import { Routes } from '@angular/router';

import { TodoComponent} from './todo/todo.component';

export const TodoRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'todo',
      component: TodoComponent
    } 
   ]
  }
];
