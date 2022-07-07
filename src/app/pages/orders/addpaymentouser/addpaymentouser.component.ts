import { Component, OnInit } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { Subscription } from 'rxjs';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { appConstant } from '../../service/_constant/appConstant';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-addpaymentouser',
  templateUrl: './addpaymentouser.component.html',
  styleUrls: ['./addpaymentouser.component.scss']
})
export class AddpaymentouserComponent extends SuperComponent implements OnInit {

  subscripe: Subscription;
  users = [];
  selected_category_id;
  payments = []
  selected_payment_id;

  userDetails = {
    name: '',
    ammount: 0,
    total_ammount: 0
  }
  _data = []

  payment = {
    ammount: 0,
    to_user: '',
    methodFor: '',
    description: ''
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 20
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      width: 50
    },
    columns: {
      _id: {
        title: '#',
        type: 'number',
        editable: false,
        addable: false,
        filter: false,
        show: false
      },
      methodFor: {
        title: 'الخدمة',
        type: 'html',
        filter: true,
        valuePrepareFunction: (user_id: string) => {
          return user_id['name'];
        },
      },
      ammount: {
        title: 'القيمة',
        type: 'string',
      },
      createAt: {
        title: 'التاريخ',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  requestId: any
  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show == false) {
        delete this.settings.columns["_id"];
      }
    }
  }


  ngOnInit() {
    this.loading = true;
    this.service.getUserData().subscribe(x => {
      this.users = x[appConstant.ITEMS] as any[]
      this.loading = false
    })

  }

  ngOnDestroy() {

  }

  getData() {
    let content = {
      to_user: this.selected_category_id,
      methodFor: this.selected_payment_id
    }
    this.subscripe = this.service.getlast20PaymentForUser(content).subscribe(userList => {
      this.items = userList[appConstant.ITEMS] as any[];
      this.source.load(userList[appConstant.ITEMS] as any[]);
      //console.log(this.items)
    });
  }

  Save(category) {
    this.loading = true
    this.service.addPaymentForUser(category).subscribe(x => {
      this.loading = false
      this.showToast('success', 'نجاح', 'تم صرف تبرع بنجاح');
      this.resetfile()
    })
  }

  updateStatus() {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['_id']

    let content = {
      id: this.requestId._id,
      ammount: this.requestId.ammount,
      status: 5,
      notes: this.requestId.Notes,
      superAdmin_id: id
    }
    console.log(content)
    this.service.agreementRequest(content).subscribe(response => {
      let msg = response['message']
      let status = response['status']
      if (status == true) {
        this.showToast('success', 'نجاح', msg);
      } else {
        this.showToast('error', 'خطأ', msg);
      }
    })
  }


  resetfile() {
    this.payment = {
      ammount: 0,
      to_user: '',
      methodFor: '',
      description: ''
    }
    this.requestId = null
    this.selected_category_id = null
    this.selected_payment_id = null
  }

  UserChanging(val) {
    this.selected_category_id = val._id;
    this.payment.to_user = val._id

    this.service.getpaymentforUserData(this.selected_category_id).subscribe(x => {
      console.log(x[appConstant.ITEMS] as any[])
      this.payments = x[appConstant.ITEMS] as any[]
      this.loading = false
    })
  }

  PaymentChanging(val) {
    this.selected_payment_id = val.type._id;
    this.payment.methodFor = val.type._id
    this.requestId = val
    this.getData()
    this.getRequestData(val._id)
  }


  getRequestData(id) {
    this.subscripe = this.service.getLastRequest(id).subscribe(userList => {
      let obj = userList
      console.log(obj)
      this.userDetails.ammount = obj[appConstant.ITEMS].ammount
      this.userDetails.total_ammount = obj['totalPayment']
    });
  }

}
