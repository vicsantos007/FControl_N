
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { TipoDocumento } from '../../shared/models/tipo-documento.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  apiUrl = `${environment.API}TipoDocumento`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<TipoDocumento> {
    return this.httpClient.get<TipoDocumento>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(tipoDocumento: TipoDocumento): Observable<TipoDocumento[]> {
    return this.httpClient.post<TipoDocumento[]>(this.apiUrl + '/Query', JSON.stringify(tipoDocumento), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
    return this.httpClient.post<TipoDocumento>(this.apiUrl, JSON.stringify(tipoDocumento), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
    return this.httpClient.put<TipoDocumento>(this.apiUrl, JSON.stringify(tipoDocumento), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(tipoDocumento: TipoDocumento) {
    return this.httpClient.delete<TipoDocumento>(this.apiUrl + '/' + tipoDocumento.idTipoDocumento, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
}
