export class ViewAdvertisementCard {
    advertisement_id: number;
    title: string;
    company_name: string;
    field_name: string;
    location_province: string;
    location_city: string;
    employeement_type: string;
    arrangement: string;
    posted_date: string;
    is_saved: boolean;

    constructor(advertisement_id: number, 
        title: string, 
        company_name: string, 
        field_name: string, 
        location_province: string, 
        location_city: string, 
        employeement_type: string, 
        arrangement: string, 
        posted_date: string, 
        is_saved: boolean) {
        
        this.advertisement_id = advertisement_id;
        this.title = title;
        this.company_name = company_name;
        this.field_name = field_name;
        this.location_province = location_province;
        this.location_city = location_city;
        this.employeement_type = employeement_type;
        this.arrangement = arrangement;
        this.posted_date = posted_date;
        this.is_saved = is_saved;
    }
}
