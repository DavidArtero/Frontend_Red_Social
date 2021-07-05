import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'registro' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'mis-datos' , component: UserEditComponent},
  {path: 'gente/:page' , component: UsersComponent},
  {path: 'gente' , component: UsersComponent},
  {path: 'timeline' , component: TimelineComponent},
  {path: '**' , component: HomeComponent}

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
