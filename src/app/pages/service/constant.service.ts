import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConstant } from './_constant/appConstant';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor(private http:HttpClient) { }


    getDeliveryData(){
      return this.http.get(appConstant.BASE_URL+'/constant/delivery')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/delivery/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/delivery/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/delivery',JSON.stringify(conent), httpOptions) 
    }


    getDeliveryOptionsData(){
      return this.http.get(appConstant.BASE_URL+'/constant/DeliveryOption')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/DeliveryOption/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/DeliveryOption/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/DeliveryOption',JSON.stringify(conent), httpOptions) 
    }

    getBuyUnitsData(){
      return this.http.get(appConstant.BASE_URL+'/constant/BuyUnits')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/BuyUnits/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/BuyUnits/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/BuyUnits',JSON.stringify(conent), httpOptions) 
    }

    getBuyOptionsData(){
      return this.http.get(appConstant.BASE_URL+'/constant/BuyOptions')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/BuyOptions/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/BuyOptions/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/BuyOptions',JSON.stringify(conent), httpOptions) 
    }


    getContactOptionData(){
      return this.http.get(appConstant.BASE_URL+'/constant/ContactOption')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/ContactOption/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/ContactOption/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/ContactOption',JSON.stringify(conent), httpOptions) 
    }

    getSocialOptionData(){
      return this.http.get(appConstant.BASE_URL+'/constant/SocialOption')
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/SocialOption/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/SocialOption/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/SocialOption',JSON.stringify(conent), httpOptions) 
    }


    getStaticPagenData(){
      return this.http.get(appConstant.BASE_URL+'/constant/staticpage')
    }

    getSingleStaticPagenData(id){
      return this.http.get(appConstant.BASE_URL+`/constant/staticpage/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/constant/staticpage/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/constant/staticpage/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/constant/staticpage',JSON.stringify(conent), httpOptions) 
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
      return this.http.post(appConstant.BASE_URL+'/product/category',JSON.stringify(conent), httpOptions) 
    }

    getCategoryData(){
      return this.http.get(appConstant.BASE_URL+'/product/category')
    }

    getSingleCategoryData(id){
      return this.http.get(appConstant.BASE_URL+`/product/category/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/product/category/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/product/category/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/product/subcategory',JSON.stringify(conent), httpOptions) 
    }

    getSubCategoryData(){
      return this.http.get(appConstant.BASE_URL+'/product/subcategory')
    }

    getSubCategoryDataByCategoryId(id){
      return this.http.get(appConstant.BASE_URL+`/product/subcategorybycategoryid/${id}`)
    }

    getSingleSubCategoryData(id){
      return this.http.get(appConstant.BASE_URL+`/product/subcategory/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/product/subcategory/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/product/subcategory/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/product/supplier',JSON.stringify(conent), httpOptions) 
    }

    getSupplierData(){
      return this.http.get(appConstant.BASE_URL+'/product/supplier')
    }

    getSingleSupplierData(id){
      return this.http.get(appConstant.BASE_URL+`/product/supplier/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/product/supplier/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/product/supplier/${id}`,JSON.stringify(conent), httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/product/product',JSON.stringify(conent), httpOptions) 
    }

    getProductData(){
      return this.http.get(appConstant.BASE_URL+'/product/product')
    }

    getProductDataBySubCategoryId(id){
      return this.http.get(appConstant.BASE_URL+`/product/productbysubcategoryid/${id}`)
    }

    getSingleProductData(id){
      return this.http.get(appConstant.BASE_URL+`/product/product/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/product/product/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/product/product/${id}`,JSON.stringify(conent), httpOptions)
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
      
      return this.http.delete(appConstant.BASE_URL+`/product/product/delete/${img}`, httpOptions)
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
      return this.http.post(appConstant.BASE_URL+'/Supplier/supplierproducts',JSON.stringify(conent), httpOptions) 
    }

    getSupplierProductData(){
      return this.http.get(appConstant.BASE_URL+'/Supplier/supplierproducts')
    }
    getSupplierProductDataPagination(pageIndex , pageSize){
      return this.http.get(appConstant.BASE_URL+'/Product/pageSample?page='+pageIndex+'&limit='+pageSize)
    }

    getSingleSupplierProductData(id){
      return this.http.get(appConstant.BASE_URL+`/Supplier/supplierproducts/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/Supplier/supplierproducts/${id}`, httpOptions)
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
    
      return this.http.put(appConstant.BASE_URL+`/Supplier/supplierproducts/${id}`,JSON.stringify(conent), httpOptions)
    }

    getSupplierProductBySeacrhData(key ,page,limit){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"application/json",
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      return this.http.post(appConstant.BASE_URL+'/Supplier/supplierproductsSearch?page='+page+'&limit='+limit,JSON.stringify(key), httpOptions) 
    }

    getSupplierProductBySubCategory(id,supid){
      return this.http.get(appConstant.BASE_URL+`/Supplier/supplierproductsBySubCategoryId/${id}/${supid}`) 
    }

    getsupplierproductsBySupplierId(id){
      return this.http.get(appConstant.BASE_URL+`/Supplier/supplierproductsBySupplierId/${id}`) 
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
      return this.http.post(appConstant.BASE_URL+'/Adv/adv',JSON.stringify(conent), httpOptions) 
    }

    getAdvData(){
      return this.http.get(appConstant.BASE_URL+'/Adv/adv')
    }

    getSingleAdvData(id){
      return this.http.get(appConstant.BASE_URL+`/Adv/adv/${id}`)
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
      
      return this.http.delete(appConstant.BASE_URL+`/Adv/adv/${id}`, httpOptions)
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
      return this.http.put(appConstant.BASE_URL+`/Adv/adv/${id}`,JSON.stringify(conent), httpOptions)
    }



    AddImagetoServer(uploadFile){
      const httpOptions = {
        headers: new HttpHeaders({      
          'Content':"multipart/form-data",
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*"
        }),
      };
      const formData:FormData = new FormData();
      formData.append('filename',uploadFile)
      return this.http.post(appConstant.BASE_URL+`/Product/file_upload`,formData, httpOptions)
    }
}
