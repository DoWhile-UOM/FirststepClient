export class Apipaths {
    //static readonly baseUrl: string = 'https://localhost:7213/api/';
    static readonly baseUrl: string = 'https://firststepdowhile.azurewebsites.net/api/';

    // employee
    static readonly addNewHRManager: string = this.baseUrl + 'Employee/AddNewHRManager';
    static readonly addNewHRAssistant: string = this.baseUrl + 'Employee/AddNewHRAssistant';
    static readonly editemployee: string = this.baseUrl + 'Employee/UpdateEmployee/';
    static readonly getEmployeeDetails: string = this.baseUrl + 'Employee/GetEmployeeById/';
    static readonly getEmployeeList: string = this.baseUrl + 'Employee/GetAllEmployees/';
    static readonly deleteEmployee: string = this.baseUrl + 'Employee/DeleteEmployee/'; // + employee_id
    static readonly getAllHRMs: string = this.baseUrl + 'Employee/GetAllHRManagers/'; // + company_id
    static readonly getAllHRAs: string = this.baseUrl + 'Employee/GetAllHRAssistants/'; // + company_id
    static readonly getUserDetails: string = this.baseUrl + 'User/GetUser/userId='; // + user_id 
    static readonly updateUserDetails: string = this.baseUrl + 'User/UpdateUser';
    static readonly postCompanyAdminReg: string = this.baseUrl + 'Employee/AddNewCompanyAdmin';// + company_id
    static readonly getEmployeeStat: string = this.baseUrl + 'Employee/GetEmployeeStats/'; // + company_id

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
    static readonly getCompanyAdvertisementTitleList = this.baseUrl + 'Advertisement/GetCompanyAdvertisementTitleList/'; // + company_id

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
    static readonly getEligibleUnregisteredCompanies: string = this.baseUrl + 'Company/GetEligibleUnregisteredCompanies';
    static readonly updateCompanyLogo: string = this.baseUrl + 'Company/UpdateCompanyLogo/';//https://firststepdowhile.azurewebsites.net/api/Company/UpdateCompanyLogo?companyId=7
    static readonly updateUnregComapny: string = this.baseUrl + 'Company/UpdateUnregisteredCompany/';

    // application
    static readonly getApplicationDetails: string = this.baseUrl + 'Application/GetApplicationById/'; // + application_id
    static readonly changeAssignedHRA: string = this.baseUrl + 'Application/ChangeAssignedHRA/'; // + application_id
    static readonly submitApplication: string = this.baseUrl + 'Application/AddApplication';
    static readonly resubmitApplication: string = this.baseUrl + 'Application/ResubmitApplication';
    static readonly getassignedApplications: string = this.baseUrl + 'Application/GetAssignedApplicationList/'; // + hra_id
    static readonly getApplicationStatus: string = this.baseUrl + 'Application/GetApplicationStatus/'; //  advertisement id
    static readonly getApplicationList: string = this.baseUrl + 'Application/GetApplicationList/'; // + job_number + '/status=' + status
    static readonly getSeekerApplicationDetails: string = this.baseUrl + 'Application/GetSeekerApplications/'; // + application_id
    static readonly getShortlistedApplications: string = this.baseUrl + 'Application/GetSelectedApplicationsDetails/'; // + advertisment_id
    static readonly setToInterview: string = this.baseUrl + 'Application/SetToInterview';
    static readonly delegateTask:string = this.baseUrl + 'Application/DelegateTask/'; // + jobID + '/hraIds=' + hraIdsString
    static readonly getAverageTime: string = this.baseUrl + 'Application/GetAverageTime/'; // + company_id
    static readonly getApplicationCount = this.baseUrl + 'Application/GetApplicationCount/'; // + advertisement_id
    static readonly getApplicationStatusCount = this.baseUrl + 'Application/GetApplicationStatusCount/'; // + advertisement_id


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
    static readonly getSeekerEditProfile: string = this.baseUrl + 'Seeker/GetSeekerProfile/Update/';// + seeker_id
    static readonly addSeeker: string = this.baseUrl + 'Seeker/AddSeeker';
    static readonly editSeeker: string = this.baseUrl + 'Seeker/UpdateSeeker/';// + seeker_id
    static readonly updateProfilePicture: string = this.baseUrl + 'Seeker/UpdateProfilePicture/'; // + user_id
    static readonly deleteSeeker: string = this.baseUrl + 'Seeker/DeleteSeeker/'; // + seeker_id

    //revision
    static readonly getRevisionHistory: string = this.baseUrl + 'Revision/GetRevisionHistory/'; // + application_id
    static readonly addRevision: string = this.baseUrl + 'Revision/CreateRevision';
    static readonly updateRevision: string = this.baseUrl + 'Revision/UpdateRevision';
    static readonly deleteRevision: string = this.baseUrl + 'Revision/DeleteRevision/'; // + revision_id

    //Authentication
    static readonly register: string = this.baseUrl + 'User/register';
    static readonly authenticate: string = this.baseUrl + 'User/Authenticate';
    static readonly resetpasswordReq: string = this.baseUrl + 'User/RestPasswordRequest/';
    static readonly resetpassword: string = this.baseUrl + 'User/RestPassword';
    static readonly requestOTP: string = this.baseUrl + 'Email/RequestOTP';
    static readonly verifyOTP: string = this.baseUrl + 'Email/VerifyEmail';

    // user
    static readonly UserBaseUrl: string = this.baseUrl + 'User/';
    static readonly getLoggingsDetails: string = this.baseUrl + 'User/GetLoggingsDetails';

    // Azure Blob Service
    static readonly BlobConnectionString = 'DefaultEndpointsProtocol=https;AccountName=firststep;AccountKey=uufTzzJ+uB7BRnKG9cN2RUi0mw92n5lTl2EMvnOTw6xv7sfPQSWBqJxHll+Zn2FNc06cGf8Qgrkb+ASteH1KEQ==;EndpointSuffix=core.windows.net';
    static readonly BlobContainerName = 'apiimages';
    static readonly BlobName = 'firststep';

    //Interview
    static readonly CreateAppointmentSlot: string = this.baseUrl + 'Appointment/CreateAppointments';
    static readonly GetFreeAppointmentSlot: string = this.baseUrl + 'Appointment/GetAvailabelSlots/';
    static readonly BookSlotSeeker: string = this.baseUrl + 'Appointment/BookAppointment/';
    static readonly GetAllApplicants: string = this.baseUrl + 'Appointment/GetBookedAppointmentList/';
}
