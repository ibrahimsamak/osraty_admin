import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor(private http:HttpClient) { }


    getDeliveryData(){
      return this.http.get('/constant/delivery')
    }

    DeleteDeliveryData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/delivery/${id}`, httpOptions)
    }

    UpdateDeliveryData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/delivery/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateDeliveryData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/delivery',JSON.stringify(conent), httpOptions) 
    }


    getDeliveryOptionsData(){
      return this.http.get('/constant/DeliveryOption')
    }

    DeleteDeliveryOptionsData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/DeliveryOption/${id}`, httpOptions)
    }

    UpdateDeliveryOptionsData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/DeliveryOption/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateDeliveryOptionsData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/DeliveryOption',JSON.stringify(conent), httpOptions) 
    }

    getBuyUnitsData(){
      return this.http.get('/constant/BuyUnits')
    }

    DeleteBuyUnitsData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/BuyUnits/${id}`, httpOptions)
    }

    UpdateBuyUnitsData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/BuyUnits/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateBuyUnitsData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/BuyUnits',JSON.stringify(conent), httpOptions) 
    }

    getBuyOptionsData(){
      return this.http.get('/constant/BuyOptions')
    }

    DeleteBuyOptionsData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/BuyOptions/${id}`, httpOptions)
    }

    UpdateBuyOptionsData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/BuyOptions/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateBuyOptionsData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/BuyOptions',JSON.stringify(conent), httpOptions) 
    }


    getContactOptionData(){
      return this.http.get('/constant/ContactOption')
    }

    DeleteContactOptionData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/ContactOption/${id}`, httpOptions)
    }

    UpdateContactOptionData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/ContactOption/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateContactOptionData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/ContactOption',JSON.stringify(conent), httpOptions) 
    }

    getSocialOptionData(){
      return this.http.get('/constant/SocialOption')
    }

    DeleteSocialOptionData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/SocialOption/${id}`, httpOptions)
    }

    UpdateSocialOptionData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/SocialOption/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateSocialOptionData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/SocialOption',JSON.stringify(conent), httpOptions) 
    }


    getStaticPagenData(){
      return this.http.get('/constant/staticpage')
    }

    getSingleStaticPagenData(id){
      return this.http.get(`/constant/staticpage/${id}`)
    }

    DeleteStaticPageData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/constant/staticpage/${id}`, httpOptions)
    }

    UpdateStaticPageData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/constant/staticpage/${id}`,JSON.stringify(conent), httpOptions)
    }

    CreateStaticPageData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/constant/staticpage',JSON.stringify(conent), httpOptions) 
    }

  
    CreateCategoryData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/product/category',JSON.stringify(conent), httpOptions) 
    }

    getCategoryData(){
      return this.http.get('/product/category')
    }

    getSingleCategoryData(id){
      return this.http.get(`/product/category/${id}`)
    }

    DeleteCategoryData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/product/category/${id}`, httpOptions)
    }

    UpdateCategoryData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/product/category/${id}`,JSON.stringify(conent), httpOptions)
    }

  
    CreateSubCategoryData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/product/subcategory',JSON.stringify(conent), httpOptions) 
    }

    getSubCategoryData(){
      return this.http.get('/product/subcategory')
    }

    getSubCategoryDataByCategoryId(id){
      return this.http.get(`/product/subcategorybycategoryid/${id}`)
    }

    getSingleSubCategoryData(id){
      return this.http.get(`/product/subcategory/${id}`)
    }

    DeleteSubCategoryData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/product/subcategory/${id}`, httpOptions)
    }

    UpdateSubCategoryData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/product/subcategory/${id}`,JSON.stringify(conent), httpOptions)
    }


    CreateSupplierData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/product/supplier',JSON.stringify(conent), httpOptions) 
    }

    getSupplierData(){
      return this.http.get('/product/supplier')
    }

    getSingleSupplierData(id){
      return this.http.get(`/product/supplier/${id}`)
    }

    DeleteSupplierData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/product/supplier/${id}`, httpOptions)
    }

    UpdateSupplierData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/product/supplier/${id}`,JSON.stringify(conent), httpOptions)
    }


    CreateProductData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/product/product',JSON.stringify(conent), httpOptions) 
    }

    getProductData(){
      return this.http.get('/product/product')
    }

    getProductDataBySubCategoryId(id){
      return this.http.get(`/product/productbysubcategoryid/${id}`)
    }

    getSingleProductData(id){
      return this.http.get(`/product/product/${id}`)
    }

    DeleteProductData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/product/product/${id}`, httpOptions)
    }

    UpdateProductData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/product/product/${id}`,JSON.stringify(conent), httpOptions)
    }

    DeleteOneImage(img){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/product/product/delete/${img}`, httpOptions)
    }


    CreateSupplierProductData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/Supplier/supplierproducts',JSON.stringify(conent), httpOptions) 
    }

    getSupplierProductData(){
      return this.http.get('/Supplier/supplierproducts')
    }

    getSingleSupplierProductData(id){
      return this.http.get(`/Supplier/supplierproducts/${id}`)
    }

    DeleteSupplierProductData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/Supplier/supplierproducts/${id}`, httpOptions)
    }

    UpdateSupplierProductData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
    
      return this.http.put(`/Supplier/supplierproducts/${id}`,JSON.stringify(conent), httpOptions)
    }

    getSupplierProductBySeacrhData(key){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/Supplier/supplierproductsSearch',JSON.stringify(key), httpOptions) 
    }

    getSupplierProductBySubCategory(id,supid){
      return this.http.get(`/Supplier/supplierproductsBySubCategoryId/${id}/${supid}`) 
    }

    getsupplierproductsBySupplierId(id){
      return this.http.get(`/Supplier/supplierproductsBySupplierId/${id}`) 
    }

    CreateAdvtData(conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post('/Adv/adv',JSON.stringify(conent), httpOptions) 
    }

    getAdvData(){
      return this.http.get('/Adv/adv')
    }

    getSingleAdvData(id){
      return this.http.get(`/Adv/adv/${id}`)
    }

    DeleteAdvData(id){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      
      return this.http.delete(`/Adv/adv/${id}`, httpOptions)
    }

    UpdateAdvData(id,conent){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.put(`/Adv/adv/${id}`,JSON.stringify(conent), httpOptions)
    }
}
