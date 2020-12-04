import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from 'src/app/modules/products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav'
import { LoginComponent } from 'src/app/modules/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatTabsModule} from '@angular/material/tabs'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import{MatFormFieldModule} from '@angular/material/form-field'
import { NewProductComponent } from 'src/app/modules/products/new-product/new-product.component';
import { NewProductCategoryComponent } from 'src/app/modules/products/new-product-category/new-product-category.component';
import { LoginService } from 'src/app/modules/login/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsService } from 'src/app/modules/products/products.service';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion'
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'
import { AuthInterceptor } from 'src/app/modules/login/auth-interceptor';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProductsComponent,
    LoginComponent,
    NewProductComponent,
    NewProductCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    DataTablesModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule
   

  
 
  ],
  providers:[LoginService,ProductsService,
    {
      provide: MatDialogRef,
      useValue: {}
    },{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}], 
  entryComponents:[NewProductCategoryComponent] 
})
export class DefaultModule { }
