import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

export interface User {
  code: string;
  latitude: string;
  longitude: string;
  deviceid: string;
  cordonnees: string;
  simid: string;
  roaming: string;
  mycode: string;
}
const CodeObject = {
  votrecode: '',
};
@Injectable()
// tslint:disable-next-line: class-name
export class ResultatVerificationService {


  baseURL = 'https://www.aksantimed.com/ionic/remotepharma.cfc?';
  HttpClient: any;
  constructor(

    private http: HttpClient) { }
  getResponse(code, cordonnees): Observable<User[]> {
    return this.http.get<User[]>
      (this.baseURL + 'method=' + 'choosepharma' + '&medcode=' + code + '&coordonees=' + cordonnees );

  }
}
//medcode:medcode,latitude:latitude,phoneNumber:phoneNumber,deviceid:deviceid