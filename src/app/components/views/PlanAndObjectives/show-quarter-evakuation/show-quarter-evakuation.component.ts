import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { PlanService } from "../../../../services/Plans/plan.service";
import { StatusService } from "../../../../services/acceptanceStatus/status.service";
import { ReviewersGroupService } from "../../../../services/Reviewers/reviewers-group.service";
import { PlanLogService } from "../../../../services/planLog/plan-log.service";
import { Result } from "../../../../models/result.model";
import { Employee } from "../../../../models/employee.model";
import { returnEmployeePaln } from "../../../../models/pms-employee-plan.model";
import { pmsEmployeePlanObjectiveUpdate } from "../../../../models/pms-employee-plan-objective.model";
import { PmsAcceptanceStatus } from "../../../../models/pms-acceptance-status.model";
import { GroupReviewers } from "../../../../models/group-reviewers.model";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-show-quarter-evakuation',
  templateUrl: './show-quarter-evakuation.component.html',
  styleUrls: ['./show-quarter-evakuation.component.css'],
  providers: [ MessageService ]
})
export class ShowQuarterEvakuationComponent implements OnInit {

  message: string = ""; 
  showSuccess: boolean = false;
  showError: boolean = false;
  showLoading: boolean = false;
  showObjective: boolean = false;
  showUpdateModel: boolean = false;
  showUpgrade: boolean = false;
  planId: number = 0;
  QuarterEvaluationForm: FormGroup;
  planIndex: number = 0;
  showUpgradeModel: boolean = false;

  response: Result;
  employeeData: Employee;
  employeePlanData: returnEmployeePaln[];
  acceptanceData: PmsAcceptanceStatus[];
  objectives: pmsEmployeePlanObjectiveUpdate[];
  groupReviewersData: GroupReviewers[];

  constructor(public router: Router, public builder: FormBuilder, public plan: PlanService, public acceptance: StatusService, public reviewers: ReviewersGroupService, public planLog: PlanLogService) { }

  ngOnInit(): void {
    var employeeObject = localStorage.getItem('users');
    if (employeeObject == null) {
      this.router.navigateByUrl('/');
      return;
    } else {
      this.employeeData = JSON.parse(employeeObject) as Employee;
    }

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

    this.showLoading = true;

    this.getData();

    this.QuarterEvaluationForm = this.builder.group({
      Value: new FormControl('',Validators.compose([Validators.required, Validators.min(1)])),
      Weight: new FormControl('', Validators.compose([Validators.required, Validators.min(1)]))
    });

  }

  getData() {
    this.plan.GetObjectiveBetweenDates(this.employeeData).subscribe(res => {
      if (res == null) {
        this.message = "we have some error when load data";
        this.showLoading = false;
        this.showError = true;
        return;        
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.employeePlanData = this.response.data as returnEmployeePaln[];
        this.showLoading = false;
        console.log(this.employeePlanData)
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    });
  }

  openObjectiveOfPlan(item, i) { 
    var plan = item as returnEmployeePaln;
    this.objectives = plan.employeePlanObjectives;
    this.planIndex = i;
    console.log(this.planIndex);
    this.showObjective = true;
  }

  OpenModelUpdate(item) {
    this.plan.objective.objectiveId = item.objectiveId;
    this.plan.objective.comment = item.comment;
    this.plan.objective.descreption = item.descreption;
    this.plan.objective.employeeEvaluoationValue = item.employeeEvaluoationValue;
    this.plan.objective.employeeEvaluoationWeight = item.employeeEvaluoationWeight;
    this.plan.objective.isAcceptted = item.isAcceptted;
    this.plan.objective.managerEvaluoationValue = item.managerEvaluoationValue;
    this.plan.objective.managerEvaluoationWeight = item.managerEvaluoationWeight;
    this.plan.objective.objectiveValue = item.objectiveValue;
    this.plan.objective.objectiveWeight = item.objectiveWeight;
    this.plan.objective.pariodId = item.pariodId;
    this.plan.objective.planId = item.planId;
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
        this.message = "We have Some Error When Call The Server Please Try Again";
        this.showLoading = false;
        this.showError = true;
        return;
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = this.response.message;
        this.showLoading = false;
        this.showSuccess = true;
        this.getData();
        this.showUpdateModel = false;
        this.showObjective = false;
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    });
  }
}
