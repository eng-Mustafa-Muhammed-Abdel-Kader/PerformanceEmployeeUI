import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { EmployeeLogin } from "../../models/employee.model";
import { BehaviorSubject, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public UserValue: any = new BehaviorSubject({});
  currentUserValue = this.UserValue.asObservable();

  public isLogin = new BehaviorSubject(false);
  currentLogin = this.isLogin.asObservable();

  oneEmployee: EmployeeLogin;
  constructor(public share: SharedService) { }

  loginEmployee() {
    return this.share.postService("api/Login/LoginEmployee",this.oneEmployee);
  }

  changeMessage(loginState: boolean,userValue: any) {
    this.isLogin.next(loginState);
    this.UserValue.next(userValue);
  }
}
