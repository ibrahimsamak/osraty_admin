import { appConstant } from './../../service/_constant/appConstant';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {

  items = []
  progressInfoData: any
  constructor() {

  }
}
