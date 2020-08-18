import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { PlanService } from "../../../../services/Plans/plan.service";
import { Result } from "../../../../models/result.model";
import { Employee } from "../../../../models/employee.model";
import { returnEmployeePaln } from "../../../../models/pms-employee-plan.model";
import { pmsEmployeePlanObjectiveUpdate } from "../../../../models/pms-employee-plan-objective.model";

@Component({
  selector: 'app-show-your-plan',
  templateUrl: './show-your-plan.component.html',
  styleUrls: ['./show-your-plan.component.css']
})
export class ShowYourPlanComponent implements OnInit {
  message: string = ""; 
  showError: boolean = false;
  showLoading: boolean = false;
  planId: number = 0; Value: number = 0; Weight: number = 0;
  QuarterEvaluationForm: FormGroup;
  showUpdateModel: boolean = false;
  showSuccess: boolean = false;

  response: Result;
  employeeData: Employee;
  employeePlanData: returnEmployeePaln;
  objectiveUpdate: pmsEmployeePlanObjectiveUpdate[];
  constructor(public reouter: Router, public builder: FormBuilder, public plan: PlanService) { }

  ngOnInit(): void {
    var employeeObject = localStorage.getItem('users');
    if (employeeObject === null) {
      alert("You don't Have Any Plan To Show it Please Create Your Plan And Show him");
      this.reouter.navigate(['/']);
      return;
    } else {
      this.employeeData = JSON.parse(employeeObject) as Employee;
    }

    this.showLoading = true;

    this.getData();

    this.plan.objective = {
      objectiveId: 0,
      comment: '',
      descreption: '',
      employeeEvaluoationValue: 0,
      employeeEvaluoationWeight: 0,
      isAcceptted: false,
      managerEvaluoationValue: 0,
      managerEvaluoationWeight: 0,
      objectiveValue: 0,
      objectiveWeight: 0,
      pariodId: 1,
      planId: 1
    }

    this.QuarterEvaluationForm = this.builder.group({
      Value: new FormControl('',Validators.compose([Validators.required, Validators.min(1)])),
      Weight: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
    });
  }


  getData() {
    return this.plan.GetEmployeePlan(this.employeeData).subscribe(res => {
      if (res === null) {
        this.message = "We have Some Error When Loading Data Please Reload This Page";
        this.showLoading = false;
        this.showError = true;
        return;
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.employeePlanData = this.response.data as returnEmployeePaln;
        console.log(this.employeePlanData);
        this.planId = this.employeePlanData.planId;
        this.plan.GetQuarterDataOfEmployee(this.employeeData).subscribe(res => {
          if (res === null) {
            this.message = "We have Some Error When Loading Data Please Reload This Page";
            this.showLoading = false;
            this.showError = true;
            return;
          }
          this.response = res as Result;
          if (this.response.status == 1) {
            if ((this.response.data as pmsEmployeePlanObjectiveUpdate[]).length != 0) {
              this.objectiveUpdate = this.response.data as pmsEmployeePlanObjectiveUpdate[];
              console.log(this.objectiveUpdate);
              this.Value = this.objectiveUpdate[0].objectiveValue;
              this.Weight = this.objectiveUpdate[0].objectiveWeight;
              this.showLoading = false;
              this.planId = this.employeePlanData.planId;                
            } else {
              this.message = "You don't have data tgis quarter to evaluate";
              this.showLoading = false;
              this.objectiveUpdate = [];
              this.showError = true;
            }
          } else {
            this.message = this.response.message;
            this.showError = true;
            this.showLoading = false;
          }
        });
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
        this.employeePlanData = this.response.data as returnEmployeePaln;
        this.planId = this.employeePlanData.planId;
      }
    });
  }

  openModelUpdate() {
    this.plan.objective.objectiveId = this.objectiveUpdate[0].objectiveId;
    this.plan.objective.comment = this.objectiveUpdate[0].comment;
    this.plan.objective.descreption = this.objectiveUpdate[0].descreption;
    this.plan.objective.employeeEvaluoationValue = this.objectiveUpdate[0].employeeEvaluoationValue;
    this.plan.objective.employeeEvaluoationWeight = this.objectiveUpdate[0].employeeEvaluoationWeight;
    this.plan.objective.isAcceptted = this.objectiveUpdate[0].isAcceptted;
    this.plan.objective.managerEvaluoationValue = this.objectiveUpdate[0].managerEvaluoationValue;
    this.plan.objective.managerEvaluoationWeight = this.objectiveUpdate[0].managerEvaluoationWeight;
    this.plan.objective.objectiveValue = this.objectiveUpdate[0].objectiveValue;
    this.plan.objective.objectiveWeight = this.objectiveUpdate[0].objectiveWeight;
    this.plan.objective.pariodId = this.objectiveUpdate[0].pariodId;
    this.plan.objective.planId = this.objectiveUpdate[0].planId;
    this.QuarterEvaluationForm = this.builder.group({
      Value: new FormControl('',Validators.compose([Validators.required, Validators.min(1)])),
      Weight: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
    });
    this.showUpdateModel = true;
  }

  saveData() {
    if (this.QuarterEvaluationForm.invalid) {
      this.QuarterEvaluationForm.controls['Value'].markAsDirty();
      this.QuarterEvaluationForm.controls['Weight'].markAsDirty();
      return;
    }

    this.showLoading = true;
    this.plan.updateObjective().subscribe(res => {
      if (res == null) {
        this.message = "We have Some Error When Loading Data Please Reload This Page";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.employeePlanData.employeePlanObjectives = this.response.data as pmsEmployeePlanObjectiveUpdate[];
        this.message = this.response.message;
        this.showLoading = false;
        this.showUpdateModel = false;
        this.showSuccess = true;
        this.objectiveUpdate = [];
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    });
  }
}
