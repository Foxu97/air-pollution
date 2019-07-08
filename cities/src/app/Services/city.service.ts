import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiAddresses } from '../Models/ApiAddresses';
class apiRes {
  meta: {
    name: string,
    license: string, 
    website: string,
    page: number,
    limit: number,
    found: number
  };
  results: [
    {
    location: string,
    parameter: string,
    date: {
            utc: string,
            local: string
            },
    value: number,
    unit: string,
    coordinates: {
                latitude: number,
                longitude: number
            },
    country: string,
    city: string
          }
          ]
}
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _numberOfReturnedCities;
  constructor(
    private _http: HttpClient,
    private _ApiAddresses: ApiAddresses,
  ) { }

  public getMeasurements(country: string, parameter: string): string[] {
    let basicApiUrl = this._ApiAddresses.getMeasurementsUrl();
    this._numberOfReturnedCities = 10;
    console.log(basicApiUrl)
    console.log(country)
    console.log(parameter)
    let mostPollutedCities: string[] = [];
    let params = new HttpParams();
    params = params.append('country', country);
    //params = params.append('limit', '50');
    params = params.append('sort', 'desc');
    params = params.append('parameter', parameter);
    params = params.append('order_by', 'value');
    this._http.get(basicApiUrl, {params: params}).subscribe((res: apiRes ) => {
      res.results.forEach((city) => {
        if(!mostPollutedCities.includes(city.city) && mostPollutedCities.length != this._numberOfReturnedCities){
          mostPollutedCities.push(city.city);
        }
      });
      
    });
    return mostPollutedCities
  }
}
