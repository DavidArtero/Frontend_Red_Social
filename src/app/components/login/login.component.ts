import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        UserService
    ]
})

export class LoginComponent implements OnInit{
    public title: string;
    public user: User;
    public status: String;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
        
    ){
        this.title = "Identifícate"
        this.user = new User(
            "",
            "",
            "",
            "",
            "",
            "",
            "ROLE_USER",
            ""
        );
    }

    ngOnInit(){
        //console.log("componente de loggin cargado")
    }

    onSubmit(){
        //loguear usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                //console.log(this.identity)
                if(!this.identity || !this.identity._id){
                    this.status = 'error'
                }else{
                    console.log("success")
                    //persistir datos de usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    //conseguir token
                    this.getToken();
                }
               
            }, error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    getToken(){
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                //console.log(this.token)
                if(this.token.length <= 0){
                    this.status = 'error'
                }else{
                    console.log(this.token)
                    //persistir token de usuario
                    localStorage.setItem('token', (JSON.stringify,this.token));

                    //conseguir los contadores o estadisticas del usuario
                    this.getCounters();

                   
                }
            }, error => {
                var errorMessage = <any>error;
    
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    getCounters(){
        console.log("hello from getCounters")
        this._userService.getCounters().subscribe(
            response => {
                localStorage.setItem('Stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/']);
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}