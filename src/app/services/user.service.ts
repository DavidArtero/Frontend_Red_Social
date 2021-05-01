import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()

export class UserService{
    //Guardar nuevo usuario
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }


    //Registrao usuarios
    register(user_to_register: User): Observable<any>{
        let params = JSON.stringify(user_to_register);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        //petición a la api
        return this._http.post(
            this.url + 'register',
            params,
            {headers: headers});
    }

    signup(user: any, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(
            this.url + 'login',
            params,
            {headers: headers});

    }

    //Recibir identity del localStorage 
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity!="undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    //Recibir token del localStorage
    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        console.log("getToken->", this.token)
        return this.token;
    }


    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));

        if(stats != "undefined"){
            this.stats = stats;
        }else{
            this.stats = null;
        }

        return stats;
    }

    
    //Recoger contadores de estadísticas de usuario
    getCounters(userId = null): Observable<any>{
        //console.log("token->",this.getToken());
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        
        
        if(userId !=null){
            return this._http.get(this.url+'counters/'+ userId, {headers:headers});
        }else{
            return this._http.get(this.url+'counters', {headers:headers});
        }

       

                                    

    }

    


}