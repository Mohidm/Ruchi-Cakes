import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public username:string='';
  // public password:string='';
  constructor(private loginService:LoginService,private router: Router,) { }
  loginUserData :any={}
  errors=null
  ngOnInit() {
    
  }
 
  // loginUser(){
  //   this._login.loginUser(this.loginUserData).subscribe(res=> {
  //     console.log(res)
  //     localStorage.setItem('token',res.token)
  //     this.router.navigate(['admin/dashboard'])
  //    },  
  //    err=> this.errors=err.error)
    
  // }

  onLogin(form: NgForm) {
   if (form.invalid){
     return
   }
   this.loginService.loginUser(form.value.username,form.value.password)
   
  }


}
