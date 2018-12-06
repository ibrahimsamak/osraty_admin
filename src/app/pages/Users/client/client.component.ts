import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/catch';
import { UserService } from '../../service/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  loading;
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
      deleteButtonContent: '<i class="nb-close-circled"></i>',
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
    rowClassFunction: (row) =>{
      if(row.data.isBlock === true){
        return 'blocked';
      }else{
        return '';
      }
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
      image: {
        title: 'الصورة',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => {
          return `
             <img width='70px' height='70px' src="${image}" />
        `;
        },
      },
      full_name: {
        title: 'الاسم كاملا',
        type: 'string',
      },
      phone_number: {
        title: 'رقم الجوال',
        type: 'string',
      },
      city: {
        title: 'المدينة',
        type: 'string',
      },
      address: {
        title: 'العنوان',
        type: 'string',
      },
      createAt:{
        title: 'تاريخ التسجيل',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MM yyyy');
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  attachmentList: any = [];
  isEdit = false;

  config = new ToasterConfig({
    positionClass: 'toast-bottom-left',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });

  showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.Default,
    };
    this.toasterService.popAsync(toast);
  }


  constructor(private service: UserService,
    private toasterService: ToasterService,
    private datePipe: DatePipe) {
      if (this.settings.columns["_id"].hasOwnProperty("show")) {
        if (this.settings.columns["_id"].show == false) {
          delete this.settings.columns["_id"];
        }
      }
  }

  ngOnInit() {
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.subscripe = this.service.getUserInfo().subscribe(userList => {
      this.items = userList as any;
      this.source.load(userList as any);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حظر المستخدم؟')) {
      
      this.service.BlockUser(event.data._id,{isBlock: !event.data.isBlock}).subscribe(x => {
        event.confirm.reject();
        this.source.refresh()
      });
    }
    else {
      event.confirm.reject();
    }
  }
}
