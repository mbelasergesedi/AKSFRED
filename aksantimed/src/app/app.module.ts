// Angular
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
// Environments
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
// Imported Plugin
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// Services
import { AlldciService } from './services/alldci.service';
import { DataService } from './services/item.service';
import { NotificationsService } from './tab1/notification.service';
import { ResultatVerificationService, User } from './services/verifcode.service';
import { AuthService } from './services/AuthService';
import { TextSearchService } from './services/textsearch.service';
import { ResultatInteractionService } from './services/resultatInteraction.service';
import { DciSearch } from './services/dci.service';
import { VilleService } from './services/city.service';
import { GaleniqueService } from './services/galenique.service';
import { AnatomiqueService } from './services/anatomique.service';
import { QryCustomerService } from './services/customers.service';
import { QryQuotationsService } from './services/quotation.services';
import { QryStatNotifs } from './tab1/statnotif.service';
import { ManageUsers } from './services/manageUsers.service';

// Captcha

import { QrySignalementService } from './services/signalement.service';
import { InteractionSearch } from './services/interaction.service';
import { InteractionComponent } from './tab3/interaction/interaction.component';
import { AuthenticateService } from './services/authentication.service';
import { SchoolsService } from './services/school.service';
import { QryInteractionService } from './services/Qryinteraction.service';
import { DentalService } from './dentiste/dental.service';
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FCM } from '@ionic-native/fcm/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule } from '@ionic/storage';

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
    IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    AuthService,
    GaleniqueService,
    DataService,
    AnatomiqueService,
    TextSearchService,
    NotificationsService,
    DentalService,
    QryCustomerService,
    QryStatNotifs,
    QryQuotationsService,
    Device,
    Geolocation,
    AuthenticateService,
    ManageUsers,
    ResultatVerificationService,
    SchoolsService,
    InteractionComponent,
    InteractionSearch,
    QryInteractionService,
    ResultatInteractionService,
    QrySignalementService,
    DciSearch,
    VilleService,
    AlldciService,
    UniqueDeviceID,
    AngularFireDatabase,
    FCM,
    Camera,
    File,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
