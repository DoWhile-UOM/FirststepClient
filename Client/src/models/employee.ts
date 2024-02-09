export class Employee {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    company_id: number;

    constructor(first_name: string, last_name: string, email: string, password: string, company_id: number) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.company_id = company_id;
    }
}