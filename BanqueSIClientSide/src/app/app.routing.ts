import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {OperationComponent} from './components/operation/operation.component';
import { ChequeComponent } from './components/cheque/cheque.component';
import { ChangeComponent } from './components/change/change.component';
import { EmailComponent } from './components/email/email.component';
import { AuthenticateService } from './components/service/authenticate.service';
import { InboxComponent} from './components/email/inbox/inbox.component';
import { SentComponent} from './components/email/sent/sent.component';
import {MessageComponent} from './components/email/message/message.component';
import {DraftComponent} from './components/email/draft/draft.component';
import {DeletedComponent} from './components/email/deleted/deleted.component';
import {TrashComponent} from './components/email/trash/trash.component';
import {TrashModifiedComponent} from './components/email/tashModified/trashModified.component';
import {DeletedModifiedComponent} from './components/email/deletedModified/deletedModified.component';
import {TacheComponent} from './components/tache/tache.component';

const  appRoutes: Routes = [
    {
        path:'',
        component: LoginComponent
    },

    {
        path: 'stb',
        component:NavbarComponent,
        canActivate: [AuthenticateService],
        children: [
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate: [AuthenticateService]
   
            },
            {
                path:'operation',
                component:OperationComponent,
                canActivate: [AuthenticateService]
   
            },
            {
                path:'cheque',
                component:ChequeComponent,
                canActivate: [AuthenticateService]
   
            },
            {
                path:'change',
                component:ChangeComponent,
                canActivate: [AuthenticateService]
            },
            {
                path:'email',
                component:EmailComponent,
                canActivate: [AuthenticateService],
                children : [
                        {
                            path:'inbox',
                            component:InboxComponent,
                            canActivate: [AuthenticateService]
                            
                        },
                        {
                            path:'sent',
                            component:SentComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'message',
                            component:MessageComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'draft',
                            component:DraftComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'deleted',
                            component:DeletedComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'trash',
                            component:TrashComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'trashModified',
                            component:TrashModifiedComponent,
                            canActivate: [AuthenticateService]
                        },
                        {
                            path:'deletedModified',
                            component:DeletedModifiedComponent,
                            canActivate: [AuthenticateService]
                        }
                ]
            },
            {
                path:'task',
                component:TacheComponent,
                canActivate: [AuthenticateService]
            }
        ]
    }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);