import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Classificacao } from '../../shared/models/classificacao.model';
import { environment } from '../../../environments/environment.prod';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoService {

apiUrl = `${environment.API}Classificacao`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }
  
      
    obter(): Observable<Classificacao[]> {
      return this.httpClient.get<Classificacao[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<Classificacao> {
      return this.httpClient.get<Classificacao>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(classificacao: Classificacao): Observable<Classificacao[]> {
      return this.httpClient.post<Classificacao[]>(this.apiUrl + '/Query', JSON.stringify(classificacao), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(classificacao: Classificacao): Observable<Classificacao> {
      return this.httpClient.post<Classificacao>(this.apiUrl, JSON.stringify(classificacao), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(classificacao: Classificacao): Observable<Classificacao> {
      return this.httpClient.put<Classificacao>(this.apiUrl, JSON.stringify(classificacao), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(classificacao: Classificacao) {
      return this.httpClient.delete<Classificacao>(this.apiUrl + '/' + classificacao.idClassificacao, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 
}
