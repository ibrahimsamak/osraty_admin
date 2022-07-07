import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { appConstant } from '../service/_constant/appConstant';

@Component({
  selector: 'ngx-banck-account',
  templateUrl: './banck-account.component.html',
  styleUrls: ['./banck-account.component.scss']
})
export class BanckAccountComponent implements OnInit {

  id;
  staticpage = {
    title:'',
    content:''
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
      title: {
        title: 'اسم الحساب',
        type: 'string',
      },
      content: {
        title: 'رقم الحساب',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  lastID: number;
  subscripe:Subscription;

  constructor(private service:ConstantService , private route:ActivatedRoute,private router: Router ) { 
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show ==false) {
          delete this.settings.columns["_id"];
      }
    }
  }

  ngOnInit() 
  {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      this.service.getSingleBankAccountData(this.id).subscribe(x=>{        
        this.staticpage = x[appConstant.ITEMS] as any;
      });
    });
    this.getData()
  }

  ngOnDestroy(){
    this.subscripe.unsubscribe();
  }

  getData(){
   this.subscripe =  this.service.getBankAccountData().subscribe(userList => {
     let data = userList[appConstant.ITEMS] as any;
      this.items = data
      this.source.load(data as any);
    });
  }

  onDeleteConfirm(event): void 
  {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) 
    {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteBanckAccountData(event.data._id).subscribe(x=>{
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

  onUserRowSelect(event) 
  {
    this.router.navigate(['/pages/constant/bankaccount/', event.data._id]);
  }


  Save(staticpate)
  {
    if(this.id){
      let conent = {
        title: staticpate.title,
        content: staticpate.content
      }    
        this.service.UpdateBankAccountData(this.id,conent).subscribe(x=>{
          this.staticpage = {
            title : '',
            content: ''
          }
          this.router.navigate(['/pages/constant/bankaccount/']);
      });  
    }
 
  }
}
