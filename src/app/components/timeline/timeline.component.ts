import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';


@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    providers: [ UserService, PublicationService ]

})

export class TimelineComponent implements OnInit{
    public title: string;
    public identity;
    public token;
    public url: string;
    public status: string;
    public page:number;
    public total:number;
    public pages;
    public publications: Publication[];


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ){
        this.title = "Timeline";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }
    

    ngOnInit(): void {
        console.log("Timeline cargado correctamente" );
        this.getPublications(this.page);
    }

    getPublications(page){
        this._publicationService.getPublications(this.token, page).subscribe(
            response =>{
               if(response.publications){
                   this.total = response.total_items;
                   this.pages = response.pages;
                   this.publications = response.publications;


                    //If user try other url
                   if(page > this.pages){
                       this._router.navigate(['/home']);
                   }

               }else{
                   this.status = 'error';
               }
            },

            error=>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage!=null){
                    this.status = 'error';
                }
            }
        )

    }


}

