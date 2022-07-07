import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart.service';
import { ProfitChart } from '../../../@core/data/profit-chart.service';
import { OrdersProfitChartService, OrderProfitChartSummary } from '../../../@core/data/orders-profit-chart.service';
import { appConstant } from '../../service/_constant/appConstant';
import { ConstantService } from '../../service/constant.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  colorScheme = 'horizon'
  schemeType: string = 'ordinal';
  customColors
  single
  view
  width: number = 900;
  height: number = 300;



  colorScheme2 = 'horizon'
  schemeType2: string = 'ordinal';
  customColors2
  single2
  view2
  width2: number = 1000;
  height2: number = 300;
  yScaleMax: number;

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'اسبوع';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  // @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  // @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private service: ConstantService) {
    this.getOrdersChartData()
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'الوارد') {
      this.getOrdersChartData()
    } else {
      this.getProfitChartData()
    }
  }

  getOrdersChartData() {
    this.service.PaymentPerYear().subscribe((res) => {
      let items = res as any[]
      this.single = items
      // this.view = [this.width, this.height];
    })
  }

  getProfitChartData() {
    this.service.PaymentPerYear2().subscribe((res) => {
      let items = res as any[]
      this.single2 = items
      // this.view = [this.width, this.height];
    })
  }

  ngOnDestroy() {
    //this.alive = false;
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  select2(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick2(entry) {
    console.log('Legend clicked', entry);
  }
}
