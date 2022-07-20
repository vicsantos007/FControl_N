import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';
import { Operador } from '../../shared/models/operador.model';
import { UsuarioOperador } from '../../shared/models/usuario-operador.model';
import { OperadorService } from '../cadastro-service/operador.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = `${environment.API}Login`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  mostrarMenu = new EventEmitter<boolean>();
  operadores: Operador[] = [];
  operador = new Operador();

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private operadorService: OperadorService
  ) { }

  login(usuarioOperador: UsuarioOperador) {
    this.httpClient.post(this.apiUrl, usuarioOperador, this.httpOptions)
      .subscribe(data => {

        //gravar token no cookie
        var token = data.toString();
        this.cookieService.set('aut', token);

        //obter dados do operador
        this.operador.chaveAcesso = usuarioOperador.chaveAcesso;
        this.operadorService.obterPorFiltro(this.operador).subscribe((operadores: Operador[]) => {          
        this.operadores = operadores;

          //gravar dados do operador no cookie
          //variáveis com posibilidade de ser null
          this.operadores[0].idEmpresa = this.operadores[0].idEmpresa!;
          this.operadores[0].idUsuario = this.operadores[0].idUsuario!;
          this.operadores[0].nome = this.operadores[0].nome!;
          this.operadores[0].foto = this.operadores[0].foto!;

          if (this.operadores.length > 0) {
            window.localStorage.setItem('idEmpresaOP', this.operadores[0].idEmpresa.toString());
            window.localStorage.setItem('idUsuarioOP', this.operadores[0].idUsuario.toString());
            window.localStorage.setItem('nomeOP', this.operadores[0].nome.toString());
            window.localStorage.setItem('fotoOP', this.operadores[0].foto.toString());
          }

          this.router.navigate(['/dashboard']);

        }, (erro: any) => {
          this.toastr.error(erro, 'Atenção!');
        });
      },
        e => {
          this.toastr.error(e.error, 'Atenção');
          console.log(e.error);
        })
  }

  logout() {

    //limpar dados do navegador
    this.cookieService.deleteAll();
    window.sessionStorage.clear();
    window.localStorage.clear();

    this.mostrarMenu.emit(false);
    this.router.navigate(['/login']);
  }
}
