import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{
    public title: string;
    public identity;

    constructor(_userService: UserService){
        this.title = 'Bienvenido a la Red Social';
        this.identity = _userService.getIdentity();
    }

    
    
    
    
    ngOnInit() {
        console.log('Home.component cargado');
        
    }
    

    
}