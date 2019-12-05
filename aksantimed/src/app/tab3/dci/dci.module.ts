import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// tslint:disable-next-line: import-spacing
import { DciComponent } from  './dci.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
//import { NgSelectModule } from '@ng-select/ng-select';
//import { NgxTypeaheadModule } from 'ngx-typeahead';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    //NgSelectModule,
   // NgxTypeaheadModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DciComponent
      }
    ])
  ],
  declarations: [DciComponent]
})
export class DciModule { }
