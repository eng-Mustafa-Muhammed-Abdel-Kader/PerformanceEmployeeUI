import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployeeService } from "../../../../services/Employee/employee.service";
import { EmployeeReturnData,Employee } from "../../../../models/employee.model";
import { Result } from "../../../../models/result.model";
import { Reviewers , employeeName } from "../../../../models/reviewers.model";
import { GroupReviewers } from "../../../../models/group-reviewers.model";
import { ReviewersGroupService } from "../../../../services/Reviewers/reviewers-group.service";

@Component({
  selector: 'app-add-group-for-employee',
  templateUrl: './add-group-for-employee.component.html',
  styleUrls: ['./add-group-for-employee.component.css']
})
export class AddGroupForEmployeeComponent implements OnInit {

  EmployeeData: EmployeeReturnData[];
  employeeData: Employee;
  groupReviewers: GroupReviewers;
  message: string = ""; showError: boolean = false; p: any = 0; yearReview: string; showSuccess: boolean = false;

  ArrayOfReviewers: Array<Reviewers> = [];
  ArrayOfEmployeeName: Array<employeeName> = [];

  constructor(public router: Router, public employeeService: EmployeeService, public group: ReviewersGroupService) { }

  ngOnInit(){
    var dateNow = new Date();
    this.yearReview = dateNow.getFullYear().toString();
    console.log(this.yearReview);
    var localEmployee = localStorage.getItem('users');
    if (localEmployee == null) {
      this.router.navigate(['/']);
      return;
    } else {
      this.employeeData = JSON.parse(localEmployee);
    }
    this.employeeService.returnEmployeeData(this.employeeData.titleID).subscribe(res => {
      var response: Result = res as Result;
      if (response.status == 1) {
        this.EmployeeData = response.data as EmployeeReturnData[];
        console.log(this.EmployeeData);
      } else {
        this.message = response.message;
        this.showError = true;
      }
    });

    this.group.oneGroup = {
      groupId: 0,
      employeeId: this.employeeData.id,
      yearReview: this.yearReview
    };
  }
  changePagination(event) {
    this.p = event;
    //window.scroll({top: 0, left: 0, behavior: 'smooth'})
  }

  addObjectToList(id, employeeName) {
    if (this.ArrayOfReviewers.length > 2) {
      this.message = "You Can Add More Than Two Reviewers In Your Group";
      this.showError = true;
      return;
    }

    var oneReviewer: Reviewers = {
      groupId: 0,
      employeeId: id,
      reviewerId: 0
    }
    var empName: employeeName = {
      Name: employeeName
    };
    this.ArrayOfReviewers.push(oneReviewer);
    this.ArrayOfEmployeeName.push(empName);
    var oneReviewer: Reviewers = {
      groupId: 0,
      employeeId: '',
      reviewerId: 0
    }
  }

  removeReviewer(index) {
    this.ArrayOfReviewers.splice(index,1);
  }

  addGroup() {
    this.group.addNewGroup().subscribe(res => {
      debugger;
      var response: Result = res as Result;
      if (response.status == 1) {
        this.groupReviewers = response.data as GroupReviewers;
        this.ArrayOfReviewers.forEach(element => {
          element.groupId = this.groupReviewers.groupId
        });
        this.group.addNewReviewers(this.ArrayOfReviewers).subscribe(res => {
          var responseReviewer: Result = res as Result;
          if (responseReviewer.status == 1) {
            this.message = responseReviewer.message;
            this.showSuccess = true;
          } else {
            this.message = responseReviewer.message;
            this.showError = true;
          }
        });
      } else {
        this.message = response.message;
        this.showError = true;
      }
    });
  }
}
