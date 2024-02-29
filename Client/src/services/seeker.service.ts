import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SeekerService {

  constructor() { }

  GetSeeker(): Observable<any> {
    return new Observable<any>((observer) => {
      axios.get('https://localhost:7213/api/Seeker/GetSeeker')
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  
}

