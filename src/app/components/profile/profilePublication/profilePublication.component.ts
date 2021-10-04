import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { dialogElementsUpdateProfilePic } from '../../dialogs/dialogElementsUpdateProfilePic.component';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import * as $ from 'jquery';


@Component({
  selector: 'profilePublication',
  templateUrl: './profilePublication.component.html',
  styleUrls: ['./profilePublication.component.scss'],
  providers: [
    UserService,
    FollowService,
    MatMenuModule,
    MatDialogModule,
    dialogElementsUpdateProfilePic,
    PublicationService,
  ],
})
export class ProfilePublicationComponent implements OnInit {
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
  public pages: number;
  public itemsPerPage: number;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    public dialog: MatDialog,
    private _publicationService: PublicationService
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(): void {
    console.log('Profile Publication Component cargado correctamente');
    this.loadPage();
    this.getOwnPublications(this.page);
  }

  loadPage() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getUser(id);
    });
  }

  modalUpdateProfile = false;

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.user) {
          console.log(response);
          this.user = response.user;
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log("'/perfil'" + this.identity._id);
        this._router.navigate(['/perfil', this.identity._id]);
      }
    );
  }

  getOwnPublications(page, adding = false) {
    this._publicationService.getOwnPublications(this.token, page).subscribe(
      (response) => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if (!adding) {
            console.log('!adding');
            this.publications = response.publications;
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
          if (page > this.pages) {
            //this._router.navigate(['/home']);
          }
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
}
