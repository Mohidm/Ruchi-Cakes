import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdCategory } from './prodCat.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private prodCategory: ProdCategory[]=[];
  private categoryUpdated = new Subject<ProdCategory[]>()
  constructor(private http:HttpClient){

  }

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

}
