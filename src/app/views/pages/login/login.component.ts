import { Component } from '@angular/core';
import { UsuarioOperador } from '../../../shared/models/usuario-operador.model';
import { LoginService } from '../../../services/app-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuarioOperador: UsuarioOperador = new UsuarioOperador();

  constructor(
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.validarForm()){      
      return;
    }

    this.loginService.login(this.usuarioOperador);        
  }

   //controlar validação do formulario
   validarForm() {
    var forms = document.querySelectorAll('.needs-validation');
    forms[0].classList.remove;

    if (this.usuarioOperador.chaveAcesso === undefined || this.usuarioOperador.senha === undefined) {

      //exibe a validação
      var forms = document.querySelectorAll('.needs-validation');
      forms[0].classList.add('was-validated');
      return false;
    } else {

      //limpa o form
      var forms = document.querySelectorAll('.needs-validation');
      forms[0].classList.remove('was-validated');
      return true;
    }
  }

}
