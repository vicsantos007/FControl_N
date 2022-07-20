import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Dispositivo } from '../../shared/models/dispositivo.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

apiUrl = `${environment.API}Dispositivo`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }
  
      
    obter(): Observable<Dispositivo[]> {
      return this.httpClient.get<Dispositivo[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<Dispositivo> {
      return this.httpClient.get<Dispositivo>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }
  
    criar(dispositivo: Dispositivo): Observable<Dispositivo> {
      return this.httpClient.post<Dispositivo>(this.apiUrl, JSON.stringify(dispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(dispositivo: Dispositivo): Observable<Dispositivo[]> {
      return this.httpClient.post<Dispositivo[]>(this.apiUrl + '/Query', JSON.stringify(dispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
    
    atualizar(dispositivo: Dispositivo): Observable<Dispositivo> {
      return this.httpClient.put<Dispositivo>(this.apiUrl, JSON.stringify(dispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(dispositivo: Dispositivo) {
      return this.httpClient.delete<Dispositivo>(this.apiUrl + '/' + dispositivo.idDispositivo, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 
}
