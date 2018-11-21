import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  d:NbLayoutDirection;
  constructor(private analytics: AnalyticsService,dir:NbLayoutDirectionService) {
    this.d = NbLayoutDirection.RTL;
    dir.setDirection(this.d);

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
