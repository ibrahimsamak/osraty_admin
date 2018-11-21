import { AddofferquotComponent } from './offer/offerquot/addofferquot/addofferquot.component';
import { AddbasketComponent } from './offer/basket/addbasket/addbasket.component';
import { BasketComponent } from './offer/basket/basket.component';
import { ClientComponent } from './Users/client/client.component';
import { AdvsComponent } from './advs/advs.component';
import { AddProductComponent } from './product/products/add-product/add-product.component';
import { SupplierProductsComponent } from './product/supplier-products/supplier-products.component';
import { SupplierComponent } from './product/supplier/supplier.component';
import { ProductsComponent } from './product/products/products.component';
import { CategoryComponent } from './product/category/category.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { ContactinfoComponent } from './contactinfo/contactinfo.component';
import { DeliveryoptionsComponent } from './deliveryoptions/deliveryoptions.component';
import { BuyoptionsComponent } from './buyoptions/buyoptions.component';
import { BuyunitsComponent } from './buyunits/buyunits.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
import { SociallinksComponent } from './sociallinks/sociallinks.component';
import { AddSupplierProductComponent } from './product/supplier-products/add-supplier-product/add-supplier-product.component';
import { SubCategoryComponent } from './product/category/sub-category/sub-category.component';
import { OfferquotComponent } from './offer/offerquot/offerquot.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'dashboard',
    component: ECommerceComponent,
  }, 
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'constant',
    children: [{
      path: 'buyunits', component: BuyunitsComponent
    }, 
    {
      path: 'unitsoptions', component: BuyoptionsComponent
    }, 
    {
      path: 'delivery', component: PostsComponent
    }, 
    {
      path: 'deliveryoptions', component: DeliveryoptionsComponent
    },
    {
      path: 'sociallink', component: SociallinksComponent
    },
    {
      path: 'contactinfo', component:ContactinfoComponent
    },
    {
      path: 'staticpage/:id' , component:StaticpageComponent
    },
    {
      path: 'staticpage' , component:StaticpageComponent
    }]
  }, 
  {
   path: 'product',
   children:[
    {
      path: 'subcategory/:id' , component:SubCategoryComponent
    },
    {
      path: 'subcategory' , component:SubCategoryComponent
    },
    {
      path: 'category/:id' , component:CategoryComponent
    },
    {
      path: 'category' , component:CategoryComponent
    },
    {
      path: 'supplier/:id' , component:SupplierComponent
    },
    {
      path: 'supplier' , component:SupplierComponent
    },
    {
      path: 'product/:id' , component:AddProductComponent
    },
    {
      path: 'product' , component:AddProductComponent
    },
    {
      path: 'products' , component:ProductsComponent
    },
    {
      path: 'addsupplierproducts/:id' , component:AddSupplierProductComponent
    },
    {
      path: 'addsupplierproducts' , component:AddSupplierProductComponent
    },
    {
      path: 'supplierproducts' , component:SupplierProductsComponent
    }
  ]
  },
  {
    path: 'adv',
    children:[
      {path: 'AddAdv/:id' , component:AdvsComponent},
      {path: 'AddAdv' , component:AdvsComponent},
    ]
  },
  {
    path: 'basket',
    children:[
      {path: 'addbasket/:id' , component:AddbasketComponent},
      {path: 'addbasket' , component:AddbasketComponent},
      {path: 'basket' , component:BasketComponent},
    ]
  },
  {
    path: 'offer',
    children:[
      {path: 'addoffer/:id' , component:AddofferquotComponent},
      {path: 'addoffer' , component:AddofferquotComponent},
      {path: 'offer' , component:OfferquotComponent},
    ]
  },
  {
    path: 'users',
    children:[
      {path: 'clients' , component:ClientComponent}
    ]
  }, 
  {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  },
  {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, 
  {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
