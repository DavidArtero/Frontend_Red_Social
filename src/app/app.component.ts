import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title : string;
  public identity : string;
  public url: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
    ){
      this.title = 'Red Social'
      this.url = GLOBAL.url;
    }

    ngOnInit(){
      this.identity = this._userService.getIdentity();
      console.log("identity->",this.identity);
    }

    //DoCheck comprueba si se han realizado cambios en la aplicación
    ngDoCheck(){
      this.identity = this._userService.getIdentity();
    }

    logout(){
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']);
    }



}


