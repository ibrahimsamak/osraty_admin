import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { appConstant } from '../service/_constant/appConstant';
import { FileUploader } from 'ng2-file-upload';
import { ToasterService } from 'angular2-toaster';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
const uri = appConstant.BASE_URL + 'file_upload';

@Component({
  selector: 'ngx-staticpage',
  templateUrl: './bank-file.component.html',
  styleUrls: ['./bank-file.component.scss']
})
export class BankFileComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  loading;
  id;
  staticpage = {
    title: '',
    content: '',
    image: ''
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
      delete: false
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
      file_name: {
        title: 'القالب',
        type: 'string',
      },
      file_url: {
        title: 'الرابط',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  lastID: number;
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
  attachmentList: any = [];

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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      this.service.getSingleFileData(this.id).subscribe(x => {
        let obj = x[appConstant.ITEMS] as any;
        this.staticpage.title = obj.file_details
      });
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.subscripe = this.service.getFileData().subscribe(userList => {
      let data = userList[appConstant.ITEMS] as any;
      this.items = data
      this.source.load(data as any);
    });
  }

  onUserRowSelect(event) {
    this.router.navigate(['/pages/constant/files/', event.data._id]);
  }


  Save(category) {
    // let myDate = this._dateFormatPipe.format(this.start);
    // console.log(myDate);
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        console.log('>0')
        this.upload(category);
      }
      else {
        console.log('=0')
        let conent = {
          title: category.title
        }
        this.loading = true
        this.service.UpdateBankFileData(this.id, conent).subscribe(x => {
          this.staticpage = {
            title: '',
            content: '',
            image: ''
          }
          this.loading = false
          this.router.navigate(['/pages/constant/files/']);
        }, err => {
          this.loading = false
          console.log(err.error);
        });
      }
    }
    else {
      this.upload(category);
    }
  }

  upload(category) {
    console.log(category)
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.rawFile)
      const url = item.file.rawFile
      this.staticpage.image = url;

      if (this.id) {
        this.loading = true
        this.service.UpdateBankFileData(this.id, this.staticpage).subscribe(x => {
          this.staticpage = {
            title: '',
            content: '',
            image: ''
          }
          this.loading = false
          this.uploader.clearQueue();
          this.router.navigate(['/pages/constant/files/']);
        }, (err) => {
          this.loading = false
        });
      }
      else {
        this.loading = true
        this.service.CreateBankFileData(this.staticpage).subscribe(x => {
          this.staticpage = {
            title: '',
            content: '',
            image: ''
          }
          this.loading = false
          this.uploader.clearQueue();
          this.resetfile();
          this.getData();
        }, err => {
          this.loading = false
          console.log(err.error);
        });
      }
    }
  }

  resetfile() {
    this.staticpage = {
      title: '',
      content: '',
      image: ''
    }
  }
}
