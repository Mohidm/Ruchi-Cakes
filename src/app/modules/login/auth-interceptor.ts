import { HttpHandler, HttpInterceptor, HttpRequest,  } from "@angular/common/http"
import { Injectable } from '@angular/core'
import { LoginService } from './login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:LoginService){}
   intercept(req:HttpRequest<any>, next:HttpHandler){
    //    const authToken = this.authService.getToken()
       const authRequest = req.clone({
           headers:req.headers.set("Authorization","Bearer "+ localStorage.getItem('token'))
       })
       return next.handle(authRequest)
   }
}