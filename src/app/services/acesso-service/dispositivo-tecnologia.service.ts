import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { TecnologiaDispositivo } from '../../shared/models/tecnologia-dispositivo.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class DispositivoTecnologiaService {

apiUrl = `${environment.API}TecnologiaDispositivo`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }
  
      
    obter(): Observable<TecnologiaDispositivo[]> {
      return this.httpClient.get<TecnologiaDispositivo[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<TecnologiaDispositivo> {
      return this.httpClient.get<TecnologiaDispositivo>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(tecnologiaDispositivo: TecnologiaDispositivo): Observable<TecnologiaDispositivo[]> {
      return this.httpClient.post<TecnologiaDispositivo[]>(this.apiUrl + '/Query', JSON.stringify(tecnologiaDispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(tecnologiaDispositivo: TecnologiaDispositivo): Observable<TecnologiaDispositivo> {
      return this.httpClient.post<TecnologiaDispositivo>(this.apiUrl, JSON.stringify(tecnologiaDispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(tecnologiaDispositivo: TecnologiaDispositivo): Observable<TecnologiaDispositivo> {
      return this.httpClient.put<TecnologiaDispositivo>(this.apiUrl, JSON.stringify(tecnologiaDispositivo), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(tecnologiaDispositivo: TecnologiaDispositivo) {
      return this.httpClient.delete<TecnologiaDispositivo>(this.apiUrl + '/' + tecnologiaDispositivo.idTecnologiaDispositivo, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 

}
