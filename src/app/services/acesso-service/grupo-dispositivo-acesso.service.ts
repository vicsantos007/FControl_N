import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { GrupoDispositivoAcesso } from '../../shared/models/grupo-dispositivo-acesso.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';


@Injectable({
  providedIn: 'root'
})
export class GrupoDispositivoAcessoService {

apiUrl = `${environment.API}GrupoDispositivoAcesso`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }
  
      
    obter(): Observable<GrupoDispositivoAcesso[]> {
      return this.httpClient.get<GrupoDispositivoAcesso[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<GrupoDispositivoAcesso> {
      return this.httpClient.get<GrupoDispositivoAcesso>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(grupoDispositivoAcesso: GrupoDispositivoAcesso): Observable<GrupoDispositivoAcesso[]> {
      return this.httpClient.post<GrupoDispositivoAcesso[]>(this.apiUrl + '/Query', JSON.stringify(grupoDispositivoAcesso), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(grupoDispositivoAcesso: GrupoDispositivoAcesso): Observable<GrupoDispositivoAcesso> {
      return this.httpClient.post<GrupoDispositivoAcesso>(this.apiUrl, JSON.stringify(grupoDispositivoAcesso), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(grupoDispositivoAcesso: GrupoDispositivoAcesso): Observable<GrupoDispositivoAcesso> {
      return this.httpClient.put<GrupoDispositivoAcesso>(this.apiUrl, JSON.stringify(grupoDispositivoAcesso), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(grupoDispositivoAcesso: GrupoDispositivoAcesso) {
      return this.httpClient.delete<GrupoDispositivoAcesso>(this.apiUrl + '/' + grupoDispositivoAcesso.idGrupoDispositivoAcesso, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 
}
