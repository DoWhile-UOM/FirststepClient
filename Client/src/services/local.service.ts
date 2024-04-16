import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public getData(key: string) {
    //return localStorage.getItem(key)
    try{
      return sessionStorage.getItem(key);
    }
    catch(error){
      //console.log(error);
      return null;
    }
  }
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }
}
