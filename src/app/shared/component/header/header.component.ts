import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/modules/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<boolean> = new EventEmitter()
  constructor(public auth:LoginService) { }

  ngOnInit(): void {
  }
  toggleSideBar(){

    this.toggleSideBarForMe.emit() 

  }
  onLogout(){
  this.auth.logoutUser()
  }

}
