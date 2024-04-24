export class Apipaths {
    static readonly baseUrl: string = 'https://localhost:7213/api/';
    
    // employee
    static readonly addNewHRManager: string = this.baseUrl + 'Employee/AddNewHRManager';
    static readonly addNewHRAssistant: string = this.baseUrl + 'Employee/AddNewHRAssistant';

    // advertisements
    static readonly getJobDetails: string = this.baseUrl + 'Advertisement/GetAdvertisementById/'; // + advertisement_id
    static readonly getAdvertisements: string = this.baseUrl + 'Advertisement/GetAllAdvertisements';
    static readonly getAdvertisementsByCompanyID: string = this.baseUrl + 'Advertisement/GetAdvertisementsByCompanyID/'; // + company_id
    static readonly addNewJob: string = this.baseUrl + 'Advertisement/AddAdvertisement';
    static readonly changeStatusOfJob: string = this.baseUrl + 'Advertisement/ChangeStatus/'; // + advertisement_id
    static readonly deleteJob: string = this.baseUrl + 'Advertisement/DeleteAdvertisement/'; // + advertisement_id
    static readonly saveJob: string = this.baseUrl + 'Advertisement/SaveAdvertisement/'; // + advertisement_id
    static readonly unsaveJob: string = this.baseUrl + 'Advertisement/UnsaveAdvertisement/'; // + advertisement_id
    static readonly getSavedAdvertisements: string = this.baseUrl + 'Advertisement/GetSavedAdvertisements/seekerID='; // + seeker_id
    static readonly basicSearch: string = this.baseUrl + 'Advertisement/SearchAdvertisementsBasic/seekerID='; // + seeker_id
    static readonly getAdvertisementByIDwithKeywords = this.baseUrl + 'GetAdvertisementByIdWithKeywords/'; // + advertisement_id

    // applications
    static readonly getAllApplications: string = this.baseUrl + 'GetApplicationsByAdvertisementId/'; // + advertisement_id

    // company
    static readonly getCompanyProfile: string = this.baseUrl + 'Company/GetCompanyProfile/'; // + company_id

    // seeker
    static readonly getSeeker: string = this.baseUrl + 'Seeker/GetSeeker/'; // + seeker_id
    static readonly updateSeeker: string = this.baseUrl + 'Seeker/UpdateSeeker/'; // + seeker_id
    static readonly deleteSeeker: string = this.baseUrl + 'Seeker/DeleteSeeker/'; // + seeker_id
    static readonly addSeeker: string = this.baseUrl + 'Seeker/AddSeeker';

    // keywords
    static readonly getKeywords: string = this.baseUrl + 'ProfessionKeyword/GetAllProfessionKeywords/';  // + field_id

    // skills 
    static readonly getAllSkills: string = this.baseUrl + 'Skills/GetAllSkills';

    // fields
    static readonly getAllFields: string = this.baseUrl + 'JobField/GetAllJobFields';

    // external
    static readonly getCountryNames: string = 'https://api.first.org/v1/get-countries';
    static readonly getCityNames: string = 'https://countriesnow.space/api/v0.1/countries/cities';
}
