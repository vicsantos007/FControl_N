import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Usuario } from '../../shared/models/usuario.model';
import { HandleError } from '../../shared/util/handleError-util';
import { HttpOptions } from '../../shared/util/http-options-util';
import { UsuarioPacote } from '../../shared/models/usuarioPacote.model'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = `${environment.API}Usuario`;

  constructor(
    private httpClient: HttpClient,
    private handleError: HandleError,
    private httpOptions: HttpOptions
  ) { }

  obter(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  obterPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.apiUrl + '/' + id, this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }

  obterPorFiltro(usuario: Usuario): Observable<Usuario[]> {
    return this.httpClient.post<Usuario[]>(this.apiUrl + '/Query', JSON.stringify(usuario), this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError))
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiUrl, JSON.stringify(usuario), this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.apiUrl, JSON.stringify(usuario), this.httpOptions.dynamicHeader())
      .pipe(
        retry(0),
        catchError(this.handleError.handleError)
      )
  }

  deletar(usuario: Usuario) {
    return this.httpClient.delete<Usuario>(this.apiUrl + '/' + usuario.idUsuario, this.httpOptions.dynamicHeader())
      .pipe(
        retry(1),
        catchError(this.handleError.handleError)
      )
  }

  obterPacoteInicial(): Observable<UsuarioPacote> {
    return this.httpClient.get<UsuarioPacote>(this.apiUrl+ '/Pack', this.httpOptions.dynamicHeader())
      .pipe(
        retry(2),
        catchError(this.handleError.handleError)
      )
  }
}
