import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AccountComponent } from './account.component';


@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    FormsModule,

    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent
      }
    ])
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
