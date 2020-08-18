import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StatusService } from "../../../services/acceptanceStatus/status.service";
import { PmsAcceptanceStatus } from "../../../models/pms-acceptance-status.model";
import { Result } from "../../../models/result.model";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-acceptance-status-manage',
  templateUrl: './acceptance-status-manage.component.html',
  styleUrls: ['./acceptance-status-manage.component.css'],
  providers: [ MessageService ]
})
export class AcceptanceStatusManageComponent implements OnInit {

  statusData :PmsAcceptanceStatus[];
  response: Result;
  statusForm: FormGroup;
  updateStatusForm: FormGroup;

  message: string = "";
  showError: boolean = false; showSuccess: boolean = false; showLoading: boolean = false; p: any = 1;
  showAddModel: boolean = false; showUpdateModel: boolean = false;
  constructor(public status: StatusService, public builder: FormBuilder, public router: Router) { }

  ngOnInit(): void {

    var users = localStorage.getItem("users");
    if (users == null) {
      this.router.navigate(['/']);
      return;
    }
    this.showLoading = true;

    this.status.oneStatus = {
      statusId: 0,
      statusName: ''
    }
    this.status.modelUpdate = {
      statusId: 0,
      statusName: ''
    }

    this.statusForm = this.builder.group({
      statusName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-]*$'))]))
    });
    this.updateStatusForm = this.builder.group({
      statusName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-]*$'))]))
    });
    this.getData();
  }

  getData() {
    this.status.getAllStatus().subscribe(res => {
      this.response = res as Result;
      if (this.response.status == 1) {
        this.statusData = this.response.data as PmsAcceptanceStatus[];
        console.log(this.statusData);
        this.showLoading = false;
      } else {
        this.statusData = [];
        this.message = this.response.message;
        this.showError = true;
      }
    });
  }

  saveData() {
    this.showLoading = true;
    if (this.statusForm.invalid) {
      this.statusForm.controls['statusName'].markAsDirty();
      this.showLoading = false;
      return;
    }

    this.status.addNewStatus().subscribe(res => {
      if (res == null) {
        this.message = 'You Have Some Error When Upload Data Please Try Again';
        this.showLoading = false;
        this.showError = true;
        return;
      }
      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = this.response.message;
        this.showLoading = false;
        this.statusData = this.response.data as PmsAcceptanceStatus[];
        this.showSuccess = true;
        this.showAddModel = false;

      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;        
      }
    });
  }

  saveUpdateData() {
    this.showLoading = true;
    if (this.updateStatusForm.invalid) {
      this.statusForm.controls['statusName'].markAsDirty();
      this.showLoading = false;
      return;
    }

    this.status.updateStatus().subscribe(res => {
      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = this.response.message;
        this.showLoading = false;
        this.statusData = this.response.data as PmsAcceptanceStatus[];
        this.showSuccess = true;
        this.showUpdateModel = false;

      } else {
        this.message = this.response.message;
        this.showLoading = false;
        this.showError = true;        
      }
    });
  }

  deleteRow(item) {
    if (item == null || item == undefined) {
      this.message = "Please Choose The Status If You Want To Delete";
      this.showError = false;
      return;
    }

    this.status.deleteStatus(item).subscribe(res => {
      debugger;
      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = this.response.message;
        this.showSuccess = true;
        this.statusData = this.response.data as PmsAcceptanceStatus[];
      } else {
        this.message = this.response.message;
        this.showError = true;
      }
    });
  }
  openModel() {
    this.status.oneStatus = {
      statusId: 0,
      statusName: ''
    }

    this.statusForm = this.builder.group({
      statusName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-]*$'))]))
    });
    this.showAddModel = true;
  }

  showModelUpdate(item) {
    this.status.modelUpdate.statusId = item.statusId;
    this.status.modelUpdate.statusName = item.statusName;
    
    this.updateStatusForm = this.builder.group({
      statusName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(20), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-]*$'))]))
    });

    this.showUpdateModel = true;
  }

  changePagination($event) {
    this.p = $event;
  }

}
