import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from "../../../models/message";
import { Follow } from "../../../models/follow";
import { FollowService } from "../../../services/follow.service";
import { MessageService } from "../../../services/message.service";
import { GLOBAL } from "../../../services/global";
import { UserService } from "src/app/services/user.service";
import { User } from "../../../models/user";

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [FollowService, MessageService]
})

export class AddComponent implements OnInit{
    public title: string;
    public message: Message;
    public identity;
    public token;
    public url:string;
    public status:string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Enviar mensaje';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken;
        this.url = GLOBAL.url;
        this.message = new Message('',  '', '', '', this.identity._id,'');

    }


    ngOnInit(): void {
       console.log("add cargado correctamente")
    }

    
}