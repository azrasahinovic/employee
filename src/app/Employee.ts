export interface Employee {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    dateOfBirth?: string;
    reports: Report[];
    active?: string;
}

export interface Report {
    employeeID: string;
    date: Date;
    sick_leave: boolean;
    vacation: boolean;
    startOfWork: string | Date;
    endOfWork: string | Date;
    break1: string | Date;
    break2: string | Date;
}

export interface MonthReport {
    id: number;
    month: number;
    reports: Report[];
}
