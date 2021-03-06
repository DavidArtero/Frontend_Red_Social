import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule} from '@angular/forms';
// Importar HttpClientModule para hacer peticiones Ajax a la BD
import {HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Cargar componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'ngx-moment';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePublicationComponent } from './components/profile/profilePublication/profilePublication.component';
import { ProfileFriendsComponent } from './components/profile/profileFriends/profileFriends.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFocusDirectiveDirective } from './components/directives/auto-focus-directive.directive'; 
import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './components/pipes/friends-filter.pipe';
import { GreetingsComponent } from './components/dialogs/greetings/greetings.component';
import { MessagesRoutingModule } from './messages/messages-routing.module';
import { MessagesModule } from './messages/messages.module';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
  path: 'mensajes', loadChildren: () =>
  import('./messages/messages.module').then(m => m.MessagesModule)
  },
 
];

@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    ProfileComponent,
    ProfilePublicationComponent,
    ProfileFriendsComponent,
    AutoFocusDirectiveDirective,
    FilterPipe,
    GreetingsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    Ng2SearchPipeModule,
    NgbModalModule,
    MessagesModule
    

  ],
  

  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],


  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []

  
})
export class AppModule { }
