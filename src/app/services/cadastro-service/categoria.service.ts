import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Categoria } from '../../shared/models/categoria.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl = `${environment.API}Categoria`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(categoria: Categoria): Observable<Categoria[]> {
    return this.httpClient.post<Categoria[]>(this.apiUrl + '/Query', JSON.stringify(categoria), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.apiUrl, JSON.stringify(categoria), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.apiUrl, JSON.stringify(categoria), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(categoria: Categoria) {
    return this.httpClient.delete<Categoria>(this.apiUrl + '/' + categoria.idCategoria, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
}
