import {Injectable} from '@angular/core';
import { Http, Response, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class EmailService {

    private tokeyKey = "token";
    
    constructor(private http: HttpClient,private jwtHelper: JwtHelper){
    }

    DeleteEmail(idEmail){
        return this.authGet$(`http://localhost:44365/api/DeleteEmail/`+idEmail)  
    }

    GetStatisticalMail(idEmploye){
        return this.authGet$(`http://localhost:44365/api/MailStatisticalMail/`+idEmploye)
    }

    SetEmailReaden(idEmail){
        return this.authGet$(`http://localhost:44365/api/ReadenMail/`+idEmail)
    }
    GetEmailDraftList(From,idPersonne){
        return this.authGet$(`http://localhost:44365/api/GetEmailDraftList/`+From+"/"+idPersonne)
    }

    DraftEmail(body){
        return this.authPost$(`http://localhost:44365/api/DraftEmail`,body);
    }

    DeleteEmailSpam(idEmail){
        return this.authGet$(`http://localhost:44365/api/DeleteEmailSpam/`+idEmail)
    }

    GetEmailDeletedList(idPersonne){
        return this.authGet$(`http://localhost:44365/api/GetEmailDeletedList/`+idPersonne)
    }

    GetEmailList(To,idPersonne) {
        return this.authGet$(`http://localhost:44365/api/ListEmail/`+To+"/"+idPersonne)
    }

    GetEmailSentList(From,idPersonne) {
        return this.authGet$(`http://localhost:44365/api/ListEmailFrom/`+From+"/"+idPersonne)
    }

    SentEmail(body){
        return this.authPost$(`http://localhost:44365/api/SentEmail`,body);
    }

    SendingDraftEmail(body){
        return this.authPost$(`http://localhost:44365/api/SendingDraftEmail`,body)
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
    //-- END SECUTING API DATA
}