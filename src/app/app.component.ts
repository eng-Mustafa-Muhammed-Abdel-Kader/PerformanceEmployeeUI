import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./services/login/login.service";
import { Employee,EmployeeLogin } from "./models/employee.model";
import { Result } from "./models/result.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'performanceSystemFront';

  isLogin : boolean = false;
  userData : any = {};
  employeeSucc: Employee;
  constructor(public login: LoginService, public router: Router) {}

  ngOnInit() {
    this.login.oneEmployee = {
      email: '',
      password: ''
    }

    var succ = localStorage.getItem("UserLogin");
    var U: EmployeeLogin;
    if (succ === null) {
      var storeEmployeeData = localStorage.getItem("users");
      var employeeData: Employee;
      employeeData = JSON.parse(storeEmployeeData);
      if (employeeData !== null) {
        this.login.oneEmployee = {
          email: employeeData.email,
          password: employeeData.pms_Password
        }
      }
    } else {
      U = JSON.parse(succ);
      this.login.oneEmployee = U;
    }
      this.login.loginEmployee().subscribe(res => {
        var obj: Result = res as Result;
        this.employeeSucc = obj.data as Employee;
        if (this.employeeSucc) {
          if (obj.status == 1) {
            localStorage.setItem("users",JSON.stringify(this.employeeSucc));
            localStorage.setItem("UserLogin",JSON.stringify(this.login.oneEmployee));
            this.login.changeMessage(true,this.employeeSucc);
            
          }
          else {
            localStorage.removeItem("users");
            localStorage.removeItem("UserLogin");
          }
        }
      });
  }

}
