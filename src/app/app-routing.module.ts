import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { AppComponent } from './app.component';
import { AddGroupForEmployeeComponent } from './components/views/ReviewersGroup/add-group-for-employee/add-group-for-employee.component';
import { ShowGroupsForEmployeeComponent } from './components/views/ReviewersGroup/show-groups-for-employee/show-groups-for-employee.component';
import { AcceptanceStatusManageComponent } from './components/views/acceptance-status-manage/acceptance-status-manage.component';
import { AddNewPlanComponent } from './components/views/PlanAndObjectives/add-new-plan/add-new-plan.component';
import { EvaluationPariodComponent } from './components/views/evaluation-pariod/evaluation-pariod.component';
import { ShowYourPlanComponent } from './components/views/PlanAndObjectives/show-your-plan/show-your-plan.component';
import { ShowApprovePlanComponent } from './components/views/PlanAndObjectives/show-approve-plan/show-approve-plan.component';
import { ShowQuarterEvakuationComponent } from './components/views/PlanAndObjectives/show-quarter-evakuation/show-quarter-evakuation.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  //Reviewers Group

  { path:'createGroup', component: AddGroupForEmployeeComponent },
  { path: 'showGroupOfEmployee', component: ShowGroupsForEmployeeComponent },
  { path: 'AcceptanceStatus', component:AcceptanceStatusManageComponent },
  { path: 'EvaluationPariod', component: EvaluationPariodComponent },
  { path: 'createPlan', component:AddNewPlanComponent },
  { path: 'showEmployeePlan', component: ShowYourPlanComponent },
  { path: 'approvalPlan', component: ShowApprovePlanComponent },
  { path: 'evaluationQuarter', component: ShowQuarterEvakuationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
