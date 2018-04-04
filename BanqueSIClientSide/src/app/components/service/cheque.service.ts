import {Injectable} from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ChequeService {

    constructor(private http: HttpClient,
                private jwtHelper: JwtHelper
                ){}
    
    //-- VERSEMENT CHEQUE
    VersementCheque(body) {
        return this.authPost$(`http://localhost:44365/api/VersementCheque`,body);
    }
    //-- END VERSEMENT CHEQUE

    //-- GET LIST ACCOUNT BY AGENCY
    GetListAccountByAgency(idAgence) {
        return this.authGet$(`http://localhost:44365/api/GetListAccountByAgency/`+idAgence);
    }
    //-- END GET LIST ACCOUNT BY AGENCY

    //-- GET LIST CHECK BY PERSON
    GetListCheckByPerson(idEmploye) {
        return this.authGet$(`http://localhost:44365/api/GetListCheckByEmploye/`+idEmploye);
    }
    //-- END GET LIST CHECK BY PERSON

    //-- GET STATISTICAL CHECK FOR CHART
    GetStatisticalCheckChart(idEmploye) {
        return this.authGet$(`http://localhost:44365/api/GetStatisticalCheckOperationsByEmploye/`+idEmploye);
    }
    //-- END GET STATISTICAL CHECK FOR CHART

    //-- GET STATISTICAL CHECK LINE
    GetStatisticalCheckLine(idEmploye) {
        return this.authGet$(`http://localhost:44365/api/GetStatisticalLineCheckByEmploye/`+idEmploye);
    }
    //-- END GET STATISTICAL CHECK LINE

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
        return sessionStorage.getItem("token");
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
}