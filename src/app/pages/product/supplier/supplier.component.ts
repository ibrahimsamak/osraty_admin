import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/catch';
const uri = '/product/category/file_upload';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})

export class SupplierComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload: ElementRef;

  loading;
  id;
  supplier = {
    name: '',
    image: '',
    details: ''
  };

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
      name: {
        title: 'المورد',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
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

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
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
      this.service.getSingleSupplierData(this.id).subscribe(x => {
        this.supplier = x as any;
        this.isEdit = true;
        this.loading = false;
      });
      this.loading = false;
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.subscripe = this.service.getSupplierData().subscribe(userList => {
      this.items = userList as any;
      this.source.load(userList as any);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteSupplierData(event.data._id).subscribe(x => {
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
    this.router.navigate(['/pages/product/supplier/', event.data._id]);
  }


  Save(supplier) {
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.upload(supplier);
      }
      else {
        let conent = {
          name: supplier.name,
          image: supplier.image,
          details: supplier.details
        }
        console.log(conent)
        this.service.UpdateSupplierData(this.id, conent).subscribe(x => {
          this.supplier = {
            name: '',
            image: '',
            details: ''
          }
          this.router.navigate(['/pages/product/supplier/']);
        }, err => {
          console.log(err.error);
          this.showToast('error', 'خطا', err.error);
        });
      }
    }
    else {
      this.upload(supplier);
    }
  }

  upload(supplier) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.rawFile)
      this.service.AddImagetoServer(item.file.rawFile).subscribe((res) => {
        const url = res['result']['url']
        this.supplier.image = url;

        this.supplier.name = supplier.name;
        this.supplier.details = supplier.details;
        if (this.id) {
          this.service.UpdateSupplierData(this.id, this.supplier).subscribe(x => {
            this.supplier = {
              name: '',
              image: '',
              details: ''
            }
            this.uploader.clearQueue();
            this.resetfile();
            this.router.navigate(['/pages/product/supplier/']);
          }, (err) => {
            this.showToast('error', 'خطأ', err.error);
          });
        }
        else {
          this.loading = true;
          this.service.CreateSupplierData(this.supplier).subscribe(x => {
            this.supplier = {
              name: '',
              image: '',
              details: ''
            }
            this.uploader.clearQueue();
            this.loading = false;
            this.resetfile();
            this.getData();
          }, err => {
            this.showToast('error', 'خطأ', err.error);
          });
        }
        
      });
    }
  }

  resetfile() {
    this.fileUpload.nativeElement.value = '';
    this.supplier.image = '';
  }
}
