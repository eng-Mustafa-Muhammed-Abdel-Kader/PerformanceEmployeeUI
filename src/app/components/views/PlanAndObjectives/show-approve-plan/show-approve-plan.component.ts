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
  selector: 'app-show-approve-plan',
  templateUrl: './show-approve-plan.component.html',
  styleUrls: ['./show-approve-plan.component.css'],
  providers: [ MessageService ]
})
export class ShowApprovePlanComponent implements OnInit {

  message: string = ""; 
  showSuccess: boolean = false;
  showError: boolean = false;
  showLoading: boolean = false;
  showObjective: boolean = false;
  showUpdateModel: boolean = false;
  showUpgrade: boolean = false;
  planId: number = 0;
  approveForm: FormGroup;
  logForm: FormGroup;
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

    this.planLog.oneLog = {
      comment: '',
      creationDate: new Date(),
      employeeId: '',
      isAccepted: '',
      logId: 0,
      planId: 1,
      statusId: 1
    }
    this.showLoading = true;

    this.plan.GetEmployeePlanWithDirectManager(this.employeeData).subscribe(res => {
      if (res == null) {
        this.message = "we have some error when load data";
        this.showLoading = false;
        this.showError = true;
        return;        
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.employeePlanData = this.response.data as returnEmployeePaln[];
        this.acceptance.getAllStatus().subscribe(res => {
          if (res == null) {
            this.message = "we have some error when load data";
            this.showLoading = false;
            this.showError = true;
            return;
          }
          this.response = res as Result;
          if (this.response.status == 1) {
            this.acceptanceData = this.response.data as PmsAcceptanceStatus[];
            this.planId = this.employeePlanData[0].planId;
            this.showLoading = false;
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
    });
    this.showLoading = true;
    this.reviewers.groupOfEMployee(this.employeeData.id).subscribe(res => {
      if (res == null) {
        this.message = "We have Some Error In Call Server Please Reload web Site";
        this.showLoading = false;
        this.showError = true;
        return;
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.groupReviewersData = this.response.data as GroupReviewers[];
        this.acceptance.getAllStatus().subscribe(res => {
          if (res == null) {
            this.message = "We have Some Error In Call Server Please Reload web Site";
            this.showLoading = false;
            this.showError = true;
            return;
          }
          this.response = res as Result;
          if (this.response.status == 1) {
            this.acceptanceData = this.response.data as PmsAcceptanceStatus[];
            this.showLoading = false;
            console.log(this.acceptanceData);
            console.log(this.groupReviewersData);
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

    });

    this.approveForm = this.builder.group({
      comment: new FormControl('',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-,.]*$'))]))
    });

    this.logForm = this.builder.group({
      comment: new FormControl('',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-,.]*$'))]))
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
    this.approveForm = this.builder.group({
      comment: new FormControl('',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-,.]*$'))]))
    });
    this.showUpdateModel = true;
  }

  trueFunction() {
    this.plan.objective.isAcceptted = true;
    alert('You Are Accept This Objective Please Write small Comment Of This Objective');
  }

  falseFunction() {
    this.plan.objective.isAcceptted = false;
    alert('You Are Reject This Objective Please Write Your Reson On Comment Field');
  }

  saveData() {
    var trueNumber: number = 0;
    var falseNumber: number = 0;
    this.showLoading = true;
    if (this.approveForm.invalid) {
      this.approveForm.controls['comment'].markAsDirty();
      this.showLoading = false;
      return;
    }

    this.plan.updateObjective().subscribe(res => {
      if (res == null) {
        this.message = "We have Some Error When Call The Server Please Try Again";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.objectives = this.response.data as pmsEmployeePlanObjectiveUpdate[];
        this.employeePlanData[this.planIndex].employeePlanObjectives = this.response.data as pmsEmployeePlanObjectiveUpdate[];
        this.showLoading = false;
        this.showUpdateModel = false;
        this.message = this.response.message;
        this.showSuccess = true;
      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;
      }
    });
    this.objectives.forEach(element => {
      if (element.isAcceptted == true) {
        trueNumber += 1;
      } else {
        falseNumber += 1;
      }
    });

    console.log(trueNumber + ' ' + falseNumber);
    if (falseNumber == 0 && (trueNumber > falseNumber)) {
      alert('You Can Close This plan from You And Upgrade To Top Level');
    }
  }

  upgradePlan(item) {
    var trueNumber: number = 0; var falseNumber: number = 0;
    var plan = item as returnEmployeePaln;
    this.objectives = plan.employeePlanObjectives;
    this.objectives.forEach(element => {
      if (element.isAcceptted == true) {
        trueNumber += 1;
      } else {
        falseNumber += 1;
      }
    });

    if (falseNumber == 0 && (trueNumber > falseNumber)) {
      this.plan.plan = {
        planId: plan.planId,
        creationDate: plan.creationDate,
        planYear: plan.planYear,
        employeeId: plan.employeeId,
        directManagerId: plan.directManagerId,
        employeeBehaviorResult: plan.employeeBehaviorResult,
        employeePerformanceResult: plan.employeePerformanceResult,
        managerBehaviorResult: plan.managerBehaviorResult,
        managerPerformanceResult: plan.managerPerformanceResult,
        groupId: null,
        statusId: plan.status.statusId
      }
      console.log(this.plan.plan)
      this.showUpgrade = true;

    } else {
      this.message = "You Can Upgrade This Plan To Top Level becuase The Objective Is Un Completed";
      this.showError = true;
    }
  }

  upgradeplan(groupId,i) {
    this.plan.plan.groupId = groupId;
    console.log(this.plan.plan);
    alert('you are choose group'+ (i+1));
  }

  CommentUpgrade() {
    this.showUpgradeModel = true;
    
    this.planLog.oneLog = {
      logId: 0,
      comment: '',
      creationDate: this.plan.plan.creationDate,
      employeeId: this.employeeData.id,
      isAccepted: '',
      planId: this.plan.plan.planId,
      statusId: this.plan.plan.statusId
    }


  }

  trueUpgradeFunction() {
    var num = this.acceptanceData.findIndex(x => x.statusId == this.plan.plan.statusId);
    this.planLog.oneLog.statusId = this.acceptanceData[num +1].statusId;
    this.plan.plan.statusId = this.acceptanceData[num +1].statusId;
    alert('You Are Accept This Objective Please Write small Comment Of This Objective');
  }

  falseUpgradeFunction() {
    var num = this.acceptanceData.findIndex(x => x.statusId == this.plan.plan.statusId);
    this.planLog.oneLog.statusId = this.acceptanceData[num -1].statusId
    this.plan.plan.statusId = this.acceptanceData[num -1].statusId;
    alert('You Are Reject This Objective Please Write Your Reson On Comment Field');
  }

  saveUpgradeData() {
    this.plan.updatePlan().subscribe(res => {
      if (res == null) {
        this.message = "We have Some Error When Call The Server Please Try Again";
        this.showLoading = false;
        this.showError = true;
        return;
      }
      this.response = res as Result;

      if (this.response.status == 1) {
          this.planLog.addNewLog().subscribe(res => {
          if (res == null) {
            this.message = "We have Some Error When Call Server Please Try Again";
            this.showLoading = false;
            this.showError = true;
            return;
          }
          this.response = res as Result;
          if (this.response.status == 1) { 
            this.message = "Your Plan Is Updated Successfuly";
            this.showLoading = false;
            this.showSuccess = true;
            this.showUpgradeModel = false;
            this.showUpgrade = false;
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
    });

  }

}
