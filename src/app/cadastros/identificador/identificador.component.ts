import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IdentificadorService } from '../../services/cadastro-service/identificador.service'
import { Identificador} from '../../shared/models/identificador.model';
import { TipoIdentificador} from '../../shared/models/tipo-Identificador.model';
import { GrupoDispositivoAcesso } from './../../shared/models/grupo-dispositivo-acesso.model';
import { IdentificadorPacote } from '../../shared/models/identificadorPacote.model';
import { UsuarioService } from 'src/app/services/cadastro-service/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { DatePipe } from '@angular/common';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilZoom, brandSet } from '@coreui/icons';
import { ValidacaoForms } from 'src/app/shared/util/validacao-forms-util';
import { OperadorAutenticado } from 'src/app/shared/util/operador-autenticado-util';
import { Empresa } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-identificador',
  templateUrl: './identificador.component.html',
  styleUrls: ['./identificador.component.scss']
})
export class IdentificadorComponent implements OnInit {

  constructor(
    private identificadorService: IdentificadorService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,    
    private datePipe: DatePipe,    
    private validacaoForms:ValidacaoForms,    
    private operadorAutenticado: OperadorAutenticado,
    public iconSet: IconSetService) { 
      iconSet.icons = { cilListNumbered, cilZoom, ...brandSet };
    }

    identificador = new Identificador();
    _identificador = new Identificador();
    filtroIdentificador = new Identificador();
    identificadores: Identificador[]=[];
    tiposIdentificador: TipoIdentificador[]=[];
    gruposAcesso: GrupoDispositivoAcesso[]=[];

    empresas: Empresa[]=[];

    usuario = new Usuario();
    filtro = new Usuario();    
    usuarios: Usuario[]=[];

    pag: number = 1;
    visibleModalDialogo: boolean = false;  
    visibleModal: boolean = false;
    idEmpresaOp: number = 0;

    //mensagem dialogo
    modalSubTituloMensagem: string = '';
    modalCorpoMensagem: string = '';

  ngOnInit() {
    if (this.operadorAutenticado.verificarToken()) {
      this.idEmpresaOp = +window.localStorage.getItem('idEmpresaOP')!;
    }

    var idEmpresa = 0;
    var idUsuario = '';

    idEmpresa = +window.localStorage.getItem('idEmpresaIdentificador')!;
    idUsuario = window.localStorage.getItem('idUsuarioIdentificador')!;
    
    if(idEmpresa > 0 && idUsuario != ''){
      //dados do usuário redirecionado
      this.identificador.idEmpresa = idEmpresa;
      this.identificador.idUsuario = idUsuario;

      //dados para filtro de pesquisa identificadores do usuario
      this.filtroIdentificador.idEmpresa = idEmpresa;
      this.filtroIdentificador.idUsuario = idUsuario; 
      this.obterIdentificadores();

      if(this.usuarios.length > 0){        
        this.identificadores = this.usuarios[0].identificadores;
      }
    }else{
      this.identificador.idEmpresa = this.idEmpresaOp;
      this.identificador.idUsuario = '';
    }
    
    this.ObterPacoteInicial();

    //reset itens 
    window.localStorage.removeItem('idEmpresaIdentificador');
    window.localStorage.removeItem('idUsuarioIdentificador');

  }

  private ObterPacoteInicial(){
    this.identificadorService.obterPacoteInicial(this.identificador).subscribe((_usuarioPacote: IdentificadorPacote) => {
      this.tiposIdentificador = _usuarioPacote.tiposIdentificador!;
      this.gruposAcesso = _usuarioPacote.gruposAcesso!;
      this.empresas = _usuarioPacote.empresas!;     
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }

  gravar(){
    if(this.usuario.idEmpresa == undefined){
      this.usuario.idEmpresa = this.idEmpresaOp;
    }     
    
    this.identificadorService.criar(this.identificadores).subscribe(
      (resp: any) => {//sucesso
        this.limparForm();
        this.toastr.success(resp); 
        this.identificadores = []; 
        this.identificador = new Identificador();       
      },
      (erro: any) => {//erro
        this.toastr.error(erro, 'Atenção!');
    });
  }

  obterIdentificadores(){
    this.identificadorService.obterPorFiltro(this.filtroIdentificador).subscribe((_identificadores: Identificador[] = []) => {
      this.identificadores = _identificadores;
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }

  verificarIdentificadorExistente() {
    if (this.validacaoForms.validarForm('identificador')) {

      //filtro de verificação
      this.filtroIdentificador.idEmpresa = this.identificador.idEmpresa;
      if (this.identificador.codigodeAcesso != undefined) {
        this.filtroIdentificador.codigodeAcesso = this.identificador.codigodeAcesso.padStart(11, '0');
      }

      this.identificadorService.obterPorFiltro(this.filtroIdentificador).subscribe((_identificadores: Identificador[] = []) => {
        debugger
        if (_identificadores != null) {
          if (_identificadores.length > 0) {
            this.modalSubTituloMensagem = 'Código de Acesso Indisponível';
            this.modalCorpoMensagem = 'O código de acesso já está associado ao usuário ' + _identificadores[0].idUsuario;
            this.visibleModalDialogo = !this.visibleModalDialogo;
          } else {
            this.incluirIdentificador();
          }
        }else{
          this.incluirIdentificador();
        }
      }, (erro: any) => {
        this.toastr.error(erro, 'Atenção!');
      });
    }
  }

  //limpar formulário
  limparForm() {
    var forms = document.querySelectorAll('.identificador');
    forms[0].classList.remove('was-validated');    

    this.identificador.idTipoIdentificador = 0;
    this.identificador.status = false;
    this.identificador.codigodeAcesso = undefined;
    this.identificador.idGrupo = 0;
    this.identificador.dataInicioPermissao = undefined;
    this.identificador.dataFimPermissao = undefined;

  }

  limparFormCompleto(){
    var forms = document.querySelectorAll('.identificador');
    forms[0].classList.remove('was-validated');    
    this.identificador = new Identificador();
    this.identificadores = [];
  }

  //limpar formulário modal
  limparFormModal() {
    this.filtro = new Usuario();
    this.usuarios = [];
  }

  obterUsuarioPorFiltro() {
    this.usuarioService.obterPorFiltro(this.filtro).subscribe((_usuarios: Usuario[] = []) => {
      this.usuarios = this.aplicarDescricaoUsuario(_usuarios);
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }

  aplicarDescricaoUsuario(usuarios: Usuario[]=[]){
    for (let i = 0; i < usuarios.length; i++) {
      usuarios[i].dataAdmissao = this.datePipe.transform(usuarios[i].dataAdmissao, 'yyyy-MM-dd')!;
      usuarios[i].dataDemissao = this.datePipe.transform(usuarios[i].dataDemissao, 'yyyy-MM-dd')!;
      usuarios[i].nomeEmpresa = this.aplicarDescricaoEmpresa(usuarios[i].idEmpresa);
    }
    return usuarios;
  }

  aplicarDescricaoTipoIdentificacao(id: number){  
    var descricao = this.tiposIdentificador.find(t => t.idTipoIdentificador == id)?.nome;
    return descricao;   
  }

  aplicarDescricaoGrupoAcessos(id: number){  
    var descricao = this.gruposAcesso.find(t => t.idGrupoDispositivoAcesso == id)?.nome;
    return descricao;   
  }

  aplicarDescricaoEmpresa(id: number){  
    var descricao = this.empresas.find(t => t.idEmpresa == id)?.nome;
    return descricao;   
  }

  incluirIdentificador(){
    //clone do objeto
    var identificador = JSON.parse(JSON.stringify(this.identificador));
    identificador.idEmpresa = this.idEmpresaOp;

    if( identificador.codigodeAcesso != undefined){
      identificador.codigodeAcesso = identificador.codigodeAcesso.padStart(11, '0');
    }
    
    if(this.identificadores == null){
      this.identificadores = [];
    }      

    if(this.identificadores.length > 0){
      var existe = this.identificadores.findIndex(e => e.idTipoIdentificador == identificador.idTipoIdentificador && e.codigodeAcesso == identificador.codigodeAcesso);
      if(existe != -1){
        //excluir item
        this.identificadores.splice(existe, 1);
        //incluir item novo          
        this.identificadores.push(identificador);
      }else{          
        //incluir item novo
        this.identificadores.push(identificador);
      }
    }else{
       //incluir item novo
      this.identificadores.push(identificador);
    }

    this.limparForm();
    this.identificador.idEmpresa = this.idEmpresaOp;
    this.identificador.idUsuario = this.usuario.idUsuario;
  }

  editar(identificador: Identificador) {
    this.identificador = identificador;
  }

  selecionarUsuarioTable(usuario: Usuario){
    this.limparForm();
    this.identificadores = [];
    this.identificadores = usuario.identificadores;
    this.usuario = usuario;  
    this.identificador.idEmpresa = this.idEmpresaOp;
    this.identificador.idUsuario = usuario.idUsuario;    
    this.identificadores = usuario.identificadores;
  }

}
