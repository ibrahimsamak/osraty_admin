import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../../service/constant.service';
import { OfferService } from '../../../service/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';
import { ToasterService } from 'angular2-toaster';
import { appConstant } from '../../../service/_constant/appConstant';

@Component({
  selector: 'ngx-addofferquot',
  templateUrl: './addofferquot.component.html',
  styleUrls: ['./addofferquot.component.scss']
})
export class AddofferquotComponent extends SuperComponent implements OnInit {

  products: any;
  suppliers = [];
  selected_supplier_id;
  selected_product_id;

  offerObj = {
    supplier_id: '',
    product_id: '',
    new_price: '',
    qty: '',
  }

  constructor(private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);

  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loading = true
    this.service.getSupplierData().subscribe((response) => {
      this.suppliers = response as any
      this.loading = false
      if (this.id) {
        this.isEdit = true;
        this.loading = true
        this.offer.getSingOfferData(this.id).subscribe((res) => {
          const json = res[appConstant.ITEMS] as any;
          this.offerObj = json
          this.selected_supplier_id = json['supplier_id']
          this.service.getsupplierproductsBySupplierId(this.selected_supplier_id).subscribe((res2) => {
            this.products = res2 as any[]
            this.selected_product_id = json['product_id']['_id']
          });
          this.loading = false
        });
      }
    })
  }

  Save(content) {
    console.log(content)
    this.offerObj.product_id = this.selected_product_id
    this.offerObj.supplier_id = this.selected_supplier_id
    if (this.isEdit) {
      this.loading = true
      this.offer.UpdateOfferData(this.id, this.offerObj).subscribe((res) => {
        this.loading = false
        this.router.navigate(['/pages/offer/offer']);
      }, (err) => {
        this.showToast('error', 'خطأ', err.error)
      })
    }
    else {
      this.loading = true
      this.offer.CreateOfferData(this.offerObj).subscribe((res) => {
        this.loading = false
        this.offerObj = {
          supplier_id: '',
          product_id: '',
          new_price: '',
          qty: '',
        }
        this.showToast('success', 'نجاح', 'تمت اضافة المنتج الى قائمة باقات التوفير')
      }, (err) => {
        this.showToast('error', 'خطأ', err.error)
      })
    }
  }

  SupplierChanging(val) {
    this.selected_supplier_id = val._id;
    this.loading = true
    this.service.getsupplierproductsBySupplierId(val._id).subscribe((res) => {
      this.products = res as any[]
      this.loading = false
    });
  }

  ProductChanging(val) {
    console.log(val)
    this.selected_product_id = val.product_id._id;
  }
}
