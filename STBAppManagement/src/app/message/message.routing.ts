import { Routes } from '@angular/router';

import { MessageComponent } from './message.component';

export const MessageRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'message',
      component: MessageComponent
    }
  ]
  }
];
