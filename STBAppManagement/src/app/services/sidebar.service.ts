import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router} from '@angular/router';
import  {Http,HttpModule} from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { AuthBearer } from './AuthBearerInterface';

@Injectable()
export class SidebarService {
    private tokeyKey = "token";

    constructor(private http: HttpClient, private router: Router,private jwtHelper: JwtHelper) { }

    public authGet$(url) {
        let header = this.initAuthHeaders();
        let options = { headers: header };
        return this.http.get<any>(url, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            catchError(this.handleError<any>("authGet")));
    }

    public checkLogin(): boolean {
        let token = sessionStorage.getItem(this.tokeyKey);
        return !this.jwtHelper.isTokenExpired(token)
    }

    public getUsernameInfo$() {
        return this.authGet$("http://localhost:44365/api/username");
    }

    public getUserInfo$(username){
        return this.authGet$("http://localhost:44365/api/userInfoAdmin/"+username);
    }

    public authPost$(url: string, body: any) {
        let headers = this.initAuthHeaders();

        return this.http.post(url, body, { headers: headers }).pipe(
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
}
