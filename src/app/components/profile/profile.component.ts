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
    public follow;
    public page: number;
    public total: number;
    public pages:number;
    public itemsPerPage:number;
    public publications: Publication[];

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

    }
    
    
    ngOnInit(): void {
        this.loadPage();
        
       
    }

    loadPage(){
        this._route.params.subscribe(params=>{
            let id = params['id'];
            this.getUser(id);
        });
        console.log("identi", this.identity._id)
        console.log("HELLOOOOOOOOOOOOOOOO")
        console.log(this.user._id);
        console.log("identi", this.identity._id)
    }

    modalUpdateProfile = false;

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