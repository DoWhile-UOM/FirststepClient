export class ViewAdvertisementCard {
    advertisement_id: number;
    title: string;
    company_name: string;
    field_name: string;
    country: string;
    city: string;
    employeement_type: string;
    arrangement: string;
    posted_date: string;
    is_saved: boolean;

    constructor(advertisement_id: number, 
        title: string, 
        company_name: string, 
        field_name: string, 
        country: string, 
        city: string, 
        employeement_type: string, 
        arrangement: string, 
        posted_date: string, 
        is_saved: boolean) {
        
        this.advertisement_id = advertisement_id;
        this.title = title;
        this.company_name = company_name;
        this.field_name = field_name;
        this.country = country;
        this.city = city;
        this.employeement_type = employeement_type;
        this.arrangement = arrangement;
        this.posted_date = posted_date;
        this.is_saved = is_saved;
    }
}
