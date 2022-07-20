import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { TipoIdentificador } from '../../shared/models/tipo-Identificador.model';
import { HandleError } from '../../shared/util/handleError.util';
import { HttpOptions } from '../../shared/util/http-options.util';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificadorService {

apiUrl = `${environment.API}TipoIdentificador`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }  
      
    obter(): Observable<TipoIdentificador[]> {
      return this.httpClient.get<TipoIdentificador[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<TipoIdentificador> {
      return this.httpClient.get<TipoIdentificador>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(tipoIdentificador: TipoIdentificador): Observable<TipoIdentificador[]> {
      return this.httpClient.post<TipoIdentificador[]>(this.apiUrl + '/Query', JSON.stringify(tipoIdentificador), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(tipoIdentificador: TipoIdentificador): Observable<TipoIdentificador> {
      return this.httpClient.post<TipoIdentificador>(this.apiUrl, JSON.stringify(tipoIdentificador), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(tipoIdentificador: TipoIdentificador): Observable<TipoIdentificador> {
      return this.httpClient.put<TipoIdentificador>(this.apiUrl, JSON.stringify(tipoIdentificador), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(tipoIdentificador: TipoIdentificador) {
      return this.httpClient.delete<TipoIdentificador>(this.apiUrl + '/' + tipoIdentificador.idTipoIdentificador, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
}