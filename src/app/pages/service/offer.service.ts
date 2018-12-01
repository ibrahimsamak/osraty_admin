import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConstant } from './_constant/appConstant';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http:HttpClient) { }

  CreateBasketData(conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    return this.http.post(appConstant.BASE_URL+'/basket/basket',JSON.stringify(conent), httpOptions) 
  }

  getBasketData(){
    return this.http.get(appConstant.BASE_URL+'/basket/basket')
  }

  getSingBasketData(id){
    return this.http.get(appConstant.BASE_URL+`/basket/basket/${id}`)
  }

  DeleteBaskettData(id){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    
    return this.http.delete(appConstant.BASE_URL+`/basket/basket/${id}`, httpOptions)
  }

  UpdateBaskettData(id,conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
  
    return this.http.put(appConstant.BASE_URL+`/basket/basket/${id}`,JSON.stringify(conent), httpOptions)
  }


  CreateOfferData(conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    return this.http.post(appConstant.BASE_URL+'/quota/quota',JSON.stringify(conent), httpOptions) 
  }

  getOfferData(){
    return this.http.get(appConstant.BASE_URL+'/quota/quota')
  }

  getSingOfferData(id){
    return this.http.get(appConstant.BASE_URL+`/quota/quota/${id}`)
  }

  DeleteOfferData(id){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
    
    return this.http.delete(appConstant.BASE_URL+`/quota/quota/${id}`, httpOptions)
  }

  UpdateOfferData(id,conent){
    const httpOptions = {
      headers: new HttpHeaders({      
        'Content':"application/json",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*"
      }),
    };
  
    return this.http.put(appConstant.BASE_URL+`/quota/quota/${id}`,JSON.stringify(conent), httpOptions)
  }

}
