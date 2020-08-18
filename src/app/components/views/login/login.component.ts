import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { LoginService } from "../../../services/login/login.service";
import { Employee } from "../../../models/employee.model";
import { Result } from "../../../models/result.model";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  message: string = "";
  type: string = "password";
  showError: boolean = false;
  succ: Employee
  isLogin : boolean = false;
  privllage : number = 1;
  userData : any = {};
  // succ: User;
  id: number;

  loginForm: FormGroup;

  constructor(public login: LoginService, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.login.currentLogin.subscribe(message => this.isLogin = message)
    this.login.UserValue.subscribe(message => this.userData = message)
    this.login.oneEmployee = {
      email: '',
      password: ''
    }

    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(new RegExp('^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3}([\\com\\net\\gov]))+)$'))])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(16)]))
    });
  }

    LoginUser() {
      if (this.loginForm.invalid) {
        this.loginForm.controls['email'].markAsDirty();
        this.loginForm.controls['password'].markAsDirty();
        return;
      }

    try {
      this.login.loginEmployee().subscribe(res => {
        var response: Result = res as Result;
        if (response.status == 1) {
          this.succ = response.data as Employee ;
          localStorage.setItem("users",JSON.stringify(this.succ));
          localStorage.setItem("UserLogin",JSON.stringify(this.login.oneEmployee));
          this.login.changeMessage(true,this.succ);
          this.router.navigate(['/']);
        } else {
          this.login.changeMessage(false,this.succ);
          this.message = response.message;
          this.showError = true;
          this.router.navigate(['/login']);
        }
      });  
    } catch (error) {
      console.log(error)
    }
  }


  ToggolePass() {
    var cl = document.getElementById('toggle');
    if (this.type == 'password') {
      this.type = 'text';
      cl.classList.add('hide');
    } else { 
      this.type = 'password';
      cl.classList.remove('hide');
    }
  }

}
