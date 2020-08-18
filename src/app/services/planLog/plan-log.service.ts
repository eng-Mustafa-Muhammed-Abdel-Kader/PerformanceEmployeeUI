import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { PmsPlanAcceptanceLog } from "../../models/pms-plan-acceptance-log.model";

@Injectable({
  providedIn: 'root'
})
export class PlanLogService {

  oneLog: PmsPlanAcceptanceLog;
  constructor(public share: SharedService) { }

  addNewLog() {
    return this.share.postService("api/planAcceptanceLog/addNewLog",this.oneLog);
  }
}
