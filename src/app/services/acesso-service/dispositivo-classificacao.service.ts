import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { DispositivoClassificacao } from '../../shared/models/dispositivo-classificacao.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class DispositivoClassificacaoService {

  apiUrl = `${environment.API}DispositivoClassificacao`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<DispositivoClassificacao[]> {
    return this.httpClient.get<DispositivoClassificacao[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<DispositivoClassificacao> {
    return this.httpClient.get<DispositivoClassificacao>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(dispositivoClassificacao: DispositivoClassificacao): Observable<DispositivoClassificacao[]> {
    return this.httpClient.post<DispositivoClassificacao[]>(this.apiUrl + '/Query', JSON.stringify(dispositivoClassificacao), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(dispositivoClassificacao: DispositivoClassificacao): Observable<DispositivoClassificacao> {
    return this.httpClient.post<DispositivoClassificacao>(this.apiUrl, JSON.stringify(dispositivoClassificacao), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(dispositivoClassificacao: DispositivoClassificacao): Observable<DispositivoClassificacao> {
    return this.httpClient.put<DispositivoClassificacao>(this.apiUrl, JSON.stringify(dispositivoClassificacao), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(dispositivoClassificacao: DispositivoClassificacao) {
    return this.httpClient.delete<DispositivoClassificacao>(this.apiUrl + '/' + dispositivoClassificacao.idDispositivoClassificacao, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
}