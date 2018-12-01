import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConstant } from './_constant/appConstant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserInfo(){
    return this.http.get(appConstant.BASE_URL+'/User/userslist')
  }

  BlockUser(id,conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    
    return this.http.put(appConstant.BASE_URL+`/User/block/${id}`,JSON.stringify(conent) ,httpOptions)
  }

  UpdateUserProfile(id,conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
  
    return this.http.put(appConstant.BASE_URL+`/User/updateprofile/${id}`,JSON.stringify(conent), httpOptions)
  }

  CreateNewUser(conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    return this.http.post(appConstant.BASE_URL+'/User/add',JSON.stringify(conent), httpOptions) 
  }

  reSendCode(id){
  
  }
  
}
