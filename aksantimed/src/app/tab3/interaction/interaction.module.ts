import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InteractionComponent } from './interaction.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: InteractionComponent
      }
    ])
  ],
  declarations: [InteractionComponent]
})
export class InteractionModule { }