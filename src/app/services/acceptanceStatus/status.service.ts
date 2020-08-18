import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { PmsAcceptanceStatus } from "../../models/pms-acceptance-status.model";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  oneStatus: PmsAcceptanceStatus;
  modelUpdate: PmsAcceptanceStatus;

  constructor(public share: SharedService) { }

  getAllStatus() {
    return this.share.getServiceWithOutParams("api/AcceptanceStatus/GetAllStatus");
  }

  addNewStatus() {
    return this.share.postService("api/AcceptanceStatus/addNewStatus",this.oneStatus);
  }

  deleteStatus(status) {
    return this.share.postService("api/AcceptanceStatus/DeleteStatus",status);
  }

  updateStatus() {
    return this.share.postService("api/AcceptanceStatus/UpdateStatus",this.modelUpdate);
  }
}
