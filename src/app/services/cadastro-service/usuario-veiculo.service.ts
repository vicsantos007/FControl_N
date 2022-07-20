import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { UsuarioVeiculo } from '../../shared/models/usuario-veiculo.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioVeiculoService {

  apiUrl = `${environment.API}UsuarioVeiculo`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<UsuarioVeiculo[]> {
    return this.httpClient.get<UsuarioVeiculo[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(placa: string): Observable<UsuarioVeiculo> {
    return this.httpClient.get<UsuarioVeiculo>(this.apiUrl + '/' + placa, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(usuarioVeiculo: UsuarioVeiculo): Observable<UsuarioVeiculo[]> {

    return this.httpClient.post<UsuarioVeiculo[]>(this.apiUrl + '/Query', JSON.stringify(usuarioVeiculo), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(usuarioVeiculo: UsuarioVeiculo[]): Observable<UsuarioVeiculo> {
    return this.httpClient.post<UsuarioVeiculo>(this.apiUrl, JSON.stringify(usuarioVeiculo), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(usuarioVeiculo: UsuarioVeiculo): Observable<UsuarioVeiculo> {
    return this.httpClient.put<UsuarioVeiculo>(this.apiUrl, JSON.stringify(usuarioVeiculo), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(usuarioVeiculo: UsuarioVeiculo) {
    return this.httpClient.delete<UsuarioVeiculo>(this.apiUrl + '/' + usuarioVeiculo.idVeiculo, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }
}
