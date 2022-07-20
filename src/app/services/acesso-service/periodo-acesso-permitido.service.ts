import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { PeriodoAcessoPermitido } from '../../shared/models/periodo-acesso-permitido.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class PeriodoAcessoPermitidoService {

  apiUrl = `${environment.API}PeriodoAcessoPermitido`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions) { }
  
      
    obter(): Observable<PeriodoAcessoPermitido[]> {
      return this.httpClient.get<PeriodoAcessoPermitido[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<PeriodoAcessoPermitido> {
      return this.httpClient.get<PeriodoAcessoPermitido>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(periodoAcessoPermitido: PeriodoAcessoPermitido): Observable<PeriodoAcessoPermitido[]> {
      return this.httpClient.post<PeriodoAcessoPermitido[]>(this.apiUrl + '/Query', JSON.stringify(periodoAcessoPermitido), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(periodoAcessoPermitido: PeriodoAcessoPermitido): Observable<PeriodoAcessoPermitido> {
      return this.httpClient.post<PeriodoAcessoPermitido>(this.apiUrl, JSON.stringify(periodoAcessoPermitido), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(periodoAcessoPermitido: PeriodoAcessoPermitido): Observable<PeriodoAcessoPermitido> {
      return this.httpClient.put<PeriodoAcessoPermitido>(this.apiUrl, JSON.stringify(periodoAcessoPermitido), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(periodoAcessoPermitido: PeriodoAcessoPermitido) {
      return this.httpClient.delete<PeriodoAcessoPermitido>(this.apiUrl + '/' + periodoAcessoPermitido.idPeriodoAcessoPermitido, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 
}

