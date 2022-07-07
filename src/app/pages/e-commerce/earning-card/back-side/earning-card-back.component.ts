import { appConstant } from './../../../service/_constant/appConstant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EarningService, PieChart } from '../../../../@core/data/earning.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-earning-card-back',
  styleUrls: ['./earning-card-back.component.scss'],
  templateUrl: './earning-card-back.component.html',
})
export class EarningCardBackComponent implements OnInit, OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[];
  name: string;
  color: string;
  value: number;
  defaultSelectedCurrency: string
  pieChartData = [
    {
      value: 0,
      name: ''
    },
    {
      value: 0,
      name: ''
    }
  ]
  constructor(private earningService: EarningService) {



    // this.earningService.getEarningPieChartData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((earningPieChartData) => {
    //   });
  }

  ngOnInit() {
   
  }
  changeChartInfo(pieData: { value: number; name: string; color: any }) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
