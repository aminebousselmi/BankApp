import {Injectable} from '@angular/core';
import { Http, Response, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class OperationService {
    private tokeyKey = "token";

    constructor(private http: HttpClient,private jwtHelper: JwtHelper){}

    //-- VERSEMENT - RETRAIT - VIREMENT
    Versement(code,montant,codeEmp,IdAgence) {
      return this.authGet$(`http://localhost:44365/api/Verser/`+code+'/'+montant+'/'+codeEmp+'/'+IdAgence)
    }

    Retrait(code,montant,codeEmp,IdAgence) {
      return this.authGet$(`http://localhost:44365/api/Retier/`+code+'/'+montant+'/'+codeEmp+'/'+IdAgence)
    }

    Virement(cp1,cp2,montant,codeEmp,IdAgence) {
      return this.authGet$(`http://localhost:44365/api/Virement/`+cp1+'/'+cp2+'/'+montant+'/'+codeEmp+'/'+IdAgence)
    }

    //-- END VERSEMENT - RETRAIT - VIREMENT

    //-- STATISTICAL OPERATIONS
    GetCountOperationsByEmploye(codeEmp) {
      return this.authGet$(`http://localhost:44365/api/GetCountOperationsByEmploye/`+codeEmp)
    }

    GetCountTransferByEmploye(codeEmp) {
      return this.authGet$(`http://localhost:44365/api/GetCountTransferByEmploye/`+codeEmp)
    }

    GetLatestTransferByEmploye(codeEmp) {
      return this.authGet$(`http://localhost:44365/api/GetLatestTransactionByEmploye/`+codeEmp)
    }

    GetActiveAccount() {
      return this.authGet$(`http://localhost:44365/api/GetCountActiveAccount`)
    }

    //-- END STATISTICAL OPERATIONS

    //-- SECURING API DATA
    public authGet$(url) {
          let header = this.initAuthHeaders();
          let options = { headers: header };
          return this.http.get<any>(url, options).pipe(
              debounceTime(200),
              distinctUntilChanged(),
              catchError(this.handleError<any>("authGet")));
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