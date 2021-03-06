import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';
import * as $ from 'jquery';
import { isBuffer } from 'util';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [UserService, PublicationService],
})
export class TimelineComponent implements OnInit {
  public title: string;
  public identity;
  public token;
  public url: string;
  public status: string;
  public page: number;
  public total: number;
  public pages:number;
  public itemsPerPage:number;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.title = 'Timeline';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.pages = 1;
  }

  ngOnInit(): void {
    console.log('Timeline cargado correctamente');
    this.getPublications(this.page);

    //let's see if setInterval works
    
  }

  getPublications(page, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      (response) => {

      
        if (response.publications) {

         // console.log(response.publications.user.file)
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;
          // console.log(response.publications[1].file)
          // console.log(typeof(response.publications[1].file))
            if (!adding) {
                           
              this.publications = response.publications;
              console.log(this.publications.length)
              
            } else {
             
              var arrayA = this.publications;
              var arrayB = response.publications;
              this.publications = arrayA.concat(arrayB);
              
                //scroll down
                $('html').animate(
                  { scrollTop: $('html').prop('scrollHeight') },
                  500
                );
            }

          //If user try other url
         
        } else {
          this.status = 'error';
        }
      },

      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  public noMore = false;
  viewMore(){
    
       console.log("this.page->" + this.page);
       console.log("this.total->" + (this.pages));
      
          this.page = this.page+1;
          if(this.page >= this.pages){
            this.noMore = true;
            console.log("noMore = true")
            
          }
            this.getPublications(this.page, true); 
      }

      //Refresh publications
      refresh(event:any){
        this.page=1;
        this.getPublications (this.page);
      }

      

  }


