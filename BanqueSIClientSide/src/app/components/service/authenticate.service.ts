import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, CanActivate } from '@angular/router';
import  {Http,HttpModule} from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { AuthBearer } from './AuthBearerInterface';

@Injectable()
export class AuthenticateService implements CanActivate {
    private tokeyKey = "token";

    constructor(private http: HttpClient, private router: Router,private jwtHelper: JwtHelper) { }

    public canActivate() {
        if (this.checkLogin()) {

            return true;
        } else {
            console.log("oke 2 ");
            this.router.navigate(['']);
            return false;
        }
    }
    

    public login$(userName: string, password: string) {
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        let body = JSON.stringify({ "Email": userName, "Password": password });
        let options = { headers: header };
        return this.http.post<AuthBearer>("https://localhost:44315/login", body, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(
                res => {
                    let result = res;
                    sessionStorage.setItem(this.tokeyKey, result.auth_token);
                    sessionStorage.setItem("idUser", result.id);
                    this.router.navigate(["stb/dashboard"]);
                    return result;
                }
            ),

            catchError(
                this.handleError<AuthBearer>("login")
            )
        )
    }

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

    public getUserInfo$(id){
        return this.authGet$("https://localhost:44315/api/userInfo/"+id);
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
