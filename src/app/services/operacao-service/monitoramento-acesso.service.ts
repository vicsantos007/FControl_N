import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { MonitoramentoAcessoModel } from '../../shared/models/monitoramento-acesso.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class MonitoramentoAcesso {

  apiUrl = `${environment.API}TransacoesDispositivos`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<MonitoramentoAcessoModel[]> {
    return this.httpClient.get<MonitoramentoAcessoModel[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<MonitoramentoAcessoModel> {
    return this.httpClient.get<MonitoramentoAcessoModel>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(monitoramentoAcesso: MonitoramentoAcessoModel): Observable<MonitoramentoAcessoModel[]> {
    return this.httpClient.post<MonitoramentoAcessoModel[]>(this.apiUrl + '/Query', JSON.stringify(monitoramentoAcesso), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(monitoramentoAcesso: MonitoramentoAcessoModel): Observable<MonitoramentoAcessoModel> {
    return this.httpClient.post<MonitoramentoAcessoModel>(this.apiUrl, JSON.stringify(monitoramentoAcesso), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(monitoramentoAcesso: MonitoramentoAcessoModel): Observable<MonitoramentoAcessoModel> {
    return this.httpClient.put<MonitoramentoAcessoModel>(this.apiUrl, JSON.stringify(monitoramentoAcesso), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(monitoramentoAcesso: MonitoramentoAcessoModel) {
    return this.httpClient.delete<MonitoramentoAcessoModel>(this.apiUrl + '/' + monitoramentoAcesso, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

}
