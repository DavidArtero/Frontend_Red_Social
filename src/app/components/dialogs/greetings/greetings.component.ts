import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: 
                  {age:number, name:string},
                  public matDialogRef:MatDialogRef<GreetingsComponent>) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }

  onCloseClick(){
    this.matDialogRef.close();
  }

}
