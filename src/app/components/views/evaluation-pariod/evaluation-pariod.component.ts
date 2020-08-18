import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { EvaluationPariod } from "../../../models/evaluation-pariod.model";
import { Result } from "../../../models/result.model";
import { PariodService } from "../../../services/EvaluationPariod/pariod.service";

@Component({
  selector: 'app-evaluation-pariod',
  templateUrl: './evaluation-pariod.component.html',
  styleUrls: ['./evaluation-pariod.component.css']
})
export class EvaluationPariodComponent implements OnInit {

  pariodData: EvaluationPariod[] = [];
  pariodGroup: FormGroup;
  pipe = new DatePipe('en');
  response: Result;

  datePlaceHolder: string = "";
  message: string = "";
  showError: boolean = false; showSuccess: boolean = false; showLoading: boolean = false; p: any = 1;
  showAddModel: boolean = false; showUpdateModel: boolean = false; yearNow: number;
  constructor(public builder: FormBuilder, public router: Router, public pariod: PariodService) { }

  ngOnInit(){
    var users = localStorage.getItem("users");
    if (users == null) {
      this.router.navigate(['/']);
      return;
    }

    this.datePlaceHolder = this.pipe.transform(new Date,'dd/MM/yyyy');
    this.yearNow = new Date().getFullYear();

    this.declareObjectAndForm();

    this.pariod.getAllData().subscribe(res => {
      if (res == null) {
        this.message = "We Have Some Error When Save Data Please Try Again And Check Of Network";
        this.showLoading = false;
        this.showError = true;
        this.pariodData = [];
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.showLoading = false;
        this.pariodData = this.response.data as EvaluationPariod[];
      } else {
        this.message = "You Have Some Error :- "+ this.response.message;
        this.showLoading = false;
        this.showError = true;
        this.pariodData = [];
      }
    }, err => {
      this.message = "We Have Some Error :- "+ err;
      this.showLoading = false;
      this.showError = true;
      console.log(err);
      this.pariodData = [];
    });
  }

  declareObjectAndForm() {
    this.pariod.onePariod = {
      pariodId: 0,
      pariodName: '',
      pariodYear: this.yearNow,
      startDate: null,
      endDate: null
    }

    this.pariodGroup = this.builder.group({
      pariodName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(new RegExp('^[A-Za-z\\s][A-Za-z0-9\\s\\-]*$'))])),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }
  openModel() {
    this.declareObjectAndForm();
    this.showAddModel = true;
  }

  saveData() {
    this.showLoading = true;
    if (this.pariodGroup.invalid) {
      this.showLoading = false;
      this.pariodGroup.controls['pariodName'].markAsDirty();
      this.pariodGroup.controls['startDate'].markAsDirty();
      this.pariodGroup.controls['endDate'].markAsDirty();
      return;
    }

    this.pariod.addNewPariod().subscribe(res => {
      if (res == null) {
        this.message = "We Have Some Error When Save Data Please Try Again And Check Of Network";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = "Pariod Saved Successfuly";
        this.showLoading = false;
        this.showSuccess = true;
        this.showAddModel = false;
        this.pariodData = this.response.data as EvaluationPariod[];
      } else {
        this.message = "You Have Some Error :- "+ this.response.message;
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

  deleteRow(item) {
    this.showLoading = true;
    if (item == null) {
      this.message = "Please Try Again";
      this.showLoading = false;
      this.showError = true;
    }
    this.pariod.RemovePariod(item).subscribe(res => {
      if (res == null) {
        this.message = "We Have Some Error When Save Data Please Try Again And Check Of Network";
        this.showLoading = false;
        this.showError = true;
        return;
      }

      this.response = res as Result;
      if (this.response.status == 1) {
        this.message = "Pariod Saved Successfuly";
        this.showLoading = false;
        this.showSuccess = true;
        this.showAddModel = false;
        this.pariodData = this.response.data as EvaluationPariod[];
      } else {
        this.message = "You Have Some Error :- "+ this.response.message;
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

  changePagination($event) {
    this.p = $event;
  }

}
