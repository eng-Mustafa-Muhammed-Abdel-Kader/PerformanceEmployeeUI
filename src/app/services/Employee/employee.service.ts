import { Injectable } from '@angular/core';
import { SharedService } from "../shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public shared: SharedService) { }

  returnEmployeeData(titleId) {
    return this.shared.getServiceWithOneParams("api/Employee/GetEmployeesWithTitle",titleId);
  }
}
