import { Component, OnDestroy, Input } from '@angular/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

@Component({
  selector: 'ngx-layout-direction-switcher',
  template: `
    <ngx-switcher
      [firstValue]="directions.LTR"
      [secondValue]="directions.RTL"
      [firstValueLabel]="'LTR'"
      [secondValueLabel]="'RTL'"
      [value]="'rtl'"
      (valueChange)="toggleDirection($event)"
      [vertical]="vertical">
    </ngx-switcher>
  `,
})
export class LayoutDirectionSwitcherComponent implements OnDestroy {
  directions = NbLayoutDirection;
  currentDirection: NbLayoutDirection;
  alive = true;

  @Input() vertical: boolean = false;

  constructor(private directionService: NbLayoutDirectionService) {
    this.currentDirection = this.directionService.getDirection();

    this.directionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(newDirection => this.currentDirection = newDirection);
  }

  toggleDirection(newDirection) {
    this.directionService.setDirection(newDirection);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
