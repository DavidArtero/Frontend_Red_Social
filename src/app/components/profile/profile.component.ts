import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [UserService, FollowService],
  })


  export class ProfileComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public stats;
    public url;
    public follow;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Perfil';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

    }
    
    
    ngOnInit(): void {
        console.log('Profile Component cargado correctamente');
        this.loadPage();
    }

    loadPage(){
        this._route.params.subscribe(params=>{
            let id = params['id'];
            this.getUser(id);
        })
    }

    getUser(id){
        this._userService.getUser(id).subscribe(
            response=>{
                if(response.user){
                    console.log(response);
                    this.user = response.user;
                    
                }else{
                    this.status = 'error';
                    
                }
            },
            error=>{
                console.log("'/perfil'" + this.identity._id)
                this._router.navigate(['/perfil', this.identity._id]);

            }
        )
    }
    enlargeImage(x) {
        x.style.height = "64px";
        x.style.width = "64px";
      }

  }