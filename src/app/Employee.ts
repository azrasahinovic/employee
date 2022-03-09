export interface Employee {
    map: any;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    dateOfBirth: string;
    active: boolean;
    reports: Report [];
}

export interface Report {
    date: Date;
    sick_leave: boolean;
    vacation: boolean;
    startOfWork: string;
    endOfWork: string;
    break1: string;
    break2: string;
}