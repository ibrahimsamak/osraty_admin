import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.post('/basket/basket',JSON.stringify(conent), httpOptions) 
  }

  getBasketData(){
    return this.http.get('/basket/basket')
  }

  getSingBasketData(id){
    return this.http.get(`/basket/basket/${id}`)
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
    
    return this.http.delete(`/basket/basket/${id}`, httpOptions)
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
  
    return this.http.put(`/basket/basket/${id}`,JSON.stringify(conent), httpOptions)
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
    return this.http.post('/quota/quota',JSON.stringify(conent), httpOptions) 
  }

  getOfferData(){
    return this.http.get('/quota/quota')
  }

  getSingOfferData(id){
    return this.http.get(`/quota/quota/${id}`)
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
    
    return this.http.delete(`/quota/quota/${id}`, httpOptions)
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
  
    return this.http.put(`/quota/quota/${id}`,JSON.stringify(conent), httpOptions)
  }

}
