import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'registro' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'mis-datos' , component: UserEditComponent},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
