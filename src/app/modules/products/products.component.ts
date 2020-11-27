import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { from, Subscription } from 'rxjs';
import {Product} from './products.model'
import {ProdCategory} from './prodCat.model'
import { ProductsService } from './products.service';
declare var $;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  prodCategory : ProdCategory[]= []
  private categorySub:Subscription
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOptions:DataTables.Settings = {}
  constructor(public productService :ProductsService) { 
  
  }

 
  ngOnInit(): void {
   
    this.productService.getProductCategory()
    this.categorySub=this.productService.getCategoryUpdateListner()
    .subscribe((prodCategory:ProdCategory[])=>{
       this.prodCategory = prodCategory
       console.log(prodCategory)
    })
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    this.dtOptions={
      pagingType:"full_numbers",
      pageLength:3,
      lengthMenu:[5, 10, 25 ],
      
      processing:true
    }
  }
  ngOnDestroy(){
    this.categorySub.unsubscribe()
  }

}
