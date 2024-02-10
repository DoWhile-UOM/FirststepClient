export class Apipaths {
    static readonly baseUrl: string = 'https://localhost:7213/api/';
    
    // employee
    static readonly addNewHRManager: string = this.baseUrl + 'Employee/AddNewHRManager';
    static readonly addNewHRAssistant: string = this.baseUrl + 'Employee/AddNewHRAssistant';

    // advertisements
    static readonly getJobDetails: string = this.baseUrl + 'Advertisement/GetAdvertisementById/';
    static readonly getAdvertisements: string = this.baseUrl + 'Advertisement/GetAllAdvertisements';
}
