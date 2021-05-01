import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Bienvenido a la Red Social';
    }

    
    
    
    
    ngOnInit() {
        console.log('Home.component cargado');
        
    }
    
}