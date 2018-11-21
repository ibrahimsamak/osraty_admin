import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { OfferService } from '../../service/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ToasterService } from 'angular2-toaster';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-offerquot',
  templateUrl: './offerquot.component.html',
  styleUrls: ['./offerquot.component.scss']
})
export class OfferquotComponent extends SuperComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  items: any[];
  itemsFilter: any[];
  subscripe: Subscription;
  dataSource = new MatTableDataSource();
  displayedColumns: string[];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(
    private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
      super(route, toasterService, router);

  }

  ngOnInit() {
    this.loading = true;
    this.offer.getOfferData().subscribe(response => {
      this.items = response as any[];
      this.displayedColumns = ['image', 'name' , 'suuplier_name', 'qty', 'new_price', 'options'];
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.items.length;
      this.iterator();
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
   if (filterValue != '') {
       this.itemsFilter = this.items.filter((item: any) => {
         return item.product_id.name.indexOf(filterValue.trim().toLowerCase()) !== -1 || item.supplier_id.name.indexOf(filterValue.trim().toLowerCase()) !== -1;
     });
       console.log(this.items)
       this.dataSource = new MatTableDataSource(this.itemsFilter);
     }
     else {
       this.dataSource = new MatTableDataSource(this.items);
     }
  }

  EditRow(itemId) {
    this.router.navigate(['/pages/offer/addoffer/', itemId]);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
      this.offer.DeleteOfferData(itemId).subscribe((response) => {
        this.items.splice(index, 1);
        this.dataSource = new MatTableDataSource<Element>(this.items);
        this.loading = false;
      })
    }
  }
}
