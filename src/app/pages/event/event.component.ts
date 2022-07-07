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
const uri = appConstant.BASE_URL + 'file_upload';

@Component({
  selector: 'ngx-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent extends SuperComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;

  selectedValue = '0';

  Adv = {
    title: '',
    details: '',
    image: '',
    type: 2,
    place:''
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
      title: {
        title: 'اسم المناسبة',
        type: 'string',
      },
      place:{
        title: 'المكان',
        type: 'string',
      }
      // type: {
      //   title: 'نوع الاعلان',
      //   type: 'html',
      //   valuePrepareFunction: (type: string) => {
      //     if (type === '1') {
      //       return `<span>اعلان منتج</span>`
      //     }
      //     else if (type === '2') {
      //       return `<span>اعلان هايبر</span>`
      //     }
      //     else {
      //       return `<span>اعلان عام</span>`
      //     }
      //   },
      //   filterFunction(obj?: any, search?: string): boolean {
      //     if (obj.toLowerCase().indexOf(search) > -1) {
      //       return true;
      //     }
      //     return false;
      //   }
      // }
    }
  };
  suppliers = [];
  products = [];
  selected_supplier_id;
  selected_product_id;

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
  attachmentList: any = [];
  isEdit = false;

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
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      // this.service.getSupplierData().subscribe((res) => {
      //   this.suppliers = res as any[];
      if (this.id) {
        this.service.getSinglenewsData(this.id).subscribe(x => {
          this.Adv = x['items'] as any;
          this.selectedValue = x['items']['type'] as any
          this.selected_supplier_id = x['items']['supplier_id']
          // this.service.getsupplierproductsBySupplierId(this.selected_supplier_id).subscribe((res2) => {
          //   this.products = res2[appConstant.ITEMS] as any[]
          //   this.selected_product_id = x['product_id']
          // });
          this.isEdit = true;
          this.loading = false;

        });
      }
    })
    // });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.subscripe = this.service.getEventData().subscribe(userList => {
      this.items = userList[appConstant.ITEMS] as any;
      this.source.load(userList[appConstant.ITEMS] as any);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeletenewsData(event.data._id).subscribe(x => {
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
    console.log( event.data)
    this.router.navigate(['/pages/news/AddEvent/', event.data._id]);
  }


  Save(category) {
    // let myDate = this._dateFormatPipe.format(this.start);
    // console.log(myDate);
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.upload(category);
      }
      else {
        let conent = {
          title: category.title,
          image: category.image,
          details: category.details,
          type: 2,
          place:category.place
        }
        this.service.UpdatenewsData(this.id, conent).subscribe(x => {
          this.Adv = {
            title: '',
            details: '',
            image: '',
            type: 2,
            place:''
          }
          this.router.navigate(['/pages/news/AddEvent/']);
        }, err => {
          console.log(err.error);
          this.showToast('error', 'خطأ', err.error);
        });
      }
    }
    else {
      this.upload(category);
    }
  }

  upload(category) {

    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.rawFile)
      const url = item.file.rawFile
      this.Adv.image = url;

      if (this.id) {
        this.service.UpdatenewsData(this.id, this.Adv).subscribe(x => {
          this.Adv = {
            title: '',
            details: '',
            image: '',
            type: 2,
            place:''

          }
          this.uploader.clearQueue();
          this.resetfile();
          this.router.navigate(['/pages/news/AddEvent/']);
        }, (err) => {
          this.showToast('error', 'خطأ', err.error);
        });
      }
      else {
        this.service.CreateNewstData(this.Adv).subscribe(x => {
          this.Adv = {
            title: '',
            details: '',
            image: '',
            type: 1,
            place:''

          }
          this.uploader.clearQueue();
          this.resetfile();
          this.getData();
        }, err => {
          console.log(err.error);
          this.showToast('error', 'خطأ', err.error);
        });
      }
    }
  }

  resetfile() {
    this.fileUpload.nativeElement.value = '';
    this.Adv.image = '';
  }

  onChange(val) {
    this.selectedValue = val
    console.log(this.selectedValue)
  }

  SupplierChanging(val) {
    // this.selected_supplier_id = val._id;
    // this.loading = true
    // this.service.getsupplierproductsBySupplierId(this.selected_supplier_id).subscribe((res) => {
    //   this.products = res[appConstant.ITEMS] as any[]
    //   this.loading = false
    // });
  }

  ProductChanging(val) {
    console.log(val)
    this.selected_product_id = val.product_id._id;
  }
}
