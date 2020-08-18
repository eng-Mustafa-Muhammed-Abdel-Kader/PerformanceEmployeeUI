import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DialogModule } from "primeng/dialog";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/static/header/header.component';
import { FooterComponent } from './components/static/footer/footer.component';
import { SidebarComponent } from './components/static/sidebar/sidebar.component';
import { LoginComponent } from './components/views/login/login.component';
import { AddGroupForEmployeeComponent } from './components/views/ReviewersGroup/add-group-for-employee/add-group-for-employee.component';
import { ShowGroupsForEmployeeComponent } from './components/views/ReviewersGroup/show-groups-for-employee/show-groups-for-employee.component';
import { AcceptanceStatusManageComponent } from './components/views/acceptance-status-manage/acceptance-status-manage.component';
import { AddNewPlanComponent } from './components/views/PlanAndObjectives/add-new-plan/add-new-plan.component';
import { ShowYourPlanComponent } from './components/views/PlanAndObjectives/show-your-plan/show-your-plan.component';
import { EvaluationPariodComponent } from './components/views/evaluation-pariod/evaluation-pariod.component';
import { ShowApprovePlanComponent } from './components/views/PlanAndObjectives/show-approve-plan/show-approve-plan.component';
import { ShowQuarterEvakuationComponent } from './components/views/PlanAndObjectives/show-quarter-evakuation/show-quarter-evakuation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    AddGroupForEmployeeComponent,
    ShowGroupsForEmployeeComponent,
    AcceptanceStatusManageComponent,
    AddNewPlanComponent,
    ShowYourPlanComponent,
    EvaluationPariodComponent,
    ShowApprovePlanComponent,
    ShowQuarterEvakuationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DialogModule,
    MessageModule,
    MessagesModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
