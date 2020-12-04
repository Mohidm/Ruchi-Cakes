import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProdCategory } from '../prodCat.model';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { mimeType } from './image-mime-type.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
 
  product:Product
  private productId: string;
  private mode = "create";
  public form:FormGroup;
  prodCategory : ProdCategory[]= []
  private categorySub:Subscription
  selectedValue: string = '';
  imagePreview:string
  constructor(public productsService :ProductsService,
     public route:ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    this.productsService.getProductCategory()
    this.categorySub=this.productsService.getCategoryUpdateListner()
    .subscribe((prodCategory:ProdCategory[])=>{
       this.prodCategory = prodCategory
      
    }) 
    this.form = new FormGroup({
      'name':new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'category':new FormControl(null,{validators:[Validators.required]}),
      'description':new FormControl(null),
      'recipes':new FormControl(null),
      'price':new FormControl(null),
      'stock':new FormControl(null),
      'image':new FormControl(null,{validators:Validators.required,asyncValidators:[mimeType]}),
      'quantity':new FormControl(null)
    })
  
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("prodId")) {
        this.mode = "edit";
   
        this.productId = paramMap.get("prodId") as string;
    
        this.productsService.getProd(this.productId).subscribe(productData => {
         
          this.product = {id: productData._id, name: productData.name, category: productData.category,description:productData.description, recipes:productData.recipes, price:productData.price,stock:productData.stock,imagePath:productData.imagePath, quantity:productData.quantity};
    
          this.form.setValue({
            'name':this.product.name,
            'category':this.product.category,
            'description':this.product.description,
            'recipes':this.product.recipes,
            'price':this.product.price,
            'stock':this.product.stock,
            'image':this.product.imagePath,
            'quantity':this.product.quantity
          })
        });
      
     
      } else {
        this.mode = "create";
        this.productId = '' ;
      }
    });
  }
  onAddProduct(){
    if (this.form.invalid){
      console.log('enter values')
      return
    }if(this.mode==='create'){
      this.productsService.addProduct(this.form.value.name,this.selectedValue,this.form.value.description,
        this.form.value.recipes,this.form.value.price,this.form.value.stock,this.form.value.image,this.form.value.quantity)

    }else{

      this.productsService.updateProduct(this.productId,this.form.value.name,this.selectedValue,this.form.value.description,
        this.form.value.recipes,this.form.value.price,this.form.value.stock,this.form.value.image,this.form.value.quantity)

    }
    
    this.form.reset()
   
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({'image':file})
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload=()=>{
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
   }
 
}
