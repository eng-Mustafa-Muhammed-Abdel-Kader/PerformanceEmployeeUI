import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login/login.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCorrectLogin : boolean = false;
  userData : any = {};
  constructor(public login: LoginService, public router: Router) { }

  ngOnInit(): void {
    this.login.currentLogin.subscribe(message => this.isCorrectLogin = message);
    this.login.currentUserValue.subscribe(message => this.userData = message);
  }

  logOut() {
    localStorage.removeItem('users');
    localStorage.removeItem('UserLogin');
    this.isCorrectLogin = false;
    this.userData = {};
    this.login.changeMessage(this.isCorrectLogin,this.userData);
    this.router.navigate(['/']);
  }

}
