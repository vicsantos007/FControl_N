import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GestorEmpresa } from '../../shared/models/gestor-empresa.model';
import { HandleError } from '../../shared/util/handleError.util';
import { HttpOptions } from '../../shared/util/http-options.util';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorEmpresaService {

  apiUrl = `${environment.API}GestorEmpresa`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions    
    ) {  }


  obterGestorEmpresas(): Observable<GestorEmpresa[]> {
    return this.httpClient.get<GestorEmpresa[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<GestorEmpresa> {
    return this.httpClient.get<GestorEmpresa>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  criar(gestorEmpresa: GestorEmpresa): Observable<GestorEmpresa> {
    return this.httpClient.post<GestorEmpresa>(this.apiUrl, JSON.stringify(gestorEmpresa), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
  
  atualizar(gestorEmpresa: GestorEmpresa): Observable<GestorEmpresa> {
    return this.httpClient.put<GestorEmpresa>(this.apiUrl, JSON.stringify(gestorEmpresa), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(gestorEmpresa: GestorEmpresa) {
    debugger
    return this.httpClient.delete<GestorEmpresa>(this.apiUrl + '/' + gestorEmpresa.idGestorEmpresa, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
}
