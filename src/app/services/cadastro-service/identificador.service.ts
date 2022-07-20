import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IdentificadorPacote } from 'src/app/shared/models/identificadorPacote.model';
import { environment } from '../../../environments/environment.prod';
import { Identificador } from '../../shared/models/identificador.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class IdentificadorService {

  apiUrl = `${environment.API}Identificador`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }


  obter(): Observable<Identificador[]> {
    return this.httpClient.get<Identificador[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<Identificador> {
    return this.httpClient.get<Identificador>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(identificador: Identificador): Observable<Identificador[]> {
    return this.httpClient.post<Identificador[]>(this.apiUrl + '/Query', JSON.stringify(identificador), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(identificador: Identificador[]): Observable<Identificador> {
    return this.httpClient.post<Identificador>(this.apiUrl, JSON.stringify(identificador), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(identificador: Identificador): Observable<Identificador> {
    return this.httpClient.put<Identificador>(this.apiUrl, JSON.stringify(identificador), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(identificador: Identificador) {
    return this.httpClient.delete<Identificador>(this.apiUrl + '/' + identificador.idIdentificador, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  obterPacoteInicial(identificador: Identificador): Observable<IdentificadorPacote> {
    return this.httpClient.post<IdentificadorPacote>(this.apiUrl+ '/Pack', JSON.stringify(identificador), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }
}
