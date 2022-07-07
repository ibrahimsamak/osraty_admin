import { AddpaymentComponent } from './orders/addpayment/addpayment.component';
import { AddpaymentouserComponent } from './orders/addpaymentouser/addpaymentouser.component';
import { AdminsComponent } from './users/admins/admins.component';
import { UsersComponent } from './users/users/users.component';
import { ContactUsComponent } from './contact-us/contact-us.component'
import { AttendComponent } from './attend/attend.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompanyComponent } from './company/company.component';
import { SendnotificationComponent } from './sendnotification/sendnotification.component';
import { NetworkComponent } from './cities/networks.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdvsComponent } from './advs/advs.component';
import { EventComponent } from './event/event.component';
import { RequsetComponent } from './orders/requset/requset.component';
import { BankFileComponent } from './bank-file/bank-file.component';
import { HistoryComponent } from './report/history/history.component';
import { FuncderReportComponent } from './report/funcder-report/funcder-report.component';
import { BeneficiaryReportComponent } from './report/beneficiary-report/beneficiary-report.component';
import { RequestReportComponent } from './report/request-report/request-report.component';
import { BanckAccountComponent } from './banck-account/banck-account.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard', component: ECommerceComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
      },
      {
        path: 'iot-dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
      },
      {
        path: 'constant',
        children: [
          // {
          //   path: 'jobs', component: JobsComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          // },
          {
            path: 'paymentMetod', component: CompanyComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'paymentFor', component: NetworkComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'staticpage/:id', component: StaticpageComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'staticpage', component: StaticpageComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'bankaccount/:id', component: BanckAccountComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'bankaccount', component: BanckAccountComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'sendNotification', component: SendnotificationComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الاشعارات والتنبيهات"] }
          },
          {
            path: 'contactUs', component: ContactUsComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'files/:id', component: BankFileComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          },
          {
            path: 'files', component: BankFileComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات"] }
          }
        ]
      },
      {
        path: 'superadmin',
        children: [
          {
            path: 'AddSuperAdmin', component: SuperAdminComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة مستخدمين النظام"] }
          },
          {
            path: 'AddSuperAdmin/:id', component: SuperAdminComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة مستخدمين النظام"] }
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: 'users', component: UsersComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة المتبرعين والمستفيدين"] }
          },
          {
            path: 'admins', component: AdminsComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة المتبرعين والمستفيدين"] }
          },
        ]
      },
      {
        path: 'news',
        children: [
          { path: 'AddAdv/:id', component: AdvsComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الأخبار والمناسبات"] } },
          { path: 'AddAdv', component: AdvsComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الأخبار والمناسبات"] } },
          { path: 'AddEvent/:id', component: EventComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الأخبار والمناسبات"] } },
          { path: 'AddEvent', component: EventComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الأخبار والمناسبات"] } },
          { path: 'Attend', component: AttendComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "الأخبار والمناسبات"] } }
        ]
      },
      {
        path: 'orders',
        children: [
          { path: 'requests/:id', component: RequsetComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] } },
          { path: 'requests', component: RequsetComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] } },
          { path: 'addPaymentToUser', component: AddpaymentouserComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] } },
          { path: 'addPayment', component: AddpaymentComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "ادارة الطلبات"] } }
        ]
      },
      {
        path: 'report',
        children: [
          { path: 'history/:id/:user_name/:type', component: HistoryComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "التقارير والاحصائيات"] } },
          { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "التقارير والاحصائيات"] } },
          { path: 'funcder', component: FuncderReportComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "التقارير والاحصائيات"] } },
          { path: 'beneficiary', component: BeneficiaryReportComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "التقارير والاحصائيات"] } },
          { path: 'request', component: RequestReportComponent, canActivate: [AuthGuardService], data: { roles: ["كل الصلاحيات", "التقارير والاحصائيات"] } },
        ]
      },
      {
        path: '404', component: NotFoundComponent, canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
