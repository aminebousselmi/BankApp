import {Injectable} from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class DashboardService {

    //-- ATTRIBUTS
    private tokeyKey = "token";
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR
    constructor(
        private http: HttpClient,
        private httpS:Http,
        private jwtHelper: JwtHelper
    ){}
    //-- END CONSTRUCTOR

    //-- METHODES

    GetSumTasks(idChefAgence){
        return this.httpS.get(`http://localhost:44365/api/GetSumTask/`+idChefAgence)
        .map(function (res) { return res.json(); });   
    }

    GetEmploye(idAgence){
        return this.httpS.get(`http://localhost:44365/api/EmployeControl/`+idAgence)
        .map(function (res) { return res.json(); });  
    }

    SetAccessOnlyUser(username){
        return this.httpS.get(`http://localhost:44365/api/SetAccessOnlyUser/`+username)
        .map(function (res) { return res.json(); });  
    }
       
    ControlEmployes() {
        return this.httpS.get(`http://localhost:44365/api/ControlEmployes/`)
        .map(function (res) { return res.json(); });
    }
       
    GetStatusEmploye() {
        return this.httpS.get(`http://localhost:44365/api/GetStatusEmploye/`)
        .map(function (res) { return res.json(); });
    }

    ControlEmployesCheck() {
        return this.httpS.get(`http://localhost:44365/api/ControlEmployesCheck/`)
        .map(function (res) { return res.json(); });
    }
       
    GetStatusEmployeCheck() {
        return this.httpS.get(`http://localhost:44365/api/GetStatusEmployeCheck/`)
        .map(function (res) { return res.json(); });
    }

    ControlEmployesNormalOperations() {
        return this.httpS.get(`http://localhost:44365/api/ControlEmployesNormalOperations/`)
        .map(function (res) { return res.json(); });
    }
       
    GetStatusEmployeNormalOperations() {
        return this.httpS.get(`http://localhost:44365/api/GetStatusEmployeNormalOperations/`)
        .map(function (res) { return res.json(); });
    }

    ControlEmployesCurrency() {
        return this.httpS.get(`http://localhost:44365/api/ControlEmployesCurrency/`)
        .map(function (res) { return res.json(); });
    }
       
    GetStatusEmployeCurrency() {
        return this.httpS.get(`http://localhost:44365/api/GetStatusEmployeCurrency/`)
        .map(function (res) { return res.json(); });
    }

     //-- SECURING API DATA
     public authGet$(url) {
        let header = this.initAuthHeaders();
        let options = { headers: header };
        return this.http.get<any>(url, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            catchError(this.handleError<any>("authGet")));
    }

    public authPost$(url: string, body: any) {
        let headers = this.initAuthHeaders();
        return this.http.post<any>(url, body, { headers: headers }).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            catchError(this.handleError("authPost"))
        )
    }

    private getLocalToken(): string {
        return sessionStorage.getItem(this.tokeyKey);
    }

    private initAuthHeaders(): HttpHeaders {
        let token = this.getLocalToken();
        if (token == null) throw "No token";

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set("Authorization", "Bearer " + token);
        return headers;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} error: ${error.message}`);
            return of(result as T);
        };
    }
    //-- END SECURING API DATA

    //-- END METHODES
}