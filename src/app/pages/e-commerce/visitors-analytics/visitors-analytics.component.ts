import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile, delay } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import * as shape from 'd3-shape';
import { ConstantService } from '../../service/constant.service';
// import * as d3 from 'd3';

@Component({
  selector: 'ngx-ecommerce-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnInit, OnDestroy {
  private alive = true;
  chartLegend: { iconColor: string; title: string }[];

  view: any[];
  width: number = 700;
  height: number = 300;
  colorScheme = 'picnic'
  xAxisLabel = 'الشهور';
  yAxisLabel = 'عدد المستخدمين';
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  };
  rangeFillOpacity: number = 0.15;
  schemeType: string = 'ordinal';

  curveType: string = 'Linear';
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    'Basis',
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  closedCurveType: string = 'Basis';
  closedCurve: any = this.curves[this.closedCurveType];
  closedInterpolationTypes = ['Basis Closed', 'Cardinal Closed', 'Catmull Rom Closed', 'Linear Closed'];

  data = [];
  visible = false
  data2 = [];
  constructor(private themeService: NbThemeService, private service: ConstantService) {
    // this.themeService.getJsTheme()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(theme => {
    //     this.setLegendItems(theme.variables.visitorsLegend);
    //   });

    this.service.getUsersPerYear().subscribe((res) => {
      console.log(res)
      this.data.push({ name: res['name'] as string, series: res['series'] as any[] })
      this.data = [...this.data];
      this.visible = true;
    })

    this.service.getAdminsPerYear().subscribe((res) => {
      console.log(res)
      this.data2.push({ name: res['name'] as string, series: res['series'] as any[] })
      this.data2 = [...this.data2];
      this.visible = true;
    })
  }

  ngOnInit() {

  }

  setLegendItems(visitorsLegend): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend.firstIcon,
        title: 'تسجيل جديد',
      },
      {
        iconColor: visitorsLegend.secondIcon,
        title: 'زائر',
      },
    ];
  }

  ngOnDestroy() {
    //this.alive = false;
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  select(data) {
    console.log('Item clicked', data);
  }
}
