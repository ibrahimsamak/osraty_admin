import {Component} from '@angular/core';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {
  progressInfoData = [
    {
      title: 'الأرباح اليومية',
      value: 572900,
      activeProgress: 70,
      description: '',
    },
    {
      title: 'الطلبات الجديدة',
      value: 6378,
      activeProgress: 30,
      description: '',
    },
    {
      title: 'المنتجات',
      value: 200,
      activeProgress: 55,
      description: '',
    },
    {
      title: 'الموردين',
      value: 387,
      activeProgress: 67,
      description: '',
    },
  ];
}
