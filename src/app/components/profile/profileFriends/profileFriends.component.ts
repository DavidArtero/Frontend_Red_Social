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
import swal from 'sweetalert';


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

          // console.log("FOLLOWS->",this.follows);
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
    
    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        this._followService.deleteFollow(this.token, userIdToUnfollow).subscribe(
          (response) => {
            let index=0;
            this.follows.forEach(follow => {
    
             if(follow.followed._id == userIdToUnfollow){
               console.log("ahora splice")
               console.log("before",this.follows)
               this.follows.splice(index,1)
               
               console.log("after",this.follows)
              
               
              
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
                      
          swal( "Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
    
        
      } else {
        swal("Your imaginary file is safe!");
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
