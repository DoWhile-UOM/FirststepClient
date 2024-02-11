export class AddAdvertisement {
    job_number: number;
    title: string;
    country: string;
    city: string;
    employeement_type: string;
    arrangement: string;
    is_experience_required: boolean;
    salary: number;
    submission_deadline: string;
    job_overview: string;
    job_responsibilities: string;
    job_qualifications: string;
    job_benefits: string;
    job_other_details: string;
    hrManager_id: number;
    field_id: number;
    keywords: string[];

    constructor(job_number: number, 
        title: string, 
        country: string, 
        city: string, 
        employeement_type: string, 
        arrangement: string, 
        is_experience_required: boolean, 
        salary: number, 
        submission_deadline: string, 
        job_overview: string, 
        job_responsibilities: string, 
        job_qualifications: string, 
        job_benefits: string, 
        job_other_details: string, 
        hrManager_id: number, 
        field_id: number, 
        keywords: string[]) {
        
        this.job_number = job_number;
        this.title = title;
        this.country = country;
        this.city = city;
        this.employeement_type = employeement_type;
        this.arrangement = arrangement;
        this.is_experience_required = is_experience_required;
        this.salary = salary;
        this.submission_deadline = submission_deadline;
        this.job_overview = job_overview;
        this.job_responsibilities = job_responsibilities;
        this.job_qualifications = job_qualifications;
        this.job_benefits = job_benefits;
        this.job_other_details = job_other_details;
        this.hrManager_id = hrManager_id;
        this.field_id = field_id;
        this.keywords = keywords;
    }
}
