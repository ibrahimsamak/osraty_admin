import { Component, OnInit } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { Subscription } from 'rxjs';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.scss']
})
export class AddpaymentComponent extends SuperComponent implements OnInit {

  subscripe: Subscription;
  admins = [];
  selected_category_id;


  payment = {
    ammount: 0,
    from_user: '',
    methodType: '5d8385ebf1798e0911105c99',
    description: ''
  }

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);
  }


  ngOnInit() {
    this.loading = true;
    this.service.getAdminData().subscribe(x => {
      this.admins = x[appConstant.ITEMS] as any[]
      this.loading = false
    })
  }

  ngOnDestroy() {

  }

  Save(category) {
    this.loading = true
    this.service.verfiyPayment(category).subscribe(x => {
      this.loading = false
      this.showToast('success', 'نجاح', 'تم الايداع بنجاح');
      this.resetfile()
    })
  }


  resetfile() {
    this.payment = {
      ammount: 0,
      from_user: '',
      methodType: '',
      description: ''
    }
    this.selected_category_id = null
  }


  AdminChanging(val) {
    this.selected_category_id = val._id;
    this.payment.from_user = val._id
  }
}
