

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AddComponent } from "./components/add/add.component";
import { MainComponent } from "./components/main/main.component";
import { ReceivedComponent } from "./components/received/received.component";
import { SendedComponent } from "./components/sended/sended.component";
import { RouterModule, Routes } from "@angular/router";

import { MessagesRoutingModule } from "./messages-routing.module";



@NgModule({
    declarations:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MessagesRoutingModule
    ],

    exports:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],

    providers:[]
})

export class MessagesModule{};