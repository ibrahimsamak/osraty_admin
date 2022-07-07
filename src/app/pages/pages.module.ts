import { SendnotificationComponent } from './sendnotification/sendnotification.component';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbSpinnerModule } from '@nebular/theme';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { MatTableModule, MatFormFieldModule, MatStepperModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { DateFormatPipe } from './service/pipe/date-format.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'
import { NbChatModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// import { enGbLocale } from 'ngx-bootstrap/locale';
// import { DateFormatPipe } from './service/pipe/date-format.pipe';
// defineLocale('enus', esUsLocale);
import { frLocale } from 'ngx-bootstrap/chronos';
import { NetworkComponent } from './cities/networks.component'
import { CompanyComponent } from './company/company.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { JobsComponent } from './jobs/jobs.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { AttendComponent } from './attend/attend.component';
import { EventComponent } from './event/event.component';
import { AdvsComponent } from './advs/advs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsersComponent } from './users/users/users.component';
import { AdminsComponent } from './users/admins/admins.component';
import { RequsetComponent } from './orders/requset/requset.component';
import { AddpaymentouserComponent } from './orders/addpaymentouser/addpaymentouser.component';
import { AddpaymentComponent } from './orders/addpayment/addpayment.component';
import { BankFileComponent } from './bank-file/bank-file.component';
import { HistoryComponent } from './report/history/history.component';
import { FuncderReportComponent } from './report/funcder-report/funcder-report.component';
import { BeneficiaryReportComponent } from './report/beneficiary-report/beneficiary-report.component';
import { RequestReportComponent } from './report/request-report/request-report.component';
import { BanckAccountComponent } from './banck-account/banck-account.component';


defineLocale('fr', frLocale);

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    CKEditorModule,
    FileUploadModule,
    ToasterModule.forRoot(),
    NgSelectModule,
    NbSpinnerModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYafF4wU1Lmd1Azj8A2SAl8DlhLoYGnWg'
    }),
    AgmDirectionModule,
    NbChatModule,
    MatTableModule,
    MatFormFieldModule,
    MatStepperModule,
    MatPaginatorModule,
    MatInputModule,
    NgxDatatableModule,
    NgxChartsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DateFormatPipe,
    NetworkComponent,
    SendnotificationComponent,
    CompanyComponent,
    SuperAdminComponent,
    JobsComponent,
    StaticpageComponent,
    AttendComponent,
    EventComponent,
    AdvsComponent,
    EventComponent,
    ContactUsComponent,
    UsersComponent,
    AdminsComponent,
    RequsetComponent,
    AddpaymentouserComponent,
    AddpaymentComponent,
    BankFileComponent,
    HistoryComponent,
    FuncderReportComponent,
    BeneficiaryReportComponent,
    RequestReportComponent,
    BanckAccountComponent,
  ],
  providers: [
    DateFormatPipe
  ]
})

export class PagesModule {

}
