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
  selector: 'ngx-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})
export class RequestReportComponent extends SuperComponent implements OnInit {

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

  selected_user_id;
  selected_status_id;
  selected_type_id;
  users = []
  types = []
  search = {
    dt_from: '',
    dt_to: '',
    methodType: '',
    status: ''
  }
  content = {}
  type = ''
  total = 0

  status = [{ _id: 1, name: 'قيد المراجعة' }, { _id: 2, name: 'تمت الموافقة' }, { _id: 3, name: 'مرفوض' }, { _id: 4, name: 'الغاء من المستفيد' }, { _id: 5, name: 'انتهاء الطلب' }]


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
    this.page.size = 10;

    this.service.rpt_request(this.page.pageNumber, this.content).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION];
      this.total = pagedData['total'] as any
      console.log(_page)
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
    this.loading = true
    this.service.getUserData().subscribe(x => {
      this.users = x[appConstant.ITEMS] as any[]
      this.loading = false
    })
    this.service.getpaymentforData().subscribe(x => {
      this.types = x[appConstant.ITEMS] as any[]
      this.loading = false
    })

    this.setPage({ offset: 0 })
  }

  PaymentChanging(val) {
    this.selected_user_id = val._id;
  }

  PaymentChanging2(val) {
    this.selected_status_id = val._id;
  }

  PaymentChanging3(val) {
    this.selected_type_id = val._id;
  }
  Save() {
    if (this.selected_user_id != null) {
      this.content['user_id'] = this.selected_user_id
    }
    if (this.search.dt_from != '') {
      this.content['dt_start'] = this.search.dt_from
    }
    if (this.search.dt_to != '') {
      this.content['dt_end'] = this.search.dt_to
    }
    if (this.selected_status_id != null) {
      this.content['status'] = this.selected_status_id
    }
    if (this.selected_type_id != null) {
      this.content['type'] = this.selected_type_id
    }

    console.log(this.content)
    this.setPage({ offset: 0 });
  }

  reset() {
    this.search = {
      dt_from: '',
      dt_to: '',
      methodType: '',
      status: '-1'
    }
    this.selected_user_id = null
    this.selected_status_id = null
    this.content = {}
  }
}
