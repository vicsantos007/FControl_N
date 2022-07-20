import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { PeriodoAcessoPermitidoItem } from '../../shared/models/periodo-acesso-permitido-item.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class PeriodoAcessoPermitidoItemService {
  
  apiUrl = `${environment.API}PeriodoAcessoPermitidoItem`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }  
      
    obter(): Observable<PeriodoAcessoPermitidoItem[]> {
      return this.httpClient.get<PeriodoAcessoPermitidoItem[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<PeriodoAcessoPermitidoItem> {
      return this.httpClient.get<PeriodoAcessoPermitidoItem>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(periodoAcessoPermitidoItem: PeriodoAcessoPermitidoItem): Observable<PeriodoAcessoPermitidoItem[]> {
      return this.httpClient.post<PeriodoAcessoPermitidoItem[]>(this.apiUrl + '/Query', JSON.stringify(periodoAcessoPermitidoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(periodoAcessoPermitidoItem: PeriodoAcessoPermitidoItem[]): Observable<PeriodoAcessoPermitidoItem> {
      return this.httpClient.post<PeriodoAcessoPermitidoItem>(this.apiUrl, JSON.stringify(periodoAcessoPermitidoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(periodoAcessoPermitidoItem: PeriodoAcessoPermitidoItem): Observable<PeriodoAcessoPermitidoItem> {
      return this.httpClient.put<PeriodoAcessoPermitidoItem>(this.apiUrl, JSON.stringify(periodoAcessoPermitidoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(periodoAcessoPermitidoItem: PeriodoAcessoPermitidoItem) {
      return this.httpClient.delete<PeriodoAcessoPermitidoItem>(this.apiUrl + '/' + periodoAcessoPermitidoItem.idPeriodoAcessoPermitidoItem, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 

}
