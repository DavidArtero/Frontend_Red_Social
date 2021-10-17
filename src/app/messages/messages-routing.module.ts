
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AddComponent } from "./components/add/add.component";
import { MainComponent } from "./components/main/main.component";
import { ReceivedComponent } from "./components/received/received.component";
import { SendedComponent } from "./components/sended/sended.component";
import { Router, RouterModule, Routes } from "@angular/router";


const messagesRoutes: Routes =[
    {
        path:'mensajes',
        component: MainComponent,
        children:[
            { path: '', redirectTo: 'recibidos', pathMatch: 'full'},
            { path: 'enviar', component: AddComponent},
            { path: 'recibidos', component: ReceivedComponent},
            { path: 'enviados', component: SendedComponent},

        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MessagesRoutingModule{}