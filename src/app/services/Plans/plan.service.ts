import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { PmsEmployeePlan } from "../../models/pms-employee-plan.model";
import { PmsEmployeePlanObjective } from "../../models/pms-employee-plan-objective.model";
@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plan: PmsEmployeePlan;
  objective: PmsEmployeePlanObjective;

  constructor(public share: SharedService) { }

  addEmployeePlan() {
    return this.share.postService("api/PlanAndObjective/AddNewPlan",this.plan);
  }

  addEmployeePlanObjective(ArrayOfObjective) {
    return this.share.postService("api/PlanAndObjective/AddNewObjectiveOfPlan",ArrayOfObjective);
  }

  GetEmployeePlan(employeeObject) {
    return this.share.postService("api/PlanAndObjective/GetEmployeePlan",employeeObject);
  }

  GetEmployeePlanWithDirectManager(employeeObject) {
    return this.share.postService("api/PlanAndObjective/GetEmployeePlanToDirectManager",employeeObject);
  }

  GetObjectiveBetweenDates(employeeObject) {
    return this.share.postService("api/PlanAndObjective/GetObjectiveBetweenDates",employeeObject);
  }

  GetQuarterDataOfEmployee(employeeObject) {
    return this.share.postService("api/PlanAndObjective/GetQuarterDataOfEmployee",employeeObject);
  }

  updateObjective() {
    return this.share.postService("api/PlanAndObjective/UpdateObjectiveOfPlan",this.objective);
  }

  updatePlan() {
    return this.share.postService("api/PlanAndObjective/UpdatePlan",this.plan);
  }
}
