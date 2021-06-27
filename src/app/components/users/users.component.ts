import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user';
import { UserService } from "src/app/services/user.service";
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [ UserService ]

})

export class UsersComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public page;
    public nextPage;
    public prePage;
    public status: string;
    public total;
    public pages;
    public users: User[];
    public url: string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Gente';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        this.actualPage();
    }


    actualPage(){
        this._route.params.subscribe(params =>{
            let page = +params['page'];
            this.page = page;

            if(!params['page']){
                page = 1;
            }

            if(!page){
                page = 1;
            }else{
                this.nextPage = page+1;
                this.prePage = page-1;

                if(this.prePage<=0){
                    this.prePage = 1;
                }
            }

            //devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page){
        this._userService.getUsers(page).subscribe(
            response =>{
                if(!response.users){
                    this.status= 'error'
                }else{
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    console.log(this.follows);
                    // console.log(response)
                    // console.log("total-> ",this.total)
                    // console.log("users->", this.users)
                    // console.log("pages->", this.pages)
                    // console.log("page -> ", page)

                    if(page > this.pages ){
                        this._router.navigate(['/gente',1]);
                    }
                }

            },
            error=>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage!=null){
                    this.status = 'error';
                }
            }
        );
    }

    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }
    mouseLeave(user_id){
        this.followUserOver = 0;
    }
}


