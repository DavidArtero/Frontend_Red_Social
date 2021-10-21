import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    UserService,
    FollowService,
    MatMenuModule,
    MatDialogModule,
    PublicationService,
    UploadService,
  ],
})
export class ProfileComponent implements OnInit, AfterViewInit {
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
  public pages: number;
  public itemsPerPage: number;
  public publications: Publication[];
  public itsMyOwnPage: Boolean;
  public load: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    public dialog: MatDialog,
    private _publicationService: PublicationService,
    private _uploadService: UploadService
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.following = false;
    this.followed = false;
    this.itsMyOwnPage = false;
    this.load = false;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe((params) => {
      var id = params['id'];
      this.getUser(id);
      this.load = true;
    });

    // if(this.identity._id == this.user._id){
    //     this.itsMyOwnPage = true;
    // }
  }

  modalUpdateProfile = false;

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.user) {
          console.log(response);
          this.user = response.user;

          if (response.following && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }

          if (response.followed && response.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log("'perfil'" + this.identity._id);
        this._router.navigate(['/perfil', this.identity._id]);
      }
    );
  }
  enlargeImage(x) {
    x.style.height = '64px';
    x.style.width = '64px';
  }

  uploadFile = [];

  async editBackgroundProfile() {
    //swal
    const { value: file } = await Swal.fire({
      title: 'Selecciona una imagen',
      input: 'file',
      showCloseButton: true,
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (
      file &&
      (file.name.includes('.jpg') ||
        file.name.includes('.png') ||
        file.name.includes('.gif') ||
        file.name.includes('.jpeg'))
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.onSubmit(true);
        Swal.fire({
          title: 'Has modificado tu foto de portada',
          imageUrl: event.target['result'],
          //GLOBAL.url+ "upload-background-image-user/" + this.user._id,
          imageAlt: 'The uploaded picture',
        });
      };

      reader.readAsDataURL(file);
      this.uploadFile.push(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido cambiar tu imagen de portada',
        text: 'Adjunta una imagen',
      });
    }
  }

  async editImageProfile() {
    //swal
    const { value: file } = await Swal.fire({
      title: 'Selecciona una imagen',
      input: 'file',
      showCloseButton: true,
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (
      file &&
      (file.name.includes('.jpg') ||
        file.name.includes('.png') ||
        file.name.includes('.gif') ||
        file.name.includes('.jpeg'))
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.onSubmit(false);
        Swal.fire({
          title: 'Has modificado tu foto de perfil',
          imageUrl: event.target['result'],
          //GLOBAL.url+ "upload-background-image-user/" + this.user._id,
          imageAlt: 'The uploaded picture',
        });
      };

      reader.readAsDataURL(file);
      this.uploadFile.push(file);


      setTimeout(()=>{                          
        this.reloadComponent();
    }, 1000);
     
      

     
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se ha podido cambiar tu imagen perfil',
        text: 'Adjunta una imagen',
      });
    }
  }
  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/perfil',this.user._id]);
}

  //Output
  @Output() sended = new EventEmitter();

  onSubmit(background) {
    let route = '';
    if (background == true) {
      route = 'upload-background-image-user/';
    } else {
      route = 'upload-image-user/';
    }

    this._userService.updateUser(this.user).subscribe(
      (response) => {
        if (!response.user) {
          this.status = 'error';
        } else {
          console.log('subscribe user->', this.user);
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          //Subida de imagen de usuario
          this._uploadService
            .makeFileRequest(
              this.url + route + this.user._id,
              [],
              this.uploadFile,
              this.token,
              'image'
            )
            .then((result: any) => {
              this.uploadFile = [];
              if (background == true)
                this.user.backgroundImage = result.user.backgroundImage;
              else {
                this.user.image = result.user.image;
              }
              localStorage.setItem('identity', JSON.stringify(this.user));
            });
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
