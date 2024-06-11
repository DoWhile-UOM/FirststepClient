export class Apipaths {
    static readonly baseUrl: string = 'https://localhost:7213/api/';
    //static readonly baseUrl: string = 'https://firststepdowhile.azurewebsites.net/api/';

    // employee
    static readonly addNewHRManager: string = this.baseUrl + 'Employee/AddNewHRManager';
    static readonly addNewHRAssistant: string = this.baseUrl + 'Employee/AddNewHRAssistant';
    static readonly editemployee: string = this.baseUrl + 'Employee/UpdateEmployee/';
    static readonly getEmployeeDetails: string = this.baseUrl + 'Employee/GetEmployeeById/';
    static readonly getEmployeeList: string = this.baseUrl + 'Employee/GetAllEmployees/';
    static readonly deleteEmployee: string = this.baseUrl + 'Employee/DeleteEmployee/'; // + employee_id
    static readonly getAllHRMs: string = this.baseUrl + 'Employee/GetAllHRManagers/'; // + company_id
    static readonly getAllHRAs: string = this.baseUrl + 'Employee/GetAllHRAssistants/'; // + company_id

    // advertisements
    static readonly getJobDetails: string = this.baseUrl + 'Advertisement/GetAdvertisementById/'; // + advertisement_id
    static readonly getAdvertisements: string = this.baseUrl + 'Advertisement/GetAllAdvertisements';
    static readonly GetCompanyAdvertisementList: string = this.baseUrl + 'Advertisement/GetCompanyAdvertisementList/'; // + emp_id
    static readonly addNewJob: string = this.baseUrl + 'Advertisement/AddAdvertisement';
    static readonly changeStatusOfJob: string = this.baseUrl + 'Advertisement/ChangeStatus/'; // + advertisement_id
    static readonly deleteJob: string = this.baseUrl + 'Advertisement/DeleteAdvertisement/'; // + advertisement_id
    static readonly saveJob: string = this.baseUrl + 'Advertisement/SaveAdvertisement/'; // + advertisement_id
    static readonly unsaveJob: string = this.baseUrl + 'Advertisement/UnsaveAdvertisement/'; // + advertisement_id
    static readonly getSavedAdvertisements: string = this.baseUrl + 'Advertisement/GetSavedAdvertisements/seekerID='; // + seeker_id
    static readonly getAppliedAdvertisements: string = this.baseUrl + 'Advertisement/GetAppliedAdvertisements/seekerID='; // + seeker_id
    static readonly basicSearch: string = this.baseUrl + 'Advertisement/SearchAdvertisementsBasic/seekerID='; // + seeker_id
    static readonly getAdvertisementByIDwithKeywords = this.baseUrl + 'Advertisement/GetAdvertisementById/update/'; // + advertisement_id
    static readonly updateAdvertisement = this.baseUrl + 'Advertisement/UpdateAdvertisement'; // + advertisement_id
    static readonly getAdvertisementsByHRA = this.baseUrl + 'Advertisement/GetAssignedAdvertisementsByHRA/hra_id='; // + employee_id
    static readonly getRecommendedAdvertisements = this.baseUrl + 'Advertisement/GetRecommendedAdvertisements/seekerID='; // + seeker_id

    // company
    static readonly getCompanyProfile: string = this.baseUrl + 'Company/GetCompanyProfile/'; // + company_id
    static readonly getCompanyDetails: string = this.baseUrl + 'Company/GetCompanyProfile/update=true/';
    static readonly updateCompanyDetails: string = this.baseUrl + 'Company/UpdateRegisteredCompany/';
    static readonly deleteCompany: string = this.baseUrl + 'Company/DeleteCompany/';
    static readonly getAllComapanyList: string = this.baseUrl + 'Company/GetAllComapanyList';
    static readonly getCompanyApplicationById: string = this.baseUrl + 'Company/GetCompanyApplicationById/'; //+companyId
    static readonly getCompanyRegState: string = this.baseUrl + 'Company/GetRegCheckByID/';//+regurl id
    static readonly registerCompany: string = this.baseUrl + 'Company/AddCompany';
    static readonly updateCompanyApplicationById: string = this.baseUrl + 'Company/UpdateCompanyVerification/'; //+companyId 
    static readonly postCompanyAdminReg: string = this.baseUrl + 'User/register';
    static readonly updateUnregComapny:string =this.baseUrl + 'Company/UpdateUnregisteredCompany/';

    // application
    static readonly getApplicationDetails: string = this.baseUrl + 'Application/GetApplicationById/'; // + application_id
    static readonly changeAssignedHRA: string = this.baseUrl + 'Application/ChangeAssignedHRA/'; // + application_id
    static readonly submitApplication: string = this.baseUrl + 'Application/AddApplication';
    static readonly getassignedApplications: string = this.baseUrl + 'Application/GetAssignedApplicationList/'; // + hra_id

    // keywords
    static readonly getKeywords: string = this.baseUrl + 'ProfessionKeyword/GetAllProfessionKeywords/';  // + field_id

    // skills 
    static readonly getAllSkills: string = this.baseUrl + 'Skills/GetAllSkills';

    // fields
    static readonly getAllFields: string = this.baseUrl + 'JobField/GetAllJobFields';

    // seeker
    static readonly getSeekerDetails: string = this.baseUrl + 'Seeker/GetSeeker/';// + seeker_id
    static readonly getSeekerDetailsForApplication: string = this.baseUrl + 'Seeker/GetSeekerDetails/';// + seeker_id
    static readonly getSeekerProfile: string = this.baseUrl + 'Seeker/GetSeekerProfile/';// + seeker_id
    static readonly addSeeker: string = this.baseUrl + 'Seeker/AddSeeker';
    static readonly editSeeker: string = this.baseUrl + 'Seeker/UpdateSeeker';// + seeker_id
    static readonly updateProfilePicture: string = this.baseUrl + 'Seeker/UpdateProfilePicture/'; // + user_id
    static readonly deleteSeeker: string = this.baseUrl + 'Seeker/DeleteSeeker/'; // + seeker_id


    //Authentication
    static readonly register: string = this.baseUrl + 'User/register';
    static readonly authenticate: string = this.baseUrl + 'User/authenticate';

    static readonly requestOTP: string = this.baseUrl + 'Email/RequestOTP';
    static readonly verifyOTP: string = this.baseUrl + 'Email/VerifyEmail';

    // user
    static readonly UserBaseUrl: string = this.baseUrl + 'User/';

    // Azure Blob Service
    static readonly BlobConnectionString = 'DefaultEndpointsProtocol=https;AccountName=firststep;AccountKey=uufTzzJ+uB7BRnKG9cN2RUi0mw92n5lTl2EMvnOTw6xv7sfPQSWBqJxHll+Zn2FNc06cGf8Qgrkb+ASteH1KEQ==;EndpointSuffix=core.windows.net';
    static readonly BlobContainerName = 'apiimages';
    static readonly BlobName = 'firststep';
}
