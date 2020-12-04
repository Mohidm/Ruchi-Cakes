import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loginUrl = "http://localhost:3000/api/login"
  private token:string;
  private tokenTimer:any
  constructor(private http: HttpClient, private route:Router) { }

  getToken(){
    return this.token
  }
  loginUser(username:string, password:string){
    const user: User={username:username, password:password}
    this.http.post<{token:string, expiry:number}>(this._loginUrl,user).subscribe(response=>{
      const token = response.token
      this.token = token
      if(this.token){
        const tokenExpiry=response.expiry
        this.tokenTimer= setTimeout(()=>{
           this.logoutUser()
         },tokenExpiry*1000)
        const now = new Date()
        const expirationDate= new Date(now.getTime() + tokenExpiry*1000) 
        this.saveAuthData(token,expirationDate)
        this.route.navigate(['admin/dashboard'])
 
        
      }
      
    })
      
    
  }
  // autoAuthUser(){
  //   const authinformation = this.getAuthData()
  // }
  logoutUser(){
    this.token=''
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.route.navigate(["/"])
  }
  private saveAuthData(token:string, expirationDate:Date){
   localStorage.setItem('token',token)
   localStorage.setItem('expiration',expirationDate.toISOString())
  }
  private clearAuthData(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }
  // private getAuthData(){
  //   const token = localStorage.getItem('token')
  //   const expirationDate = localStorage.getItem('expiration')
  //   if(!token ||!expirationDate){
  //     return
  //   }
  //   return{
  //     token:token,
  //     expirationDate:new Date(expirationDate)
  //   }
  // }

}
