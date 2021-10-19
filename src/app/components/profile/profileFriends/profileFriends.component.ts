import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';
import { ProfileComponent } from '../profile.component';
import * as $ from 'jquery';
import { GreetingsComponent } from '../../dialogs/greetings/greetings.component';
import Swal from 'sweetalert2'
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';



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
  public pages: number;
  public itemsPerPage: number;
  public publications: Publication[];
  public follows;
  public following;
  public noMore;
  public id;
  public isLoginUserProfile: Boolean;
  public term ="";

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    private _publicationService: PublicationService,
    private matDialog: MatDialog,

    
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
    this.noMore = false;
    this.isLoginUserProfile = false;
  }

  ngOnInit(): void {
   
    console.log('Profile Publication Component cargado correctamente');
    this.loadPage();    
  }



  loadPage() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.getFollowingUsers(this.id, this.page);

      if (this.identity._id == this.id) {
        this.isLoginUserProfile = true;
      }
    });
  }

  

  modalUpdateProfile = false;


   
  
  getFollowingUsers(id, page, adding = false) {
    this._followService.getFollowing(this.token, id, page).subscribe(
      (response) => {
        if (response.follows) {
          this.total = response.total;
          this.pages = response.pages;

          this.itemsPerPage = response.total;

          if (!adding) {
            //console.log('!adding');
            this.follows = response.follows;
            //console.log("publicaciones->",this.publications)
          } else {
            var arrayA = this.follows;
            var arrayB = response.follows;
            this.follows = arrayA.concat(arrayB);
            //console.log('RESPUESTA FOLLOWS', response);
          }
          // alert(response.total);
          // alert(response.pages);

           //console.log("FOLLOWS->",this.follows);
          this.viewMore();
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

  viewMore() {
    this.page = this.page + 1;

    if (this.page <= this.pages) {
      this.getFollowingUsers(this.id, this.page, true);
    } else {
      this.noMore = true;
      console.log('noMore = true');
    }
  }

  unfollowUser(userIdToUnfollow) {
    console.log("followed->" + userIdToUnfollow)
          

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez dejes de seguira este usuario dejarás de ver sus publicaciones",
      icon: "warning",
      // iconColor: '#000000',
      showConfirmButton: true,
      confirmButtonText:'Dejar de seguir',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',

    })
    .then((result) => {
      if (result.isConfirmed) {

        this._followService.deleteFollow(this.token, userIdToUnfollow).subscribe(
          (response) => {
            let index=0;
            this.follows.forEach(follow => {
    
             if(follow.followed._id == userIdToUnfollow){
               this.follows.splice(index,1)
               //refresh page by assign array without deleted
               let copyFollows = {};
               copyFollows = Object.assign([], this.follows);
               this.follows = Object.assign([],copyFollows)
             }
             index++;
        
            });
          },
          (error) => {
            var errorMessage = <any>error;
            console.log(errorMessage);
    
            if (errorMessage != null) {
              this.status = 'error';
            }
          }
        );
                      
          Swal.fire( 
            {text:"Ya no sigues a este usuario",
            icon: "success",
          });
    
        
      } else {
        // swal("Your imaginary file is safe!");
      }
    });

 
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

viewUserProfile(id){
  //Refrescar al hacer el navigate
  this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  this._router.navigate(['/perfil', id]);
}




//Modal
// onOpenDialogClick(){
//   let dialogRef = this.matDialog.open(GreetingsComponent,
//     {
//       data:{
//         age:10,
//         name:"david"
//       },
//       //width: "500px",
//       //height:"500px",
//       // position:{
//       //   top:"0px",
//       //   left:"0px"
//       // },
//       disableClose:true,
//       hasBackdrop:true
//     });
//     dialogRef.afterClosed().subscribe(
//       result=>{
//         if(result) {
//           // do confirmation actions
//           console.log(JSON.stringify(result));
//         }
       
//       }
//     )
// }


}
