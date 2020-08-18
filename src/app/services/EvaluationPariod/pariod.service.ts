import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { EvaluationPariod } from "../../models/evaluation-pariod.model";

@Injectable({
  providedIn: 'root'
})
export class PariodService {

  onePariod: EvaluationPariod
  constructor(public share: SharedService) { }
  
  getAllData() {
    return this.share.getServiceWithOutParams("api/EvaluationPariod/GetAllPariod");
  }

  getAllDataForThisYear() {
    return this.share.getServiceWithOutParams("api/EvaluationPariod/GetAllPariodWithYear");
  }

  addNewPariod() {
    return this.share.postService("api/EvaluationPariod/addNewPariod",this.onePariod);
  }

  RemovePariod(pariodObject) {
    return this.share.postService("api/EvaluationPariod/RemovePariod",pariodObject);
  }

}
