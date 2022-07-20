import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Setor } from '../../shared/models/setor.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  apiUrl = `${environment.API}Setor`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<Setor[]> {
    return this.httpClient.get<Setor[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<Setor> {
    return this.httpClient.get<Setor>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(setor: Setor): Observable<Setor[]> {
    return this.httpClient.post<Setor[]>(this.apiUrl + '/Query', JSON.stringify(setor), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(setor: Setor): Observable<Setor> {
    return this.httpClient.post<Setor>(this.apiUrl, JSON.stringify(setor), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(setor: Setor): Observable<Setor> {
    return this.httpClient.put<Setor>(this.apiUrl, JSON.stringify(setor), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(setor: Setor) {
    return this.httpClient.delete<Setor>(this.apiUrl + '/' + setor.idSetor, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

}
