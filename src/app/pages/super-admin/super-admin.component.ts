import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { Toast, ToasterConfig, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../service/_constant/appConstant';
import { MessagingService } from '../service/_shared/messaging.service';

@Component({
  selector: 'ngx-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent extends SuperComponent implements OnInit {
  selected_job_id;
  admin = {
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
    job_id: '',
    roles: []
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 30
    },
    actions: {
      add: false,
      edit: false,
      width: 25
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
      full_name: {
        title: 'الاسم',
        type: 'string',
      },
      email: {
        title: 'البريد الكتروني',
        type: 'string',
      },
      phone_number: {
        title: 'رقم الجوال',
        type: 'string',
      },
      password: {
        title: 'كلمة المرور',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  jobs: any[];
  subscripe: Subscription;
  isEdit = false;
  Roles = []
  selectedRoles = [];
  arrRoles = [];

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super(route, toasterService, router);
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show == false) {
        delete this.settings.columns["_id"];
      }
    }

  }

  ngOnInit() {
    this.Roles = [
      {name:"كل الصلاحيات"},
      {name:"ادارة مستخدمين النظام"},
      {name:"التقارير والاحصائيات"},
      {name:"الأخبار والمناسبات"},
      {name:"ادارة المتبرعين والمستفيدين"},
      {name:"ادارة الطلبات"},
      {name:"الاشعارات والتنبيهات"}]
  

    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      if (this.id) {
        this.service.getSingleSuperAdminData(this.id).subscribe(x => {
          this.admin = x[appConstant.ITEMS] as any;
          this.selectedRoles= x[appConstant.ITEMS]['roles'] as any[]

          this.isEdit = true;
          this.loading = false;
        });
      }
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }


  getJobs() {
    this.loading = true;
    this.subscripe = this.service.getJobsData().subscribe(userList => {
      let data = userList[appConstant.ITEMS]
      this.jobs = data as any[];
    });
  }

  getData() {
    this.loading = true;
    this.subscripe = this.service.getSuperAdminData().subscribe(userList => {
      let data = userList[appConstant.ITEMS]
      this.items = data as any;
      this.source.load(data as any);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteSuperAdminData(event.data._id).subscribe(x => {
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      });
    }
    else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    this.router.navigate(['/pages/superadmin/AddSuperAdmin/', event.data._id]);
  }


  Save(category) {
    this.upload(category)
  }

  upload(category) {
    if (this.id) {
      this.loading = true
      this.admin.roles = this.selectedRoles
      this.service.UpdateSuperAdminData(this.id, this.admin).subscribe(x => {
        this.admin = {
          full_name: '',
          email: '',
          password: '',
          phone_number: '',
          job_id: '',
          roles:[]
        }
        this.loading = false
        this.resetfile();
        this.router.navigate(['/pages/superadmin/AddSuperAdmin/']);
      }, (err) => {
        this.loading = false
        this.showToast('error', 'خطأ', err.error);
      });
    }
    else {
      this.loading = true
      this.admin.roles = this.selectedRoles
      this.service.CreateSuperAdminData(this.admin).subscribe(x => {
        this.admin = {
          full_name: '',
          email: '',
          password: '',
          phone_number: '',
          job_id: '',
          roles:[]
        }
        this.resetfile();
        this.getData();
        this.loading = false
      }, err => {
        console.log(err.error);
        this.loading = false
        this.showToast('error', 'خطأ', err.error);
      });
    }
  }

  resetfile() {
    this.admin = {
      full_name: '', email: '', password: '', phone_number: '', job_id: '', roles: ['SubAdmin']
    }
    this.selected_job_id = null;
  }


  JobChanging(val) {
    this.selected_job_id = val._id
    this.admin.job_id = val._id
  }
}
