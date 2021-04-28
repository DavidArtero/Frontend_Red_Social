import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
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

    constructor(
        private _route: ActivatedRoute,
        private _roter: Router,
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
        console.log("componente de loggin cargado")
    }

    onSubmit(){
        alert(this.user.email)
        alert(this.user.password)
        console.log(this.user);
    }
}