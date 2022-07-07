import { ConstantService } from './../../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { appConstant } from '../../service/_constant/appConstant';
import { ToasterService } from 'angular2-toaster';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from '../../service/pipe/date-format.pipe';
import { BsLocaleService, defineLocale, enGbLocale } from 'ngx-bootstrap';
import { Page } from '../../service/_constant/page';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent extends SuperComponent implements OnInit {

  @ViewChild('myTable') table: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  page = new Page();
  rows = new Array<any>();
  rowsItems = new Array<any>();
  isLoading: boolean = false;
  modalReference: NgbModalRef;
  postData: any;

  selected_payment_id;
  payments = []
  search = {
    dt_from: '',
    dt_to: '',
    methodFor: '',
    type: 'user'
  }
  content = {}
  type = ''
  total = 0
  constructor(
    private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private modalService: NgbModal,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService,
    private router: Router) {
    super(route, toasterService, router);
    this._localeService.use('en');
    defineLocale('en', enGbLocale);
  }


  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 20;

    this.service.rpt_history(this.page.pageNumber, this.content).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION]
      this.total = pagedData['total']
      if (_page.pageNumber != _page.totalPages) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
      else if (_page.totalPages == 0) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
      else {
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      this.user_name = params['user_name'] == undefined ? null : params['user_name'];
      this.search.type = params['type'] == undefined ? null : params['type'];
      if (this.search.type == 'user') {
        this.type = 'للمستفيد'
      } else {
        this.type = 'للمتبرع'
      }

      this.content['type'] = this.search.type
      this.content['user_id'] = this.id


      if (this.id) {
        if (this.search.type == 'user') {
          this.service.getpaymentforUserData(this.id).subscribe(x => {
            this.payments = x[appConstant.ITEMS] as any[]
            this.loading = false
          })
        } else {
          this.service.getpaymentmethodData().subscribe(x => {
            this.payments = x[appConstant.ITEMS] as any[]
            this.loading = false
          })
        }
        this.setPage({ offset: 0 })
      }
    })
  }

  PaymentChanging(val) {
    this.selected_payment_id = val.type._id;
  }

  Save() {
    if (this.search.type == 'user') {
      if (this.selected_payment_id != '') {
        this.content['methodFor'] = this.selected_payment_id
      }
    } else {
      if (this.selected_payment_id != '') {
        this.content['methodType'] = this.selected_payment_id
      }
    }

    if (this.search.dt_from != '') {
      this.content['dt_start'] = this.search.dt_from
    }
    if (this.search.dt_to != '') {
      this.content['dt_end'] = this.search.dt_to
    }

    this.content['type'] = this.search.type
    this.content['user_id'] = this.id

    this.setPage({ offset: 0 });
  }

  reset() {
    this.search = {
      dt_from: '',
      dt_to: '',
      methodFor: '',
      type: 'user'
    }
    this.selected_payment_id = null
    this.content = {}
  }
}
