import { PmsAcceptanceStatus } from './pms-acceptance-status.model';
import { pmsEmployeePlanObjectiveUpdate } from './pms-employee-plan-objective.model';

export class PmsEmployeePlan {
    planId: number;
    planYear: number;
    creationDate: Date
    employeeId: string;
    directManagerId: string;
    groupId: number;
    employeePerformanceResult: number;
    employeeBehaviorResult: number;
    managerPerformanceResult: number;
    managerBehaviorResult: number;
    statusId: number;
}

export class returnEmployeePaln {
    planId: number;
    planYear: number
    creationDate: Date;
    employeeName: string;
    directManager: string;
    employeeId: string;
    directManagerId: string;
    groupId: number;
    employeePerformanceResult: number;
    employeeBehaviorResult: number;
    managerPerformanceResult: number;
    managerBehaviorResult: number;
    status: PmsAcceptanceStatus;
    employeePlanObjectives: Array<pmsEmployeePlanObjectiveUpdate>
}
