import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from '../../services/publication.service';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [ UserService, PublicationService]
})
export class SidebarComponent implements OnInit{
   
    public identity;
    public token;
    public stats;
    public url;
    public status;
    public publication: Publication;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit(): void {

    }
    ngDoCheck(){
        this.stats = this._userService.getStats();
      }

      onSubmit(form){
          //console.log(this.publication);
          this._publicationService.addPublication(this.token, this.publication).subscribe(
              response=>{
                  if(response.publication){
                      this.publication = response.publication;
                      this.status = 'success';
                      this.getCounters();
                      form.reset();
                  }else{
                      this.status = 'error';
                  }
              },
              error=>{
                  var errorMessage =<any>error;
                  console.log(errorMessage)
                    if(errorMessage!=null){
                        this.status = 'error';
                    }
                }
          )

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

    
    
}