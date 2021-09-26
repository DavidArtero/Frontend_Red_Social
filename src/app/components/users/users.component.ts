import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from "src/app/services/user.service";
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [ UserService, FollowService ]

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
        private _userService: UserService,
        private _followService: FollowService
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

    followUser(followed){
        console.log("inside followUser");
        console.log("followed->",followed)
        var follow = new Follow('', this.identity._id, followed);
        console.log("inside follow User");
        console.log("follow->",follow)
        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if(!response.follow){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    this.getCounters();
                    this.follows.push(followed);
                }
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(

            response => {
                var search = this.follows.indexOf(followed);
                if(search != -1){
                    this.follows.splice(search, 1);
                    this.getCounters();
                }
            
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }

        );
    }

    getCounters(){
        this._userService.getCounters().subscribe(
            response =>{
                //Guardamos en stats la respuesta JSON
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
            }, 
            error=>{
                console.log(error);
            } 
        )
    }
}


