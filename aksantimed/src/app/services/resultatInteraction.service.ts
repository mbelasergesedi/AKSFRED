import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

export interface User {
  code: string;
  mycode: string;
}
const CodeObject = {
  votrecode: '',
};
@Injectable()
// tslint:disable-next-line: class-name
export class ResultatInteractionService {
  baseURL = 'https://www.aksantimed.com/sms/remotepharma.cfc?';
  HttpClient: any;
  constructor(
    private http: HttpClient) { }
  getAllInteraction(code): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'method=' + 'findInteractionn' + '&med1=' + code);
    
  }
}
