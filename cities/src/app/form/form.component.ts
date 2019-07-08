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
  citiesControl = new FormControl();
  //cities: string[] = ['Poland', 'Germany', 'Spain', 'France'];
  cities = [{name: "Poland", val: "PL"},{name: "Germany", val: "GR"},{name: "Spain", val: "ESP"},{name: "France", val: "FR"}];
  airPollutionParameters: string[] = ["pm25", "pm10", "so2", "no2", "o3", "co", "bc"]
  options: string[] = []
  filteredOptions: Observable<string[]>;
  
  constructor(
    private _CityService: CityService
  ) { }

  ngOnInit() {
    this.cities.forEach(city => {
      this.options.push(city.name);
    });

    this.filteredOptions = this.citiesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  public selectCountry(selectedCountry) {
    this.cities.forEach((city) => {
      if (city.name === selectedCountry){
        this._CityService.getCities();
      }
    })
  } 

}
