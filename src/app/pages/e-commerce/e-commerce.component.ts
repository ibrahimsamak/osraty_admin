import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../service/constant.service';
import { MessagingService } from '../service/_shared/messaging.service';
import { Router } from '@angular/router';
import { appConstant } from '../service/_constant/appConstant';
import { formatLabel } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
  flipped = false;
  width: number = 700;
  height: number = 300;

  colorScheme: any;
  view: any[]
  single: any[];

  colorScheme2: any;
  view2: any[]
  single2: any[];
  constructor(private messagingService: MessagingService,
    private router: Router,
    private service: ConstantService) {

  }

  ngOnInit() {
    this.service.getMethodFor().subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[]
      this.single = items

      this.colorScheme = 'ocean'
      this.view = [this.width, this.height];
    })


    this.service.getMotstMethodType().subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[]
      this.single2 = items
      this.colorScheme2 = 'nightLights'
      this.view2 = [this.width, this.height];
    })

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
  dblclick(event) {
    console.log('Doube click', event);
  }

}


