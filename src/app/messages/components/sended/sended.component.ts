import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from "../../../models/message";
import { Follow } from "../../../models/follow";
import { FollowService } from "../../../services/follow.service";
import { MessageService } from "../../../services/message.service";
import { GLOBAL } from "../../../services/global";
import { UserService } from "src/app/services/user.service";
import { User } from "../../../models/user";


@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers: [FollowService, MessageService]
})

export class SendedComponent implements OnInit{
    public title: string;
    public message: Message;
    public identity;
    public token;
    public url:string;
    public status:string;
    public messages: Message[];
    public total;
    public pages;
    public itemsPerPage;
    public page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Mensajes enviados';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.message = new Message('',  '', '', '', this.identity._id,'');
        this.page=1;
    }


    ngOnInit(): void {
       console.log("sended cargado correctamente")
       this.getMessages(this.page,false);
    }
    
    adding = false;

    getMessages(page, adding = false){
        this._messageService.getEmmitMessages(this.token,1).subscribe(
            response=>{
             
                if(response.messages){
                    console.log(response)
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;

                    if (!adding) {
                        //console.log('!adding');
                        this.messages = response.messages;
                        //console.log("publicaciones->",this.publications)
                      } else {
                        var arrayA = this.messages;
                        var arrayB = response.messages;
                        this.messages = arrayA.concat(arrayB);
                        //console.log('RESPUESTA FOLLOWS', response);
                      }
                      this.viewMore();
                }
            },
            error=>{
                console.log(<any>error)
            }
        )
    }
    noMore =false;

    viewMore() {
        this.page = this.page + 1;
    
        if (this.page <= this.pages) {
          this.getMessages(this.page, true);
        } else {
          this.noMore = true;
          console.log('noMore = true');
        }
      }
    

    // getFollowingUsers(id, page, adding = false) {
    //     this._followService.getFollowing(this.token, id, page).subscribe(
    //       (response) => {
    //         if (response.follows) {
    //           this.total = response.total;
    //           this.pages = response.pages;
    
    //           this.itemsPerPage = response.total;
    
    //           if (!adding) {
    //             //console.log('!adding');
    //             this.follows = response.follows;
    //             //console.log("publicaciones->",this.publications)
    //           } else {
    //             var arrayA = this.follows;
    //             var arrayB = response.follows;
    //             this.follows = arrayA.concat(arrayB);
    //             //console.log('RESPUESTA FOLLOWS', response);
    //           }
    //           // alert(response.total);
    //           // alert(response.pages);
    
    //            //console.log("FOLLOWS->",this.follows);
    //           this.viewMore();
    //         } else {
    //           this.status = 'error';
    //         }
    //       },
    //       (error) => {
    //         console.log("'/perfil'" + this.identity._id);
    //         this._router.navigate(['/perfil', this.identity._id]);
    //       }
    //     );
    //   }

    
}