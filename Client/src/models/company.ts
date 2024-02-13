export class Company {
  company_id: number;
  company_name: string;
  company_description: string;
  company_website: string;
  company_business_scale: string;
  company_phone_number: number;
  company_email: string;
  company_city: string;
  company_province: string;

  constructor(
    company_id: number,
    company_name: string,
    company_description: string,
    company_website: string,
    company_business_scale: string,
    company_phone_number: number,
    company_email: string,
    company_city: string,
    company_province: string
  ) {
    this.company_id = company_id;
    this.company_name = company_name;
    this.company_description = company_description;
    this.company_website = company_website;
    this.company_business_scale = company_business_scale;
    this.company_phone_number = company_phone_number;
    this.company_email = company_email;
    this.company_city = company_city;
    this.company_province = company_province;
  }
}
