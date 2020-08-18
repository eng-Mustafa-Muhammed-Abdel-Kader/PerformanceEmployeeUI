import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login/login.service";
import { Employee } from "../../../models/employee.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCorrectLogin : boolean = false;
  userData = {};
  employeeData: Employee;
  constructor(public login: LoginService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.login.currentLogin.subscribe(message => this.isCorrectLogin = message);
      this.login.currentUserValue.subscribe(message => this.userData = message);
      if (this.userData == {} && this.isCorrectLogin == true) {
        var storeEmployeeDeta = localStorage.getItem("users");
        var employeeData: Employee = JSON.parse(storeEmployeeDeta);
        this.employeeData = employeeData;
      } else {
        var storeEmployeeDeta = localStorage.getItem("users");
        var employeeData: Employee = JSON.parse(storeEmployeeDeta);
        this.employeeData = employeeData;
      } 
    },500);
        
  }

}
