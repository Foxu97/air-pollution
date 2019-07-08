import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiAdresses } from '../Models/ApiAdresses';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    //private _http: HttpClient,
    private _ApiAdresses: ApiAdresses
  ) { }

  public getCities(){
    let adrr = this._ApiAdresses.getMeasurementsUrl();
    console.log(adrr)
  }
}
