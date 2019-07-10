import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../Models/Endpoints.model';
import { Measurements } from '../Models/Measurements.model';
import { City } from '../Models/City.model';
class wikiRes{
  batchcomplete: string
  query : { 
    pages: Object
  }
  warnings: Object
}
@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private _http: HttpClient,
    private _Endpoints: Endpoints,
  ) { }

  public getMeasurements(country: string, parameter: string) {
    return new Promise((resolve, reject) => {
      const measurementsEndpoint = this._Endpoints.getMeasurementsEndpoint();
      const numberOfReturnedCities = 10;
      const offset = new Date().getTimezoneOffset() * 60000;
      const yesterday = new Date(Date.now() - 86400000 - offset)
      .toISOString()
      .slice(0, -5);

      let params = new HttpParams();
      params = params.append('country', country);
      params = params.append('sort', 'desc');
      params = params.append('parameter', parameter);
      params = params.append('order_by', 'value');
      params = params.append('limit', '500');
      params = params.append('date_from', yesterday);
      const mostPollutedCities = [];
      this._http.get(measurementsEndpoint, {params: params}).subscribe((res: Measurements ) => {
        for (let i = 0; mostPollutedCities.length < numberOfReturnedCities; i++){
          if(i === res.results.length -1){
            break;
          }
          const city = new City();
          city.name = res.results[i].city;
          city.pollutionLevel = (res.results[i].value).toFixed(2);
          console.log (city.pollutionLevel);
          if (mostPollutedCities.length === 0){
            mostPollutedCities.push(city)
          }
          else{
            let isCityAlreadyAdded = mostPollutedCities.find(c => {
              return c.name === res.results[i].city
            })
            if(isCityAlreadyAdded){
              continue;
            }
            else {
              mostPollutedCities.push(city)
            }
          }
        }
      resolve(mostPollutedCities);
      });
    }); 
  }

  public getCityDescription(cityName){
    return new Promise((resolve, reject) => {
      const wikiEndpoint = this._Endpoints.getWikiEndpoint();
      let params = new HttpParams();
      params = params.append('action', 'query');
      params = params.append('format', 'json');
      params = params.append('prop', 'extracts|info|pageimages|description');
      params = params.append('inpop', 'url');
      params = params.append('piprop', 'thumbnail');
      params = params.append('pithumbsize', '300');
      params = params.append('exchars', '500');
      params = params.append('exsectionformat', 'plain');
      params = params.append('redirects', '1');
      params = params.append('origin', '*');
      params = params.append('exintro', '');
      params = params.append('explaintext', '');
      params = params.append('titles', cityName);
      this._http.get(wikiEndpoint, {params: params}).subscribe((res: wikiRes)=>{
        let pages = res.query.pages;
        let page = pages[Object.keys(pages)[0]];
        resolve(page);
      });
    });
  }
}
