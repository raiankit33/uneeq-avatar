import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { UneeqavatarComponent } from './component/uneeqavatar/uneeqavatar.component';
import { UserHomeComponent } from './user-home.component';
import { GuardGuard } from '../AuthGuard/guard.guard';



const routes: Routes = [{ path: '', component: UserHomeComponent,children :[
  { path: 'dashboard', component: DashboardComponent },
] },
{ path: 'avatar1', component: UneeqavatarComponent},
{ path: 'feedback', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomeRoutingModule { }
