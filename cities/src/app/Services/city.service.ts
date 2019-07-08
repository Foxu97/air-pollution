import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiAddresses } from '../Models/ApiAddresses';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private _http: HttpClient,
    private _ApiAddresses: ApiAddresses
  ) { }

  public getMeasurements(country: string, parameter: string) {
    let basicApiUrl = this._ApiAddresses.getMeasurementsUrl();
    console.log(basicApiUrl)
    console.log(country)
    console.log(parameter)
    let params = new HttpParams();
    params = params.append('country', country);
    params = params.append('limit', '10');
    params = params.append('sort', 'desc');
    params = params.append('parameter', parameter);
    params = params.append('order_by', 'value');
    return this._http.get(basicApiUrl, {params: params}).subscribe((res)=>{console.log(res)})
    
  }
}
