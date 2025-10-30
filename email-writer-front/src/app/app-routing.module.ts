import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailReplyComponent } from './email-reply/email-reply.component';

const routes: Routes = [
  { path: '', redirectTo: '/email-reply', pathMatch: 'full' },
  { path: 'email-reply', component: EmailReplyComponent },
  { path: '**', redirectTo: '/email-reply' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
