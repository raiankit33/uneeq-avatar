import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardGuard } from './AuthGuard/guard.guard';



const routes: Routes = [

  { path: '', loadChildren: () => import('./user-home/user-home.module').then(m => m.UserHomeModule)},



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
