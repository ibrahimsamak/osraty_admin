import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ConstantService } from '../service/constant.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
// import {saveAs} from 'file-saver';

const uri = '/constant/file_upload';

@Component({
  selector: 'ngx-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit  , OnDestroy{

  selectedFile: File;

  posts :any;
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
        title: 'العنوان',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  lastID: number;
  subscripe:Subscription;

  // uploader:FileUploader = new FileUploader({url:uri});
  // attachmentList:any = [];


  constructor(private service:ConstantService) { 
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show ==false) {
          delete this.settings.columns["_id"];
      }
    }

    // this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
    //     this.attachmentList.push(JSON.parse(response));
    //   }
  }

  ngOnInit() {
     this.getData()
  }

  ngOnDestroy(){
    this.subscripe.unsubscribe();
  }

  getData(){
   this.subscripe =  this.service.getDeliveryData().subscribe(userList => {
      this.items = userList as any;
      this.source.load(userList as any);
    });
  }

  onDeleteConfirm(event): void 
  {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) 
    {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteDeliveryData(event.data._id).subscribe(x=>{
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

  onEdit(event) 
  {
   let conent = {
      name: event.newData.name
    }    

    this.service.UpdateDeliveryData(event.data._id,conent).subscribe(x=>{
      console.log(x);
      event.confirm.resolve(event.newData);
      this.source.refresh();
    });
  }

  onCreate(event) 
  {
   let conent = {
      name: event.newData.name
    }       
    this.service.CreateDeliveryData(conent).subscribe(x=>{
      console.log(x);
      event.confirm.resolve();
      this.getData();
    });
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  // onUpload()
  // {
  //   const uploadData = new FormData();
  //   uploadData.append('title', this.selectedFile, this.selectedFile.name);
  //   uploadData.append('content', 'rrwrwrw');
  //   this.service.CreateFile(uploadData).subscribe(x=>console.log(x)); 
  // }




    // download(index){
    //     var filename = this.attachmentList[index].uploadname;

    //     this._fileService.downloadFile(filename)
    //     .subscribe(
    //         data => saveAs(data, filename),
    //         error => console.error(error)
    //     );
    // }

}
