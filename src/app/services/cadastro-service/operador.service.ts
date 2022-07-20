import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Operador } from '../../shared/models/operador.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  
    apiUrl = `${environment.API}Operador`;
    
      constructor(private cookieService: CookieService,
        private httpClient: HttpClient,
        private router: Router,
        private handleError: HandleError,
        private httpOptions: HttpOptions) { }
    
        
      obter(): Observable<Operador[]> {
        return this.httpClient.get<Operador[]>(this.apiUrl, this.httpOptions.dynamicHeader())
          .pipe(
            retry(2),
            catchError(this.handleError.handleError))
      }
    
      obterPorId(id: number): Observable<Operador> {
        return this.httpClient.get<Operador>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
          .pipe(
            retry(2),
            catchError(this.handleError.handleError)
          )
      }

      obterPorFiltro(operador: Operador): Observable<Operador[]> {
        return this.httpClient.post<Operador[]>(this.apiUrl + '/Query', JSON.stringify(operador), this.httpOptions.dynamicHeader())
          .pipe(
            retry(2),
            catchError(this.handleError.handleError))
      }
    
      criar(operador: Operador): Observable<Operador> {
        return this.httpClient.post<Operador>(this.apiUrl, JSON.stringify(operador), this.httpOptions.dynamicHeader())
          .pipe(
            retry(1),
            catchError(this.handleError.handleError)
          )
      }
      
      atualizar(operador: Operador): Observable<Operador> {
        return this.httpClient.put<Operador>(this.apiUrl + '/atualizar', JSON.stringify(operador), this.httpOptions.dynamicHeader())
          .pipe(
            retry(0),
            catchError(this.handleError.handleError)
          )
      }
    
      deletar(operador: Operador) {
        return this.httpClient.delete<Operador>(this.apiUrl + '/' + operador.idOperador, this.httpOptions.dynamicHeader())
          .pipe(
            retry(1),
            catchError(this.handleError.handleError)
          )
      } 
}
