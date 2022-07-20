import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { Empresa } from '../../shared/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = `${environment.API}Empresa`;

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private router: Router) { }  



  obterEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.apiUrl, this.httpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  obterPorId(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.apiUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  criar(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.apiUrl, JSON.stringify(empresa), this.httpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  atualizar(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.put<Empresa>(this.apiUrl, JSON.stringify(empresa), this.httpOptions())
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  deletar(empresa: Empresa) {
    return this.httpClient.delete<Empresa>(this.apiUrl + '/' + empresa.idEmpresa, this.httpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let erroMessage = '';
    let descricaoErroServidor = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      erroMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      descricaoErroServidor = `Origem : ${error.message}. Erro do Servidor: ${error.status} - ${error.error}.`;
     
      if(error.status === 0){
        erroMessage = 'Não foi possível concluir a sua solicitação. Entre em contato com o administrador do sistema ou tente novamente em alguns instantes.';
        console.log(descricaoErroServidor);
      }

      if(error.status === 400){
        erroMessage = error.error;
        console.log(descricaoErroServidor);
      }

      if(error.status === 500){
        erroMessage = 'Ocorreu algo inesperado no servidor do sistema. Entre em contato com o administrador do sistema ou tente novamente em alguns instantes..';
        console.log(descricaoErroServidor);
      }
    }    
    return throwError(erroMessage);
  };

  //httpOptions headers
  protected getToken(): string {
    const token = this.cookieService.get('aut');
    if (token != null && token.length > 0 && token != '') {
      return token;       
    }else{
      this.router.navigate(['/login']);
      return null;      
    }
  }
  protected httpOptions() {
    return {headers: this.hasToken() ? this.securityHeaders() : this.headers()};
  }
  protected hasToken(): boolean {
    const jwt = this.getToken();
    return jwt != null;
  }
  protected securityHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
  protected headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
}