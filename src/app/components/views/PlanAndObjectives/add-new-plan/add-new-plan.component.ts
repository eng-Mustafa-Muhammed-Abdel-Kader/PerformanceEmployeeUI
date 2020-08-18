import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Result } from "../../../../models/result.model";
import { PmsEmployeePlanObjective } from "../../../../models/pms-employee-plan-objective.model";
import { PmsEmployeePlan } from "../../../../models/pms-employee-plan.model";
import { Employee } from "../../../../models/employee.model";
import { EvaluationPariod } from "../../../../models/evaluation-pariod.model";
import { PmsAcceptanceStatus } from "../../../../models/pms-acceptance-status.model";
import { PmsPlanAcceptanceLog } from "../../../../models/pms-plan-acceptance-log.model";
import { PlanService } from "../../../../services/Plans/plan.service";
import { PariodService } from "../../../../services/EvaluationPariod/pariod.service";
import { StatusService } from "../../../../services/acceptanceStatus/status.service";
import { PlanLogService } from "../../../../services/planLog/plan-log.service";

@Component({
  selector: 'app-add-new-plan',
  templateUrl: './add-new-plan.component.html',
  styleUrls: ['./add-new-plan.component.css']
})
export class AddNewPlanComponent implements OnInit {

  DateNow: Date;
  yearNow: number;
  message: string = "";
  showError: boolean = false;
  showSuccess: boolean = false;
  showLoading: boolean = false;
  showAddModel: boolean = false;
  showperiodModel: boolean = false;
  showSubmit: boolean = false;

  planForm: FormGroup;
  response: Result;
  employeeData: Employee;
  periodName: string = "";
  totalPlanWeight: number = 0;
  planData: PmsEmployeePlan;

  arrayOfObjective: Array<PmsEmployeePlanObjective> = [];
  periodData: EvaluationPariod[];
  acceptanceStatusData: PmsAcceptanceStatus[];
  constructor(public builder: FormBuilder, public router: Router, public plan: PlanService, public period: PariodService, public status: StatusService, public planLog: PlanLogService) { }

  ngOnInit(): void {
    this.DateNow = new Date();
    this.yearNow = this.DateNow.getFullYear(); 
    var employeeData = localStorage.getItem('users');
    if (employeeData === null) {
      this.router.navigate(['/']);
      return;
    } else {
      this.employeeData = JSON.parse(employeeData)
    }

    this.showLoading = true;
    this.plan.plan = {
      planId: 0,
      creationDate: this.DateNow,
      planYear: this.yearNow,
      employeeId: this.employeeData.id,
      directManagerId: this.employeeData.directManagerID,
      employeeBehaviorResult: 0,
      employeePerformanceResult: 0,
      groupId: null,
      managerBehaviorResult: 0,
      managerPerformanceResult: 0,
      statusId: 1
    }

    this.plan.objective = {
      objectiveId: 0,
      descreption: '',
      planId: 0,
      isAcceptted: false,
      comment: '',
      pariodId: 0,
      objectiveValue: 0,
      objectiveWeight: 0,
      employeeEvaluoationValue: 0,
      employeeEvaluoationWeight: 0,
      managerEvaluoationValue: 0,
      managerEvaluoationWeight: 0
    }

    this.planForm = this.builder.group({
      descreption: new FormControl('', Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(150), Validators.pattern(new RegExp('^[A-Za-z\\u0621-\\u064A\\s][A-Za-z0-9\\u0621-\\u064A\\s\\-,()_&]*$'))])),
      period: new FormControl('', Validators.required),
      objectiveValue: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      objectiveWeight: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    });

    this.period.getAllDataForThisYear().subscribe(res => {
      
      if (res == null) {
        this.message = "You have Some Error When Load Data Please Refresh Website";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.periodData = this.response.data as EvaluationPariod[];  
        console.log(this.periodData);
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    }, err => {
      this.message = err;
      this.showLoading = false;
      this.showError = true;
      console.log(err);

    });

    this.status.getAllStatus().subscribe(res => {
      
      if (res == null) {
        this.message = "You have Some Error When Load Data Please Refresh Website";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.showLoading = false;
        this.acceptanceStatusData = this.response.data as PmsAcceptanceStatus[];  
        console.log(this.periodData);
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    }, err => {
      this.message = err;
      this.showLoading = false;
      this.showError = true;
      console.log(err);

    });

  }

  openAddModel() {
    this.plan.objective = {
      objectiveId: 0,
      descreption: '',
      planId: 0,
      isAcceptted: false,
      comment: '',
      pariodId: 0,
      objectiveValue: 0,
      objectiveWeight: 0,
      employeeEvaluoationValue: 0,
      employeeEvaluoationWeight: 0,
      managerEvaluoationValue: 0,
      managerEvaluoationWeight: 0
    }

    this.planForm = this.builder.group({
      descreption: new FormControl('', Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(150), Validators.pattern(new RegExp('^[A-Za-z\\u0621-\\u064A\\s][A-Za-z0-9\\u0621-\\u064A\\s\\-,()_&]*$'))])),
      period: new FormControl('', Validators.required),
      objectiveValue: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      objectiveWeight: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    });

    this.showAddModel = true;
  }
  saveData() {

    if (this.planForm.invalid) {
      this.planForm.controls['descreption'].markAsDirty();
      this.planForm.controls['period'].markAsDirty();
      this.planForm.controls['objectiveValue'].markAsDirty();
      this.planForm.controls['objectiveWeight'].markAsDirty();
      return;
    }
    this.arrayOfObjective.push(this.plan.objective);
    console.log(this.arrayOfObjective);
    this.showAddModel = false;

    this.totalPlanWeight += this.plan.objective.objectiveWeight;

    this.plan.objective = {
      objectiveId: 0,
      descreption: '',
      planId: 0,
      isAcceptted: false,
      comment: '',
      pariodId: 0,
      objectiveValue: 0,
      objectiveWeight: 0,
      employeeEvaluoationValue: 0,
      employeeEvaluoationWeight: 0,
      managerEvaluoationValue: 0,
      managerEvaluoationWeight: 0
    }

  }

  openPeriodModel() {
    this.showperiodModel = true;
  }

  addQuarter(item) {
    this.periodName = item.pariodName;
    this.plan.objective.pariodId = item.pariodId;
    this.showperiodModel = false;
  }

  deleteRow(item, i) {
    this.totalPlanWeight -= item.objectiveWeight;
    this.arrayOfObjective.splice(i,1);
    console.log(this.arrayOfObjective);
  }

  openModelSubmit() {
    this.showSubmit = true;
  }

  savePlan() {
    this.showLoading = true;
    if (this.totalPlanWeight != 100) {
      this.message = "Your Plan Is Uncompleted Please Create Your Objective To go to 100%";
      this.showLoading = false;
      this.showError = true;
      return;
    }

    this.plan.addEmployeePlan().subscribe(res => {
      if (res == null) {
        this.message = "You have Some Error When Load Data Please Refresh Website";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.planData = this.response.data as PmsEmployeePlan;
        this.arrayOfObjective.forEach(e => {
          e.planId = this.planData.planId
        });

        this.plan.addEmployeePlanObjective(this.arrayOfObjective).subscribe(res => {
          if (res == null) {
            this.message = "We have Some Error When Call Server Please Try Again";
            this.showLoading = false;
            this.showError = true;
            return;
          }
          this.response = res as Result;
          if (this.response.status == 1) {
            this.planLog.oneLog = {
              logId: 0,
              comment: 'plan '+ this.planData.planYear+' of employee',
              creationDate: this.planData.creationDate,
              employeeId: this.planData.employeeId,
              isAccepted: '',
              planId: this.planData.planId,
              statusId: this.acceptanceStatusData[1].statusId
            }
            this.planLog.addNewLog().subscribe(res => {
              if (res == null) {
                this.message = "We have Some Error When Call Server Please Try Again";
                this.showLoading = false;
                this.showError = true;
                return;
              }
              this.response = res as Result;
              if (this.response.status == 1) { 
                this.message = "Your Plan Is Saved Successfuly";
                this.showLoading = false;
                this.showSuccess = true;
              } else {
                this.message = this.response.message;
                this.showLoading = false;
                this.showError = true;
              }
            });
          } else {
            this.message = this.response.message;
            this.showLoading = false;
            this.showError = true;
          }
        })
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    }, err => {
      this.message = "We Have Some Error :- "+ err;
      this.showLoading = false;
      this.showError = true;
      console.log(err);
    });
  }
  SubmitPlan() {
    this.plan.plan.statusId = this.acceptanceStatusData[1].statusId;
  }
}
