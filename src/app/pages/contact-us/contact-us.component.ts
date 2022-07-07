import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { appConstant } from '../service/_constant/appConstant';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import { Page } from '../service/_constant/page';
import { ConstantService } from '../service/constant.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'ngx-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends SuperComponent implements OnInit {
  @ViewChild('myTable') table: any;

  page = new Page();
  rows = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;


  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);
    this.setPage({ offset: 0 });

  }

  ngOnInit() {

  }

  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 30;

    this.service.getContactUsData(this.page.pageNumber).subscribe(pagedData => {
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


  ngOnDestroy() {

  }


  onDeleteConfirm(event) {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      console.log(event)
      this.service.DeleteContactData(event['_id']).subscribe(x => {
        this.showToast('success', 'نجاح', 'تم حذف المنتج بنجاح')
      });
    }
  }

  onUpdate(event) {
    // go to send email
  }

  getRowClass(row) { return { 'age-is-ten': row['isBlock'] == true, } }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const content = {
      name: val,
      title: val
    }
    this.page.pageNumber = 0;
    if (val.value != '') {
      this.isLoading = true;
      this.service.getSearchContactData(content).subscribe((res) => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      })
    }
    else {
      this.setPage(1);
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
