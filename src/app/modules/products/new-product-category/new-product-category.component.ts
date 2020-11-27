import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product-category',
  templateUrl: './new-product-category.component.html',
  styleUrls: ['./new-product-category.component.css']
})
export class NewProductCategoryComponent implements OnInit {
  prodCategory:any={}
  constructor(public productsService :ProductsService) { }
  onAddCategory(form:NgForm){
    if (form.invalid){
      return
    }
    this.productsService.addCategory(form.value.code,form.value.category)
    form.resetForm()
  }

 
  ngOnInit(): void {
  }
 

}
