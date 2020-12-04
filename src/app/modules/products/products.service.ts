import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdCategory } from './prodCat.model';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  form:FormGroup
  public prodCategory: ProdCategory[]=[];
  private product:Product[]=[]
  private productUpdated = new Subject<Product[]>()
  private categoryUpdated = new Subject<ProdCategory[]>()
  constructor(private http:HttpClient, private router:Router){

  }
// Product Category Services
  getProductCategory() {
    this.http
      .get<{ message: string; productCategory: any }>(
        "http://localhost:3000/api/product-category" 
      )
      .pipe(map((categoryData) => {
        return categoryData.productCategory.map(category => {
          return {
            code: category.code, 
            category: category.category,
            id: category._id
          };
        });
      }))
      .subscribe(transformedCategory => {
        this.prodCategory = transformedCategory;
        this.categoryUpdated.next([...this.prodCategory]);
      });
  }
  getCat(id: string) {
    return this.http.get<{ _id: string; code: string; category: string }>(
      "http://localhost:3000/api/product-category/" + id
    );
  }
  updateCategory(id: string, code: string, category: string) {
    const cat: ProdCategory = { id: id, code: code, category: category };
    this.http
      .put("http://localhost:3000/api/product-category/" + id, cat)
      .subscribe(response => {
        const updatedCats = [...this.prodCategory];
        const oldCatIndex = updatedCats.findIndex(p => p.id === cat.id);
        updatedCats[oldCatIndex] = cat;
        this.prodCategory = updatedCats;
        this.categoryUpdated.next([...this.prodCategory]);
        alert("Category Updated")
        this.router.navigateByUrl("admin/products");
      });
  }
  getCategoryUpdateListner(){
    return this.categoryUpdated.asObservable()
}
addCategory(code: string, category: string) {
  const proCategory: ProdCategory = { id: '', code: code, category: category };
  this.http
    .post<{ message: string,catId:string }>("http://localhost:3000/api/new-product-category", proCategory)
    .subscribe(responseData => {
      const id = responseData.catId
      proCategory.id=id
      this.prodCategory.push(proCategory);
      this.categoryUpdated.next([...this.prodCategory]);
      alert(responseData.message) 
      
    });
}
deleteCategory(catId:string){
  this.http.delete("http://localhost:3000/api/product-category/"+catId).
  subscribe(()=>{
  const updatedCategory= this.prodCategory.filter(category=>category.id !== catId)  
  this.prodCategory = updatedCategory
  this.categoryUpdated.next([...this.prodCategory]);
  alert('Category Deleted Successfully')
  })
}

// Product  Services

addProduct(name: string, category: string,description:string,recipes:string,price:number,stock:number,image:File,quantity:string) {
  const product = new FormData()
  product.append('name',name)
  product.append('category',category)
  product.append('description',description)
  product.append('recipes',recipes)
  product.append('price',price as any )
  product.append('stock',stock as any)
  product.append('image',image,name)
  product.append('quantity',quantity )
  this.http
    .post<{ message: string,product:Product }>("http://localhost:3000/api/new-product", product)
    .subscribe(responseData => {
     const product:Product={id:responseData.product.id,name: name, category: category, description:description, recipes:recipes,price:price, stock:stock,imagePath:responseData.product.imagePath, quantity:quantity }
      this.product.push(product);
      this.productUpdated.next([...this.product]);
      alert(responseData.message) 
      
    });
}

getProducts() {
  this.http
    .get<{ message: string; product: any }>(
      "http://localhost:3000/api/products" 
    )
    .pipe(map((productData) => {
      return productData.product.map(product => {
        return {
          name: product.name, 
          category: product.category,
          id: product._id,
          description:product.description,
          recipes:product.recipes,
          price:product.price,
          stock:product.stock,
          imagePath:product.imagePath,
          quantity:product.quantity

        };
      });
    }))
    .subscribe(transformedProduct => {
      this.product = transformedProduct;
      this.productUpdated.next([...this.product]);
    });
}
getProductUpdateListner(){
  return this.productUpdated.asObservable()

}

getProd(id: string) {
  return this.http.get<{ _id: string; name: string; category: string, description:string, recipes:string, price:number, stock:number,imagePath:string, quantity:string }>(
    "http://localhost:3000/api/products/" + id
  );
}
updateProduct(id: string, name: string, category: string,  description:string, recipes:string, price:number, stock:number, image:File|string,quantity:string ) {
  let productData :Product|FormData;
  if (typeof(image) ==='object'){
    productData = new FormData()
    productData.append('id',id)
    productData.append('name',name)
    productData.append('category',category)
    productData.append('description',description)
    productData.append('recipes',recipes)
    productData.append('price',price as any )
    productData.append('stock',stock as any)
    productData.append('image',image,name)
    productData.append('quantity',quantity )
  }else{
   
   productData = { id: id, name: name, category: category, description:description, recipes:recipes,price:price, stock:stock,imagePath:image, quantity:quantity };
  }

  this.http
    .put("http://localhost:3000/api/products/" + id, productData)
    .subscribe(response => {
      const updatedProduct = [...this.product];
      const oldProdIndex = updatedProduct.findIndex(p => p.id === id);
      const product:Product={
        id: id, name: name, category: category, description:description, recipes:recipes,price:price, stock:stock,imagePath:'', quantity:quantity 
      }
      updatedProduct[oldProdIndex] = product;
      this.product = updatedProduct;
      this.productUpdated.next([...this.product]);
      alert("Product Updated")
      this.router.navigateByUrl("admin/products");
    });
}
deleteProduct(prodId:string){
  this.http.delete("http://localhost:3000/api/products/"+prodId).
  subscribe(()=>{
  const updatedProduct= this.product.filter(product=>product.id !== prodId)  
  this.product = updatedProduct
  this.productUpdated.next([...this.product]);
  alert('Product Deleted Successfully')
  })
}

}
