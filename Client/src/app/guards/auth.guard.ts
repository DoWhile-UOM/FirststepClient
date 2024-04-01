import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard{
  constructor(private auth : AuthService, private router: Router ){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }

}
