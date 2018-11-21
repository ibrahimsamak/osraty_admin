import { NgSelectModule } from '@ng-select/ng-select';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from './pages/service/constant.service';
import { ToasterModule } from 'angular2-toaster';
import { FormatDateService } from './pages/service/custom/format-date.service';
import { NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule.forRoot(),
    NgSelectModule,
    NbSpinnerModule,
    NoopAnimationsModule
    // ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    ConstantService,
    FormatDateService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
  
}
