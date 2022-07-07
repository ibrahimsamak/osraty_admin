import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { Toast, ToasterConfig, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../service/_constant/appConstant';
import { DatePipe } from '@angular/common';
import { MessagingService } from '../service/_shared/messaging.service';
const uri = appConstant.BASE_URL + 'file_upload';

@Component({
  selector: 'ngx-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.scss']
})
export class AttendComponent extends SuperComponent implements OnInit {
  selected_news_id;

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
  attachmentList: any = [];
  isEdit = false;
  events = []
  count: any;

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
      delete: false,
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
      news_id: {
        title: 'المناسبة',
        type: 'html',
        filter: true,
        valuePrepareFunction: (news_id: string) => {
          return news_id['title'];
        },
      },
      user_id: {
        title: 'الاسم',
        type: 'html',
        filter: true,
        valuePrepareFunction: (user_id: string) => {
          return user_id['full_name'];
        },
      },
      createAt: {
        title: 'التاريخ',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
          return formatted;
        }
      },
    }
  };

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
    this.getEvents()
  }

  ngOnDestroy() {

  }

  getData(id) {
    this.loading = true;
    this.subscripe = this.service.getAttend(id).subscribe(userList => {
      this.items = userList[appConstant.ITEMS] as any[];
      this.source.load(userList[appConstant.ITEMS] as any);
      this.loading = false;
      this.count = this.items.length;
    });
  }


  getEvents() {
    this.loading = true
    this.service.getEventData().subscribe((res) => {
      this.events = res[appConstant.ITEMS] as any[]
      this.loading = false
    });
  }

  NewsChanging(val) {
    this.selected_news_id = val._id
    this.getData(this.selected_news_id)
  }
}
