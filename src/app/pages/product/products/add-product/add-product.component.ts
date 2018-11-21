import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends SuperComponent implements OnInit, OnDestroy {
  uri = '/product/category/file_upload';

  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: this.uri, queueLimit: 5 });
  attachmentList: any = [];
  imagesArr = [];
  thumImage = '';
  cateogires = [];
  sub_cateogires = [];
  selected_category_id;
  selected_sub_category_id;

  product = {
    name: '',
    images: [],
    barcode: '',
    supplierno: '0',
    made_country: '',
    details: '',
    image: '',
    category_id: '',
    sub_category_id: ''
  }

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
      super(route, toasterService, router);
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    this.subscripe = this.service.getCategoryData().pipe(
      switchMap(res => {
        this.cateogires = res as any[]
        console.log(this.cateogires)
        this.loading = false;
        return this.service.getSingleProductData(this.id)
      })).subscribe(res2 => {
        if (this.id) {
          this.product = res2 as any;
          this.isEdit = true;
          this.imagesArr = this.product['images']
          this.selected_category_id = res2['category_id']
          this.service.getSubCategoryDataByCategoryId(res2['category_id']).subscribe((res)=>{
            this.sub_cateogires = res as any[]
            this.selected_sub_category_id = res2['sub_category_id']
            this.loading = false;
          })
        }
      });
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  Save(product) {
        // product.category_id = this.selected_category_id
        // console.log(product,this.selected_category_id)

    if (this.id) 
    {
      if (this.uploader.queue.length > 0) {
        this.saveAction(product);
      }
      else {
        this.product = {
          name: product.name,
          barcode: product.barcode,
          made_country: product.made_country,
          images: product.images,
          details: product.details,
          supplierno: product.supplierno,
          image: this.product.image,
          sub_category_id: this.selected_sub_category_id,
          category_id: this.selected_category_id
        }
        this.service.UpdateProductData(this.id, this.product).subscribe(x => {
          this.router.navigate(['/pages/product/products/']);
        }, err => {
          console.log(err.error);
          this.showToast('error', 'خطأ !!', err.error);
        });
      }
    }
    else {
      this.saveAction(product);
    }
  }

  upload() {
    if (this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
      var x: number;
      for (x = 0; x < this.uploader.queue.length; x++) {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          var res = JSON.parse(response);
          var resArr = res.filename;
          var i: number;
          for (i = 0; i < resArr.length; i++) {
            console.log(resArr[0]);
            this.thumImage = resArr[0]['filename'];
            for (let key in resArr[i]) {
              if (key == 'filename') {
                let value = resArr[i][key];
                this.imagesArr.push(value);
              }
            }
          }
        }
      }
    }
  }

  saveAction(product) {
    this.product = {
      name: product.name,
      barcode: product.barcode,
      made_country: product.made_country,
      images: this.imagesArr,
      details: product.details,
      supplierno: product.supplierno,
      image: this.thumImage,
      sub_category_id: this.selected_sub_category_id,
      category_id: this.selected_category_id
    }

    if (this.id) {
      this.service.UpdateProductData(this.id, this.product).subscribe(x => {
        this.resetfile();
        this.router.navigate(['/pages/product/products/']);
      }, (err) => {
        this.showToast('error', 'خطأ!!', err.error);
      });
    }
    else {
      this.loading = true;
      if (this.uploader.queue.length == this.imagesArr.length && this.uploader.queue.length > 0) {
        this.service.CreateProductData(this.product).subscribe(x => {
          this.uploader.clearQueue();
          this.resetfile();
          this.loading = false;
          this.showToast('success', 'نجاح!!', 'تمت اضافة المنتج بنجاح');
        }, err => {
          console.log(err.error);
          this.showToast('error', 'خطأ!!', err.error);
        });
      }
      else {
        this.showToast('error', 'خطأ!!', 'الرجاء رفع صور المنتج');
      }
    }
  }

  deleteImage(index) {
    var img = this.product.images[index]
    this.product.images.splice(index, 1);
    this.service.DeleteOneImage(img).subscribe(result=>{
      this.showToast('success','نجاح!!',(result as any))
    },error=>{
      console.log(error.error);
      this.showToast('error', 'خطأ!!', error.error);
    })
  }
  
  resetfile() {
    this.product = {
      name: '',
      barcode: '',
      made_country: '',
      images: [],
      details: '',
      supplierno: '',
      image: '',
      sub_category_id: '',
      category_id: ''
    }
  }


  CategoryChanging(val) {
    this.selected_category_id = val._id;
    this.loading = true;
    this.service.getSubCategoryDataByCategoryId(val._id).subscribe((res)=>{
      this.sub_cateogires = res as any[]
      this.loading = false;
    });
  }

  SubCategoryChanging(val) {
    this.selected_sub_category_id = val._id
  }
}
