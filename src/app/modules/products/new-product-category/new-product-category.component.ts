import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProdCategory } from '../prodCat.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product-category',
  templateUrl: './new-product-category.component.html',
  styleUrls: ['./new-product-category.component.css']
})
export class NewProductCategoryComponent implements OnInit {
  prodCategory:ProdCategory
  private mode = "create";
  private catId: string;
  public form:FormGroup;
  constructor(public productsService :ProductsService,
     public route:ActivatedRoute,
     public dialogRef:MatDialogRef<NewProductCategoryComponent>,
     public dialog:MatDialog) { }
 
  ngOnInit(): void {
    this.form = new FormGroup({
      'code':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'category':new FormControl(null,{validators:[Validators.required]})
    })
  
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("catId")) {
        this.mode = "edit";
   
        this.catId = paramMap.get("catId") as string;
    
        this.productsService.getCat(this.catId).subscribe(categoryData => {
         
          this.prodCategory = {id: categoryData._id, code: categoryData.code, category: categoryData.category};
          this.form.setValue({
            'code':this.prodCategory.code,
            'category':this.prodCategory.category
          })
        });
      
     
      } else {
        this.mode = "create";
        this.catId = '' ;
      }
    });
  }
  onAddCategory(){
    if (this.form.invalid){
      console.log('enter values')
      return
    }
   
    if (this.mode === "create") {
      this.productsService.addCategory(this.form.value.code,this.form.value.category)
    }else{
      this.productsService.updateCategory(this.catId,this.form.value.code,this.form.value.category)
    }
    
    this.form.reset()
    
   
  }


 
 

}
