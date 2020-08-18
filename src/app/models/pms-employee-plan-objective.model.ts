export class PmsEmployeePlanObjective {
    objectiveId: number;
    planId: number;
    descreption: string;
    objectiveValue: number;
    objectiveWeight: number;
    pariodId: number;
    isAcceptted: boolean;
    comment: string;
    employeeEvaluoationValue: number;
    employeeEvaluoationWeight: number;
    managerEvaluoationValue: number;
    managerEvaluoationWeight: number;
}

export class pmsEmployeePlanObjectiveUpdate {
    objectiveId: number;
    planId: number;
    descreption: string;
    objectiveValue: number;
    objectiveWeight: number;
    pariodId: number;
    periodName: string;
    isAcceptted: boolean;
    comment: string;
    employeeEvaluoationValue: number;
    employeeEvaluoationWeight: number;
    managerEvaluoationValue: number;
    managerEvaluoationWeight: number;
}
