import { ConstantService } from "./../../service/constant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { appConstant } from "../../service/_constant/appConstant";
import { ToasterService } from "angular2-toaster";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DateFormatPipe } from "../../service/pipe/date-format.pipe";
import { BsLocaleService, defineLocale, enGbLocale } from "ngx-bootstrap";
import { Page } from "../../service/_constant/page";
import { SuperComponent } from "../../../_components/SuperComponent/SuperComponent";

@Component({
  selector: "ngx-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.scss"]
})
export class AdminsComponent extends SuperComponent implements OnInit {
  @ViewChild("myTable") table: any;
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

  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  label = "Client Location";

  selected_driver_id;
  selected_status_id;
  drivers = [];
  cateogires = [];
  Notes = "";
  isVisible = false;

  banks = {
    bank_name: "",
    branch_ar: "",
    branch_en: "",
    name_ar: "",
    name_en: "",
    nationality_ar: "",
    nationality_en: "",
    id_no: "",
    account_no: "",
    iban: "",
    type: "admin",
    user_id: ""
  };

  constructor(
    private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private modalService: NgbModal,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService,
    private router: Router
  ) {
    super(route, toasterService, router);
    this._localeService.use("en");
    defineLocale("en", enGbLocale);
  }

  setPage(pageInfo) {
    console.log(pageInfo);
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 20;

    this.service
      .getAdminWithPaginationData(this.page.pageNumber)
      .subscribe(pagedData => {
        let _page = pagedData[appConstant.PAGINATION];
        console.log(_page);
        if (_page.pageNumber != _page.totalPages) {
          this.page = _page;
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        } else if (_page.totalPages == 0) {
          this.page = _page;
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        } else {
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        }
      });
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
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
    };
    this.page.pageNumber = 0;
    if (val.value != "") {
      this.isLoading = true;

      this.service.getSearchAdminData(content, 0).subscribe(res => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      });
    } else {
      this.setPage({ offset: 0 });
    }
  }

  openModal(contentCategory, event) {
    this.isEdit = false;
    this.postData = event;
    this.modalReference = this.modalService.open(contentCategory, {
      size: "lg"
    });
  }

  openModal2(contentCategory, event) {
    this.banks = {
      bank_name: "",
      branch_ar: "",
      branch_en: "",
      name_ar: "",
      name_en: "",
      nationality_ar: "",
      nationality_en: "",
      id_no: "",
      account_no: "",
      iban: "",
      type: "admin",
      user_id: ""
    };

    this.id = event["_id"];
    this.service.getBankDetails(this.id).subscribe(x => {
      const obj = x[appConstant.ITEMS] as any;
      if (obj) {
        this.banks = obj;
      }
    });
    this.modalReference = this.modalService.open(contentCategory, {
      size: "lg"
    });
  }

  Block(event) {
    if (window.confirm("هل أنت متأكد من حذف العنصر؟")) {
      if (event.isBlock == true) {
        // cancel block
        let content = {
          isBlock: false
        };
        this.service.blockAdmin(content, event._id).subscribe(response => {
          console.log(response);
          this.showToast("success", "نجاح", "تم الغاء حظر المتبرع");
        });
      } else {
        // block
        let content = {
          isBlock: true
        };
        this.service.blockAdmin(content, event._id).subscribe(response => {
          console.log(response);
          this.showToast("success", "نجاح", "تم حظر المتبرع");
        });
      }
    }
  }

  history(event) {
    console.log(event["_id"]);
    this.router.navigate([
      "/pages/report/history/",
      { id: event["_id"], user_name: event["full_name"], type: "admin" }
    ]);
  }

  close(content) {
    this.modalReference.close();
    this.id = "";
  }

  SaveOrderDriver(event) {}

  SupplierChanging(val) {
    this.selected_driver_id = val._id;
  }

  selectStatus(val) {
    console.log(val);
    this.selected_status_id = val;
  }

  SaveUpdateStatus(banks) {
    this.banks.user_id = banks._id;
    this.service.addBankDetails(this.banks).subscribe(x => {
      this.banks = {
        bank_name: "",
        branch_ar: "",
        branch_en: "",
        name_ar: "",
        name_en: "",
        nationality_ar: "",
        nationality_en: "",
        id_no: "",
        account_no: "",
        iban: "",
        type: "admin",
        user_id: ""
      };
      this.setPage({ offset: this.currentPage });
      this.showToast("success", "نجاح", "تم حفظ المعلومات البنكية بنجاح");
    });
  }

  toggleExpandRow(row) {
    console.log("Toggled Expand Row!", row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }
}
