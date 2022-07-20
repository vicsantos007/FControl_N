import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Ramal } from '../../shared/models/ramal.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class RamalService {

  apiUrl = `${environment.API}Ramal`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }


  obter(): Observable<Ramal[]> {
    return this.httpClient.get<Ramal[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<Ramal> {
    return this.httpClient.get<Ramal>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(ramal: Ramal): Observable<Ramal[]> {
    return this.httpClient.post<Ramal[]>(this.apiUrl + '/Query', JSON.stringify(ramal), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(ramal: Ramal[]): Observable<Ramal> {
    return this.httpClient.post<Ramal>(this.apiUrl, JSON.stringify(ramal), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(ramal: Ramal): Observable<Ramal> {
    return this.httpClient.put<Ramal>(this.apiUrl, JSON.stringify(ramal), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(ramal: Ramal) {
    return this.httpClient.delete<Ramal>(this.apiUrl + '/' + ramal.idRamal, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

}
