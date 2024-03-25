import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegStateService {
  private baseUrl:string="https://localhost:7213/api/User"

  constructor(private http:HttpClient) { }

  ngOnInit() {
    
    this.http.get<any>(this.baseUrl)
      .subscribe(response => {
        this.data = response;
      }, error => {
        console.error(error);
      });
  }




}
