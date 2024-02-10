export class ViewAdvertisement {
    job_number: number;
    title: string;
    location_province: string;
    location_city: string;
    employeement_type: string;
    arrangement: string;
    is_experience_required: string;
    salary: string;
    submission_deadline: string;
    posted_date: string;
    job_overview: string;
    job_responsibilities: string;
    job_qualifications: string;
    job_benefits: string;
    job_other_details: string;
    field_name: string;
    company_name: string;

    constructor(job_number: number, 
        title: string, 
        location_province: string, 
        location_city: string, 
        employeement_type: string, 
        arrangement: string, 
        is_experience_required: string, 
        salary: string, 
        submission_deadline: string,
        posted_date: string, 
        job_overview: string, 
        job_responsibilities: string, 
        job_qualifications: string, 
        job_benefits: string, 
        job_other_details: string,
        field_name: string,
        company_name: string) {
        
        this.job_number = job_number;
        this.title = title;
        this.location_province = location_province;
        this.location_city = location_city;
        this.employeement_type = employeement_type;
        this.arrangement = arrangement;
        this.is_experience_required = is_experience_required;
        this.salary = salary;
        this.submission_deadline = submission_deadline;
        this.posted_date = posted_date;
        this.job_overview = job_overview;
        this.job_responsibilities = job_responsibilities;
        this.job_qualifications = job_qualifications;
        this.job_benefits = job_benefits;
        this.job_other_details = job_other_details;
        this.field_name = field_name;
        this.company_name = company_name;
    }
}
