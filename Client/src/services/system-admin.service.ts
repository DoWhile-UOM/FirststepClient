import { Injectable } from '@angular/core';
import { Apipaths } from './apipaths/apipaths';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';

interface Logging {
  activeTot: number;
  inactiveTot: number;
  activeCA: number;
  inactiveCA: number;
  activeHRM: number;
  inactiveHRM: number;
  activeHRA: number;
  inactiveHRA: number;
  activeSeeker: number;
  inactiveSeeker: number;
  activeCmpUsers: number;
  inactiveCmpUsers: number;
  eligibleUnregisteredCompaniesCount: number;
}

interface EligibleUnregisteredCompany {
  company_id: number;
  company_name: string;
  company_email: string;
  company_logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {

  constructor(private snackBar: MatSnackBar) { }
}
