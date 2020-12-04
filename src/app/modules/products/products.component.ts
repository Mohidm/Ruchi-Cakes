import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { from, Subscription } from 'rxjs';

import {ProdCategory} from './prodCat.model'
import { ProductsService } from './products.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { NewProductCategoryComponent } from './new-product-category/new-product-category.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from './products.model';
import { NewProductComponent } from './new-product/new-product.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit,OnDestroy {

  prodCategory : ProdCategory[]= []
  product:Product[]=[]
  private categorySub:Subscription
  private productSub:Subscription
  catList:MatTableDataSource<any>
  prodList:MatTableDataSource<any>
  displayedColumnCat: string[]=["Code","Name","Action"]
  displayedColumnProd: string[]=["Name","Category","Description","Recipes","Price","Stock","Image","Quantity","Action"]
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:string
  
  constructor(public productService :ProductsService,public dialog:MatDialog , public route:ActivatedRoute) { 
   
  }
  

  ngOnInit(): void {
   
    this.productService.getProductCategory()
    this.categorySub=this.productService.getCategoryUpdateListner()
    .subscribe((prodCategory:ProdCategory[])=>{
       this.prodCategory = prodCategory
       
       this.catList = new MatTableDataSource(this.prodCategory)
       this.catList.sort = this.sort
       this.catList.paginator = this.paginator;
   
    }) 

    this.productService.getProducts()
    this.productSub=this.productService.getProductUpdateListner()
    .subscribe((product:Product[])=>{
       this.product = product
       
       this.prodList = new MatTableDataSource(this.product)
       this.prodList.sort = this.sort
       this.prodList.paginator = this.paginator;
   
    }) 
       
  
  }
  onSearchClearCat(){
    this.searchKey=''
    this.applyFilterCat()
  }
  onSearchClearProd(){
    this.searchKey=''
    this.applyFilterProd()
  }
  applyFilterCat(){
    this.catList.filter=this.searchKey.trim().toLowerCase()
  }
  applyFilterProd(){
    this.prodList.filter=this.searchKey.trim().toLowerCase()
  }
  
  openCatCreate(){
    const dialogConfig= new MatDialogConfig()
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "25%"
    this.dialog.open(NewProductCategoryComponent,dialogConfig)   
  }  
  openProdCreate(){
    const dialogConfig= new MatDialogConfig()
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "60%"
    dialogConfig.height= "80%"
    this.dialog.open(NewProductComponent,dialogConfig)   
  } 
 
  ngAfterViewInit() {
    
    
  }
  onDeleteCategory(catId:string){
    this.productService.deleteCategory(catId)

  }
  onDeleteProduct(prodId:string){
    this.productService.deleteProduct(prodId)

  }
  ngOnDestroy(){
    this.categorySub.unsubscribe()
    this.productSub.unsubscribe()
  }

}
