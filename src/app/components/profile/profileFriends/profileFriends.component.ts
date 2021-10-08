import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { dialogElementsUpdateProfilePic } from '../../dialogs/dialogElementsUpdateProfilePic.component';
import {MatDialog} from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import { ProfileComponent } from '../profile.component';
import * as $ from 'jquery';


@Component({
    selector: 'profileFriends',
    templateUrl: './profileFriends.component.html',
    styleUrls: ['./profileFriends.component.scss'],
    providers: [UserService, FollowService],
  })


  export class ProfileFriendsComponent implements OnInit {
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
    public follows;
    public following;
    public noMore;
    public id;

    
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
        this.noMore = false;

    }
    
    
    ngOnInit(): void {
        console.log('Profile Publication Component cargado correctamente');
        this.loadPage();

    }

    loadPage(){
        this._route.params.subscribe(params=>{
            this.id = params['id'];
            this.getFollowingUsers(this.id,this.page);
        })
    }

    modalUpdateProfile = false;

    
    getFollowingUsers(id,page,adding=false){
       
        this._followService.getFollowing(this.token, id, page).subscribe(
            response=>{
                if(response.follows){

                        this.total = response.total;
                        this.pages = response.pages;
                       
                        this.itemsPerPage = response.total;
                        

                        if (!adding) {
                            //console.log('!adding');
                            this.follows = response.follows;
                            //console.log("publicaciones->",this.publications)
                          }else{
                            var arrayA = this.follows;
                            var arrayB = response.follows;
                            this.follows = arrayA.concat(arrayB);
                            console.log("RESPUESTA FOLLOWS",response);
                          }
                        // alert(response.total);
                        // alert(response.pages);
                      
                        console.log(this.follows)
                        this.viewMore();

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

    viewMore(){            
        this.page = this.page+1;

        if(this.page <= this.pages){
          
          this.getFollowingUsers(this.id,this.page,true);  
        }else{
            this.noMore = true;
            console.log("noMore = true")
        }
       
          
    }
  }