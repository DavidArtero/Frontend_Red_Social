import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    providers: [ UserService ]

})

export class TimelineComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public url: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Timeline";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

    }
    

    ngOnInit(): void {
        console.log("Timeline cargado correctamente" );
    }


}

