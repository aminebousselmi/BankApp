import {Injectable} from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TaskBoardService {

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
    GetListEmploye(IdAgence){
        return this.authGet$("http://localhost:44365/api/GetEmployes/"+IdAgence);
    }

    ChangeEtat(IdTask,etat){
        return this.authGet$("http://localhost:44365/api/TransitionEtat/"+IdTask+"/"+etat);
    }

    AddTask(taskBoardDTO) {
        return this.authPost$(`http://localhost:44365/api/AddTaskManagement`,taskBoardDTO);
    }

    GetListBackLog(idChefAgence){
        return this.authGet$("http://localhost:44365/api/GetListTasksByChef/"+idChefAgence);
    }

    GetListTODO(idChefAgence){
        return this.authGet$("http://localhost:44365/api/GetListTasksTODO/"+idChefAgence);
    }

    GetListINPROCESS(idChefAgence){
        return this.authGet$("http://localhost:44365/api/GetListTasksINPROCESS/"+idChefAgence);
    }

    GetListDONE(idChefAgence){
        return this.authGet$("http://localhost:44365/api/GetListTasksDONE/"+idChefAgence);
    }
    AccountEdit( accountAdminDTO)
    {
        return this.authPost$(`http://localhost:44365/api/AccountEdit/`,accountAdminDTO)
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