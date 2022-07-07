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
  selector: 'ngx-beneficiary-report',
  templateUrl: './beneficiary-report.component.html',
  styleUrls: ['./beneficiary-report.component.scss']
})
export class BeneficiaryReportComponent extends SuperComponent implements OnInit {

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
  selected_status_id;
  payments = []
  search = {
    dt_from: '',
    dt_to: '',
    methodType: '',
    status: ''
  }
  content = {}
  type = ''
  total = 0

  status = [{ _id: '-1', name: 'الكل' }, { _id: 'true', name: 'مفعلة' }, { _id: 'false', name: 'متوقفة' }]


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

    this.service.rpt_beneficiary(this.page.pageNumber, this.content).subscribe(pagedData => {
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
    this.service.getpaymentforData().subscribe(x => {
      this.payments = x[appConstant.ITEMS] as any[]
      this.loading = false
    })
    this.setPage({ offset: 0 })
  }

  PaymentChanging(val) {
    this.selected_payment_id = val._id;
  }



  Save() {
    if (this.selected_payment_id != null) {
      this.content['methodFor'] = this.selected_payment_id
    }
    if (this.search.dt_from != '') {
      this.content['dt_start'] = this.search.dt_from
    }
    if (this.search.dt_to != '') {
      this.content['dt_end'] = this.search.dt_to
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
    this.selected_payment_id = null
    this.selected_status_id = null
    this.content = {}
  }

  excel() {
		var fields = [];
		this.service
			.rpt_beneficiary_excel(this.search)
			.subscribe((res_data) => {
				let data = res_data["items"] as any[];
				data.forEach((user, index) => {
					fields.push({
            "المستفيد": user["to_user"]["Id_no"] ? user["to_user"]["Id_no"] : user["to_user"]["full_name"],
            "الملبغ": user["ammount"],
            "البند": user["methodFor"]["name"],
            "التاريخ": user["createAt"]
					});
				});
				this.service.exportAsExcelFile(fields, "تقرير التبرعات الصادرة");
			});
	}

}
