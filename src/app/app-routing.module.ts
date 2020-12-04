import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './modules/login/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { NewProductCategoryComponent } from './modules/products/new-product-category/new-product-category.component';
import { NewProductComponent } from './modules/products/new-product/new-product.component';
import { ProductsComponent } from './modules/products/products.component';

const routes: Routes = [{
  path: '', component:LoginComponent
},{path:'admin',component:DefaultComponent,canActivate:[AuthGuard],
children:[{path:'dashboard',component:DashboardComponent},
            {path:'products',component:ProductsComponent},
             { path:'new-product',component:NewProductComponent},
            {path:'new-category',component:NewProductCategoryComponent},
          {path:'edit-category/:catId',component:NewProductCategoryComponent},
          { path:'edit-product/:prodId',component:NewProductComponent}
        ]} ,
        

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
