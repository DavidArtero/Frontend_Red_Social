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
       // private _publicationService: PublicationService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit(): void {
       console.log("componente sidebar cargado correctamente")
    }
    ngDoCheck(){
        this.stats = this._userService.getStats();
      }

      onSubmit(){
          console.log(this.publication);
      }

    
    
}