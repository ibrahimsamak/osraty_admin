import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../service/constant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent extends SuperComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  suppliers = [];
  supplier_id;

  items: any[];
  itemsFilter: any[];
  subscripe: Subscription;
  dataSource = new MatTableDataSource();
  displayedColumns: string[];


  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
      super(route, toasterService, router);

  }



  applyFilter(filterValue: string) {
    if (filterValue != '') {
      this.itemsFilter = this.items.filter((item: any) => {
        return item.product_id.name.indexOf(filterValue.trim().toLowerCase()) !== -1;
      });
      console.log(this.items)
      this.dataSource = new MatTableDataSource(this.itemsFilter);
    }
    else {
      this.dataSource = new MatTableDataSource(this.items);
    }
  }

  ngOnInit() {
    this.loading = true;
    this.service.getSupplierData().subscribe(res1 => {
      this.loading = false;
      this.suppliers = res1 as any[];
    });
  }

  ngOnDestroy() {
    //this.subscripe.unsubscribe();
  }

  EditRow(itemId) {
    this.router.navigate(['/pages/product/addsupplierproducts/', itemId]);
  }

  SupplierChange(_selected) {
    this.supplier_id = _selected._id
    this.Search();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  Search() {
    this.loading = true;

    let content = {
      id: this.supplier_id
    }
    this.service.getSupplierProductBySeacrhData(content).subscribe(response => {
      this.items = response[appConstant.ITEMS] as any[];
      this.displayedColumns = ['image', 'name', 'qty', 'prices', 'options'];
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.items.length;
      this.iterator();
      this.loading = false;
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.items.slice(start, end);
    this.dataSource = part as any;
  }

  public deleteRow(itemId, index) {
    console.log(itemId, index)
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      this.loading = true;
      this.service.DeleteSupplierProductData(itemId).subscribe((response) => {
        this.items.splice(index, 1);
        this.dataSource = new MatTableDataSource<Element>(this.items);
        this.loading = false;
      })
    }
  }
}
