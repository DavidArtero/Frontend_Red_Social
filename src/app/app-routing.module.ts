import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePublicationComponent } from './components/profile/profilePublication/profilePublication.component';
import { ProfileFriendsComponent } from './components/profile/profileFriends/profileFriends.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'registro' , component: RegisterComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'mis-datos' , component: UserEditComponent},
  {path: 'gente/:page' , component: UsersComponent},
  {path: 'gente' , component: UsersComponent},
  {path: 'timeline' , component: TimelineComponent},
  {path: 'perfil/:id' , component: ProfilePublicationComponent},
  {path: 'perfil/:id/amigos' , component: ProfileFriendsComponent},
  {path: '**' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],

})
export class AppRoutingModule { }
