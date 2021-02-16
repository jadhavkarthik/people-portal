import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  { path: 'employee', component: UserComponent },
  { path: 'room', component: TaskComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

