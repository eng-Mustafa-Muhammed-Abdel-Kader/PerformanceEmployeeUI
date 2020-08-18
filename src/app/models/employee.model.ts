import { Department } from './department.model';
import { Title } from '@angular/platform-browser';

export class Employee {
     id: string;
     address: string;
     titleID: number;
     depID: number;
     directManagerID: string;
     hiringDate: Date;
     leaveDate: Date;
     email: string;
     emailConfirmed: boolean;
     passwordHash: string;
     pms_Password: string;
     securityStamp: string;
     phoneNumber: string;
     phoneNumberConfirmed: Date;
     twoFactorEnabled: boolean;
     lockoutEndDateUtc: Date;
     lockoutEnabled: boolean;
     accessFailedCount: number;
     userName: string;
     displayName: string;
     lineID: number;
     inactive: boolean;
     targetVisit: number;
}

export class EmployeeLogin {
     email: string;
     password: string;
}

export class EmployeeReturnData {
     id: string;
     fullName: string;
     Email: string;
     departmentName: string;
     titleName: string;
     phoneNumber: string;
     userName: string;
     titleID: number;
}