import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityService } from '../Services/city.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public citiesControl = new FormControl();
  public parameterControl = new FormControl();
  public cities;
  public airPollutionParameters: string[] 
  public options: string[];
  public filteredOptions: Observable<string[]>;
  public defaultParameter: string;
  public selectedCountry: string;
  public mostPollutedCities;
  public isLoading: boolean;
  public isMeasurements: boolean;


  constructor(
    private _CityService: CityService
  ) { }

  ngOnInit() {
    this.isMeasurements = true;
    this.defaultParameter = "pm25";
    this.options = [];
    this.airPollutionParameters = ["pm25", "pm10", "so2", "no2", "o3", "co", "bc"];
    this.cities = [{ name: "Poland", val: "PL" }, { name: "Germany", val: "DE" }, { name: "Spain", val: "ES" }, { name: "France", val: "FR" }];

    this.cities.forEach(city => {
      this.options.push(city.name);
    });

    this.filteredOptions = this.citiesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public selectCountry() {

    this.mostPollutedCities = [];
    let isCityAvailable = this.cities.find((city) => {
      return ((city.name).toLowerCase() === this.citiesControl.value.trim().toLowerCase())
    })
    if (isCityAvailable) {
      this.isLoading = true;
      this.selectedCountry = isCityAvailable.val;
      this._CityService.getMeasurements(this.selectedCountry, this.defaultParameter).then(resp => {
        this.mostPollutedCities = resp;
        this.isLoading = false;
        this.isMeasurements = true;
      }).catch(() => {
        this.isMeasurements = false;
        this.isLoading = false;
      })
    }
    else {
      this.isMeasurements = false;
    }


  }
  public onParamChange(param: string) {
    this.defaultParameter = param;
  }
  public getCityDescription(cityName) {
    this._CityService.getCityDescription(cityName).then((res: any) => {
      this.mostPollutedCities.find(c => {
        if (c.name === cityName) {
          if (res.extract) c.description = res.extract;
          if (res.thumbnail) c.img = res.thumbnail.source;
          if (res.fullurl) c.fullurl = res.fullurl;
        }
      });
    }
    );
  }
}
