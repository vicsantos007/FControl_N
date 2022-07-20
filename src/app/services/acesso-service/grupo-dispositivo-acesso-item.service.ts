import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { GrupoDispositivoAcessoItem } from '../../shared/models/grupo-dispositivo-acesso-item.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class GrupoDispositivoAcessoItemService {

apiUrl = `${environment.API}GrupoDispositivoAcessoItem`;
  
    constructor(
      private httpClient: HttpClient,
      private handleError: HandleError,
      private httpOptions: HttpOptions
      ) { }  
      
    obter(): Observable<GrupoDispositivoAcessoItem[]> {
      return this.httpClient.get<GrupoDispositivoAcessoItem[]>(this.apiUrl, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    obterPorId(id: number): Observable<GrupoDispositivoAcessoItem> {
      return this.httpClient.get<GrupoDispositivoAcessoItem>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError)
        )
    }

    obterPorFiltro(grupoDispositivoAcessoItem: GrupoDispositivoAcessoItem): Observable<GrupoDispositivoAcessoItem[]> {
      return this.httpClient.post<GrupoDispositivoAcessoItem[]>(this.apiUrl + '/Query', JSON.stringify(grupoDispositivoAcessoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(2),
          catchError(this.handleError.handleError))
    }
  
    criar(grupoDispositivoAcessoItem: GrupoDispositivoAcessoItem[]): Observable<GrupoDispositivoAcessoItem> {
      return this.httpClient.post<GrupoDispositivoAcessoItem>(this.apiUrl, JSON.stringify(grupoDispositivoAcessoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    }
    
    atualizar(grupoDispositivoAcessoItem: GrupoDispositivoAcessoItem): Observable<GrupoDispositivoAcessoItem> {
      return this.httpClient.put<GrupoDispositivoAcessoItem>(this.apiUrl, JSON.stringify(grupoDispositivoAcessoItem), this.httpOptions.dynamicHeader())
        .pipe(
          retry(0),
          catchError(this.handleError.handleError)
        )
    }
  
    deletar(grupoDispositivoAcessoItem: GrupoDispositivoAcessoItem) {
      return this.httpClient.delete<GrupoDispositivoAcessoItem>(this.apiUrl + '/' + grupoDispositivoAcessoItem.idGrupoDispositivoAcessoItem, this.httpOptions.dynamicHeader())
        .pipe(
          retry(1),
          catchError(this.handleError.handleError)
        )
    } 

}
