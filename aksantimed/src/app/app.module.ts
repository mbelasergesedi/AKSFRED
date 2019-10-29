//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AlldciService } from './services/alldci.service';
import { DataService } from './services/item.service';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { NotificationsService } from './tab1/notification.service';
import { AuthService } from './services/AuthService';
import { TextSearchService } from './services/textsearch.service';
import { ResultatInteractionService } from './services/resultatInteraction.service';
import { DciSearch } from './services/dci.service';
import { VilleService } from './services/city.service';
import { GaleniqueService } from './services/galenique.service';
import { AnatomiqueService } from './services/anatomique.service';
import { QryCustomerService } from './services/customers.service';

import { InteractionSearch } from './services/interaction.service';
import { InteractionComponent } from './tab3/interaction/interaction.component';
import { AuthenticateService } from './services/authentication.service';
import { SchoolsService } from './services/school.service';
// tslint:disable-next-line: import-spacing
import { QryInteractionService } from './services/Qryinteraction.service';

// Firebase modules
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule, // Only required for database features
    AngularFireModule.initializeApp(environment.firebase),

    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    AuthService,
    GaleniqueService,
    DataService,
    AnatomiqueService,
    TextSearchService,
    NotificationsService,
    QryCustomerService,
    Device,
    Geolocation,
    NativeGeocoder,
    AuthenticateService,
    SchoolsService,
    InteractionComponent,
    InteractionSearch,
    QryInteractionService,
    ResultatInteractionService,
    DciSearch,
    VilleService,
    AlldciService,
    AngularFireDatabase,
    Camera,
    File,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
