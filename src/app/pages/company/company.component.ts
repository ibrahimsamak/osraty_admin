import { appConstant } from '../service/_constant/appConstant';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../service/constant.service';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  posts: any;
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
      perPage: 30
    },
    actions: {
      title: 'الاجراءات'
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
      name: {
        title: 'الاسم',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  lastID: number;
  subscripe: Subscription;

  constructor(private service: ConstantService) {
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
    this.subscripe = this.service.getpaymentmethodData().subscribe(userList => {
      let data = userList[appConstant.ITEMS] as any;
      this.items = data
      this.source.load(data as any);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeletepaymentmethodData(event.data._id).subscribe(x => {
        console.log(x);
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      });
    }
    else {
      event.confirm.reject();
    }
  }

  onEdit(event) {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']

    let conent = {
      name: event.newData.name
    }

    this.service.UpdatepaymentmethodData(event.data._id, conent).subscribe(x => {
      console.log(x);
      event.confirm.resolve(event.newData);
      this.source.refresh();
    });
  }

  onCreate(event) {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']

    let conent = {
      name: event.newData.name
    }

    this.service.CreatepaymentmethodData(conent).subscribe(x => {
      console.log(x);
      event.confirm.resolve();
      this.getData();
    });
  }
}
