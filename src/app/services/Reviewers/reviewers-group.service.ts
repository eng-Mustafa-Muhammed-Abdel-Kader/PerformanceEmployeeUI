import { Injectable } from '@angular/core';
import { GroupReviewers } from "../../models/group-reviewers.model";
import { SharedService } from "../shared/shared.service";
@Injectable({
  providedIn: 'root'
})
export class ReviewersGroupService {

  oneGroup: GroupReviewers; 
  constructor(public share: SharedService) { }

  addNewGroup() {
    return this.share.postService("api/ReviewersGroup/AddNewGroup",this.oneGroup);
  }

  addNewReviewers(ArrayOfReviewers) {
    return this.share.postService("api/ReviewersGroup/AddNewReviewers",ArrayOfReviewers);
  }

  groupOfEMployee(employeeId) {
    return this.share.getServiceWithOneParams("api/ReviewersGroup/groupOfEMployee",employeeId);
  }
}
