import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { dialogElementsUpdateProfilePic } from '../dialogs/dialogElementsUpdateProfilePic.component';
import {MatDialog} from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import * as $ from 'jquery';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [UserService, FollowService, MatMenuModule, MatDialogModule, dialogElementsUpdateProfilePic, PublicationService],
  })


  export class ProfileComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public stats;
    public url;
    public followed;
    public following;
    public page: number;
    public total: number;
    public pages:number;
    public itemsPerPage:number;
    public publications: Publication[];
    public itsMyOwnPage:Boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService,
        public dialog: MatDialog,
        private _publicationService: PublicationService
    ){
        this.title = 'Perfil';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
        this.following = false;
        this.followed = false;
        this.itsMyOwnPage = false;

    }
    
    
    ngOnInit(): void {
        this.loadPage();
        
       
    }

    loadPage(){
        this._route.params.subscribe(params=>{
            var id = params['id'];
            this.getUser(id);
        });
        console.log("identi", this.identity._id)
        console.log("userId->" , this.user._id)
    

        // if(this.identity._id == this.user._id){
        //     this.itsMyOwnPage = true;
        // }



    }

    modalUpdateProfile = false;

    getUser(id){
        this._userService.getUser(id).subscribe(
            response=>{
                if(response.user){
                    console.log(response);
                    this.user = response.user;


                    if(response.following && response.following._id){
                        this.following = true;
                    }else{
                        this.following = false;
                    }

                    if(response.followed && response.followed._id){
                        this.followed = true;
                    }else{
                        this.followed = false;
                    }
                    
                }else{
                    this.status = 'error';
                    
                }
            },
            error=>{
                console.log("'perfil'" + this.identity._id)
                this._router.navigate(['/perfil', this.identity._id]);

            }
        )
    }
    enlargeImage(x) {
        x.style.height = "64px";
        x.style.width = "64px";
      }    
      
     

  }