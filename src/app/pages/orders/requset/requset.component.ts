import { ConstantService } from './../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { appConstant } from '../../service/_constant/appConstant';
import { ToasterService } from 'angular2-toaster';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from '../../service/pipe/date-format.pipe';
import { BsLocaleService, defineLocale, enGbLocale } from 'ngx-bootstrap';
import { Page } from '../../service/_constant/page';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-requset',
  templateUrl: './requset.component.html',
  styleUrls: ['./requset.component.scss']
})
export class RequsetComponent extends SuperComponent implements OnInit {

  @ViewChild('myTable') table: any;
  expanded: any = {};
  suppliers;
  supplier_id;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  page = new Page();
  rows = new Array<any>();
  rowsItems = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;
  modalReference: NgbModalRef;
  postData: any;
  rejectData: any;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  label = 'Client Location';

  selected_driver_id;
  selected_status_id;
  drivers = [];
  cateogires = [];
  Notes = ''
  isVisible = false
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

    this.service.getRequestBySuperAdmin(this.page.pageNumber).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION];
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
    this.setPage({ offset: 0 })
  }

  EditRow(event) {
    //this.router.navigate(['/pages/product/addsupplierproducts/', event['_id']]);
  }

  updateFilter(event) {
    const val = event.toLowerCase();
    const content = {
      full_name: val,
      phone_number: val,
      Id_no: val
    }
    this.page.pageNumber = 0;
    if (val.value != '') {
      this.isLoading = true;

      this.service.getSearchRequestData(content, 0).subscribe((res) => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      })
    }
    else {
      this.setPage({ offset: 0 });
    }
  }

  openModal(contentCategory, event) {
    this.isEdit = false
    this.postData = event
    this.modalReference = this.modalService.open(contentCategory, { size: 'lg' })
  }

  openModal2(contentCategory, event) {
    this.isEdit = false
    this.postData = event.user_id
    this.rejectData = event
    this.modalReference = this.modalService.open(contentCategory, { size: 'lg' })
  }

  Agreement(obj, event) {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['_id']

    if (window.confirm('هل أنت متأكد من هذا الاجراء ؟')) {
      if (event == 2) {
        let content = {
          id: obj._id,
          ammount: obj.ammount,
          status: event,
          notes: this.Notes,
          superAdmin_id: id
        }
        console.log(content)
        this.service.agreementRequest(content).subscribe(response => {
          let msg = response['message']
          let status = response['status']
          if (status == true) {
            this.showToast('success', 'نجاح', msg);
          } else {
            this.showToast('error', 'خطأ', msg);
          }
        })
      } else {
        let content = {
          id: this.rejectData._id,
          ammount: this.rejectData.ammount,
          status: event,
          notes: this.Notes,
          superAdmin_id: id
        }
        console.log(content)
        this.service.agreementRequest(content).subscribe(response => {
          let msg = response['message']
          let status = response['status']
          if (status == true) {
            this.showToast('success', 'نجاح', msg);
          } else {
            this.showToast('error', 'خطأ', msg);
          }
        })
      }

    }
  }

  history(event) {

  }

  openModal3(contentStatus, event) {
    this.id = event['_id']
    // this.cateogires = [
    //   { id: 6, name: 'تم الغاء الطلب من السائق — السائق' }
    // ];
    this.modalReference = this.modalService.open(contentStatus)
  }


  close(content) {
    this.modalReference.close();
    this.id = ''
  }


  SaveOrderDriver(event) {

  }

  SupplierChanging(val) {
    this.selected_driver_id = val._id;
  }

  selectStatus(val) {
    console.log(val)
    this.selected_status_id = val
  }

  SaveUpdateStatus(id) {
    // تفعيل الحساب او تعطيل
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
