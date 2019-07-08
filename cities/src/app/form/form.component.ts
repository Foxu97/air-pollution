import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  citiesControl = new FormControl();
  cities: string[] = ['Poland', 'Germany', 'Spain', 'France'];
  filteredOptions: Observable<string[]>;
  
  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.citiesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

}
