import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PostsComponent } from './posts/posts.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DeliveryoptionsComponent } from './deliveryoptions/deliveryoptions.component';
import { BuyunitsComponent } from './buyunits/buyunits.component';
import { BuyoptionsComponent } from './buyoptions/buyoptions.component';
import { ContactinfoComponent } from './contactinfo/contactinfo.component';
import { SociallinksComponent } from './sociallinks/sociallinks.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductsComponent } from './product/products/products.component';
import { CategoryComponent } from './product/category/category.component';
import { SupplierComponent } from './product/supplier/supplier.component';
import { SupplierProductsComponent } from './product/supplier-products/supplier-products.component';
import { ToasterModule } from 'angular2-toaster';
import { AddProductComponent } from './product/products/add-product/add-product.component';
import { AddSupplierProductComponent } from './product/supplier-products/add-supplier-product/add-supplier-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdvsComponent } from './advs/advs.component';
import { NbSpinnerModule } from '@nebular/theme';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { MatTableModule, MatFormFieldModule, MatStepperModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SubCategoryComponent } from './product/category/sub-category/sub-category.component';
import { ClientComponent } from './Users/client/client.component';
import { BasketComponent } from './offer/basket/basket.component';
import { OfferquotComponent } from './offer/offerquot/offerquot.component';
import { AddbasketComponent } from './offer/basket/addbasket/addbasket.component';
import { AddofferquotComponent } from './offer/offerquot/addofferquot/addofferquot.component';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { enGbLocale } from 'ngx-bootstrap/locale';
defineLocale('engb', enGbLocale);

const PAGES_COMPONENTS = [
  PagesComponent,
  PostsComponent,
  BuyoptionsComponent,
  BuyunitsComponent,
  DeliveryoptionsComponent
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
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatStepperModule,
    MatPaginatorModule,
    MatInputModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DeliveryoptionsComponent,
    BuyunitsComponent,
    BuyoptionsComponent,
    ContactinfoComponent,
    SociallinksComponent,
    StaticpageComponent,
    ProductsComponent,
    CategoryComponent,
    SupplierComponent,
    SupplierProductsComponent,
    AddProductComponent,
    AddSupplierProductComponent,
    AdvsComponent,
    SubCategoryComponent,
    ClientComponent,
    BasketComponent,
    OfferquotComponent,
    AddbasketComponent,
    AddofferquotComponent
  ],
})
export class PagesModule {
}
