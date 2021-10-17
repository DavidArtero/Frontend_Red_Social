import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable()
export class FollowService{
    public url: string;


    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //métodos
    addFollow(token, follow): Observable<any>{
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);


        
        return this._http.post(this.url + 'follow', params, {headers:headers}); 
    }


    deleteFollow(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);

        return this._http.delete(this.url + 'follow/' + id, {headers: headers});

    }

    //Usuarios que sigo
    getFollowing(token,id,page):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);


        var url = this.url + 'following';
        if(id != null){
            url = this.url + 'following/'+ id +'/'+page;
        }

        return this._http.get(url, {headers:headers})
   }

   //Usuarios que me siguen
   getMyFollows(token):Observable<any>{
       console.log("token->",token)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);

    return this._http.get(this.url+'get-my-follows/true', {headers:headers});
   }
   

}