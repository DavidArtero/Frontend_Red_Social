import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';



@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [ UserService, PublicationService, UploadService]
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
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
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

      onSubmit(form, $event){
          //console.log(this.publication);
          this._publicationService.addPublication(this.token, this.publication).subscribe(
              response=>{
                  if(response.publication){
                  
                     
                    if(this.filesToUpload && response.publication.file !=null){
                        console.log("response.file->> " ,response.publication.file)
                        alert("hello")
                        //Subir imagen
                      this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image')
                      .then((result:any)=>{
                         this.publication.file = result.image;

                         this.publication = response.publication;
                         this.status = 'success';
                         this.getCounters();
                         form.reset();
                         this.filesToUpload = null;
                         
                         this._router.navigate(['/timeline']);
                         this.sended.emit({send:'true'});
                         console.log(this.filesToUpload)
                      });

                    }else{
                        this.status = 'success';
                         this.getCounters();
                         form.reset();
                         this.sended.emit({send:'true'});
                    }


                  }else{
                      this.status = 'error';
                      form.reset();
                      this._router.navigate(['/timeline']);
                      this.sended.emit({send:'true'});
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

      public filesToUpload: Array<File>;
    
      //Subida archivos publicaciones
      fileChangeEvent(fileInput:any){
          this.filesToUpload = <Array<File>>fileInput.target.files;
          console.log(this.filesToUpload)
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




        //Output
        @Output() sended = new EventEmitter();

        sendPublication(event){
            console.log(event);
            this.sended.emit({send:'true'});
        }
    
    
}