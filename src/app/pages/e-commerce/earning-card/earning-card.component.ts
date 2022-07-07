import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { formatLabel } from '@swimlane/ngx-charts';
import { appConstant } from '../../service/_constant/appConstant';
import { ConstantService } from '../../service/constant.service';

@Component({
  selector: 'ngx-earning-card',
  styleUrls: ['./earning-card.component.scss'],
  templateUrl: './earning-card.component.html',
})
export class EarningCardComponent implements OnInit {
  flipped = false;
  width: number = 500;
  height: number = 200;

  width2: number = 900;
  height2: number = 300;

  schemeType: string = 'ordinal';
  schemeType2: string = 'ordinal';

  colorScheme: any;
  view: any[]
  single: any[];

  colorScheme2: any;
  view2: any[]
  single2: any[];

  constructor(private service: ConstantService) {

  }

  ngOnInit() {

  }

  toggleFlipView() {

  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  select(data) {
    console.log('Item clicked', data);
  }


  valueFormatting2(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
  }

  onLegendLabelClick2(entry) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText2({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  select2(data) {
    console.log('Item clicked', data);
  }


}

