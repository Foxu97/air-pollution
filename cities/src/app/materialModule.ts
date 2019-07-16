import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule
    
      ],
      exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
      ],
})
export class materialModule { }