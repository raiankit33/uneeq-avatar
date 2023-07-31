import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeComponent } from './user-home.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UneeqavatarComponent } from './component/uneeqavatar/uneeqavatar.component';
import { UserService } from '../service/user.service';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CanDeactivateGuard } from '../AuthGuard/can-deactivate.guard';




@NgModule({
  declarations: [
    UserHomeComponent,
    HeaderComponent,
    DashboardComponent,
    UneeqavatarComponent,
    FeedbackComponent,
   

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    UserHomeRoutingModule,
  
  ],
  providers:[UserService , CanDeactivateGuard]
})
export class UserHomeModule { }
