export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    dateOfBirth: string;
   
    reports: Report [];
}

export interface Report {
    employeeID: string; 
    active: boolean;
    date: Date;
    sick_leave: boolean;
    vacation: boolean;
    startOfWork: string;
    endOfWork: string;
    break1: string;
    break2: string;
}