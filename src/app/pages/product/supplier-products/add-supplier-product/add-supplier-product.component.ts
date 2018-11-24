import { Component, OnInit } from '@angular/core';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { FormatDateService } from '../../../service/custom/format-date.service';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { SupplierProduct } from '../../../../_models/supplier-product';
import { BsDatepickerConfig } from "ngx-bootstrap";
import { format } from 'date-fns';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-add-supplier-product',
  templateUrl: './add-supplier-product.component.html',
  styleUrls: ['./add-supplier-product.component.scss']
})
export class AddSupplierProductComponent extends SuperComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = { containerClass: 'theme-dark-blue', dateInputFormat: 'Y-MM-DD' };
  subscripe: Subscription;

  products = [];
  suppliers = [];
  buyUnits: any;
  categories = [];
  sub_categories = [];

  selected_Category;
  selected_subCategory;

  buyUnitsName: any[]

  priceItem = {
    buy_unit_id: '',
    buy_unit_name: '',
    price: ''
  }

  prices: any;
  productPrices: any;
  model: any;
  myForm: FormGroup;


  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private dateFormatPipe: FormatDateService,
    private fb: FormBuilder) {
    super(route, toasterService, router);
    this.myForm = SupplierProduct.buildForm(fb);
    this.model = new SupplierProduct(null, null, null, null, null, null, null);
  }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.myForm.get('sub_category_id').disable();
    this.myForm.get('product_id').disable();

    this.subscripe = this.service.getSupplierData()
      .pipe(switchMap(res1 => {
        this.suppliers = res1 as any[];
        return this.service.getCategoryData()
      }))
      .pipe(switchMap(res3 => {
        this.categories = res3 as any[]
        return this.service.getBuyUnitsData()
      }))
      .pipe(switchMap(res2 => {
        // this.buyUnits = res2;
        this.buyUnitsName = res2 as any

        this.myForm.get('prices') as FormArray;
        this.prices = this.myForm.get('prices') as FormArray;
        this.prices.controls = [];
        var x = res2 as any[];
        x.forEach((i: any) => {
          console.log(i);
          this.prices.push(this.createItem(i._id, i.name, ''));
        });
        return this.service.getBuyOptionsData()
      }))
      // .pipe(switchMap(res4 => {
      //   this.products = res4 as any[];
      //   return this.service.getProductData()
      // }))
      .subscribe(Response => {
        if (this.id) {
          this.loading = true;
          this.myForm.get('sub_category_id').enable();
          this.myForm.get('product_id').enable();

          this.isEdit = true;
          // this.model = Response as any
          this.service.getSingleSupplierProductData(this.id)
            .subscribe(response2 => {
              this.model = response2 as any;
              this.productPrices = response2['prices'];

              for (let control of this.prices.controls) {
                const findItem = control.controls['buy_unit_id'].value;
                if (findItem) {
                  const itemPrice = this.productPrices.find(x => x.buy_unit_id == findItem);
                  if (itemPrice) {
                    control.patchValue({
                      checked: true
                    }, { onlySelf: true });
                  }
                }
              }

              this.service.getSubCategoryDataByCategoryId(response2['category_id']).subscribe(res1 => {
                console.log(res1)
                this.sub_categories = res1 as any[];
               
                this.myForm.patchValue({sub_category_id: response2['sub_category_id']}, { onlySelf: true });
                const _item3 = this.sub_categories.find((x) => {
                  x.ـid == response2['sub_category_id'];
                  return x;
                });
                this.myForm.get('sub_category_id').patchValue(_item3);

                  this.service.getProductDataBySubCategoryId(response2['sub_category_id']).subscribe(res3 => {
                    console.log(res3)
                    this.products = res3 as any[]

                    this.myForm.patchValue({product_id: response2['product_id']}, { onlySelf: true });
                    const _item2 = this.products.find((x) => {
                      x.ـid == response2['product_id'];
                      return x;
                    });
                    this.loading = false;
                    this.myForm.get('product_id').patchValue(_item2);
                  });
              });

              this.myForm.patchValue({
                supplier_id: response2['supplier_id']
              }, { onlySelf: true });
              const _item = this.suppliers.find((x) => {
                x.ـid == response2['supplier_id'];
                return x;
              });
              this.myForm.get('supplier_id').patchValue(_item);

              this.myForm.patchValue({
                category_id: response2['category_id']
              }, { onlySelf: true });
              const _item1 = this.categories.find((x) => {
                x.ـid == response2['category_id'];
                return x;
              });
              this.myForm.get('category_id').patchValue(_item1);
            })
        }
      });
  }

  getTrue(item) {
    if (this.isEdit && this.model.prices) {
      const x = this.productPrices.find((x) => x.buy_unit_id == item) ? true : false;
      return x;
    }
  }

  getPrice(item) {
    if (this.model.prices) {
      const itemProductPrice = this.productPrices.find((x) => x.buy_unit_id == item);
      const x = itemProductPrice ? itemProductPrice.price : '';
      return x;
    }
    else {
      return '';
    }
  }

  Save() {
    this.myForm.value.dt_end = format(this.myForm.value.dt_end, 'YYYY-MM-DD');
    this.myForm.value.supplier_id = this.myForm.value.supplier_id._id;
    this.myForm.value.category_id = this.myForm.value.category_id._id;
    this.myForm.value.product_id = this.myForm.value.product_id._id;
    this.myForm.value.prices = this.myForm.value.prices.filter((i) => {
      return i.checked == true;
    })
    let obj = this.myForm.value;

    if (this.myForm.value.prices.length === 0) {
      return this.showToast('error', 'خطأ!!', 'الرجاء تحديد السعر');
    }

    if (this.isEdit) {
      this.service.UpdateSupplierProductData(this.id, obj).subscribe(x => {
        this.showToast('success', 'نجاح!!', 'تمت تعديل المنتج بنجاح');
      }, err => {
        this.showToast('error', 'خطأ!!', err.error);
      });
    } else {
      this.service.CreateSupplierProductData(obj).subscribe(x => {
        this.myForm.reset();
        this.showToast('success', 'نجاح!!', 'تمت اضافة المنتج بنجاح');
      }, err => {
        this.showToast('error', 'خطأ!!', err.error);
      });
    }
  }

  onChange(event, cat: any, price: HTMLInputElement, i) {
    if (event.target.checked) {
      console.log(event, cat, price.value)
      this.priceItem = { buy_unit_id: cat._id, buy_unit_name: cat.name, price: price.value }
      this.model.prices.push(this.priceItem)
    }
    else {
      console.log(event, cat)
      this.model.prices.splice(i, 1)
    }
    console.log(this.model.prices);
  }
  onChangeType(event, cat: any, i) {
    this.model.prices.find((x) => x.buy_unit_id == cat._id).price = event.value;
  }

  createPrice(buy_unit_id, buy_unit_name, price): FormGroup {
    return this.fb.group({
      buy_unit_id: buy_unit_id,
      buy_unit_name: buy_unit_name,
      price: price
    })
  }

  onChangeCheck(event, $index) {
    let items = this.myForm.get('prices') as FormArray;
    if (event.target.checked) {
      items.at($index).patchValue({ 'checked': true });
    } else {
      items.at($index).patchValue({ 'checked': false });
    }
  }

  createItem(buy_unit_id, buy_unit_name, price): FormGroup {
    return this.fb.group({
      buy_unit_id: buy_unit_id,
      buy_unit_name: buy_unit_name,
      price: price,
      checked: false
    });

  }

  selectCategory(item) {
    this.myForm.get('category_id').valueChanges

    this.loading = true
    this.service.getSubCategoryDataByCategoryId(item._id).subscribe((res) => {
      console.log(res, item._id)
      this.sub_categories = res as any
      if (this.sub_categories.length > 0) {
        this.myForm.get('sub_category_id').enable();
      } else {
        this.myForm.controls['sub_category_id'].setValue('')
      }
      this.loading = false
    })
  }

  selectSubCategory(item) {
    this.myForm.get('sub_category_id').valueChanges

    this.loading = true
    this.service.getProductDataBySubCategoryId(item._id).subscribe((res) => {
      this.products = res as any[]
      if (this.products.length > 0) {
        this.myForm.get('product_id').enable();
      } else {
        this.myForm.controls['product_id'].setValue('')
      }
      this.loading = false
    })
  }

  get getPrices() {
    return this.myForm.get('prices') as FormArray;
  }
}