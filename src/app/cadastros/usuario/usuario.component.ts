import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/cadastro-service/usuario.service'
import { ToastrService } from 'ngx-toastr';
import { Usuario } from './../../shared/models/usuario.model';
import { TipoDocumento } from './../../shared/models/tipo-documento.model';
import { Classificacao } from './../../shared/models/classificacao.model';
import { Categoria } from './../../shared/models/categoria.model';
import { Setor } from './../../shared/models/setor.model';
import { Ramal } from './../../shared/models/ramal.model';
import { Empresa } from './../../shared/models/empresa.model';
import { PeriodoAcessoPermitido } from './../../shared/models/periodo-acesso-permitido.model';
import { UsuarioPacote } from 'src/app/shared/models/usuarioPacote.model';
import { OperadorAutenticado } from '../../shared/util/operador-autenticado-util';
import { ValidacaoForms } from '../../shared/util/validacao-forms-util';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilZoom, brandSet } from '@coreui/icons';
import { DatePipe } from '@angular/common';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private operadorAutenticado: OperadorAutenticado,
    private validacaoForms:ValidacaoForms,
    public iconSet: IconSetService,
    private datePipe: DatePipe,
    private router: Router
  ) { 
    iconSet.icons = { cilListNumbered, cilZoom, ...brandSet };
  }
  pag: number = 1;
  visibleModal: boolean = false;
  visibleModalIdentificador: boolean = false;
  visibleModalDialogo: boolean = false;
  visibleModalFoto: boolean = false;
  finalizarcadastro: boolean = false;

  usuario = new Usuario();
  filtro = new Usuario();
  usuarios: Usuario[]=[];
  
  //recp pacote
  empresas: Empresa[]=[];
  documentos: TipoDocumento[]=[];
  classificacoes:Classificacao[]=[];
  categorias: Categoria[]=[];
  setores: Setor[]=[];
  ramais: Ramal[]=[];
  periodosdeAcesso: PeriodoAcessoPermitido[]=[];

  idEmpresaOp: number = 0;
  idOperador: string = '';
  nomeOperador: string = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  ngOnInit() {
    if (this.operadorAutenticado.verificarToken()) {
      this.idEmpresaOp = +window.localStorage.getItem('idEmpresaOP')!;
      this.idOperador = window.localStorage.getItem('idUsuarioOP')!;
      this.nomeOperador = window.localStorage.getItem('nomeOP')!;    
    }
    this.ObterPacoteInicial();
  }

  private ObterPacoteInicial(){
    this.usuarioService.obterPacoteInicial().subscribe((_usuarioPacote: UsuarioPacote) => {
      this.empresas = _usuarioPacote.empresas!;
      this.documentos = _usuarioPacote.documentos!;
      this.classificacoes = _usuarioPacote.classificacoes!;
      this.categorias = _usuarioPacote.categorias!;
      this.setores = _usuarioPacote.setores!;
      this.ramais = _usuarioPacote.ramais!;
      this.periodosdeAcesso = _usuarioPacote.periodosdeAcesso!;
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }  

  gravar(){
    if(this.validacaoForms.validarForm('usuario')){

      if(this.usuario.idEmpresa == undefined){
        this.usuario.idEmpresa = this.idEmpresaOp;
      }   
      
      //info operador
      this.usuario.idOperador =  this.idOperador;
      this.usuario.nomeOperador =  this.nomeOperador;
      
      this.usuarioService.criar(this.usuario).subscribe(
        (resp: any) => {//sucesso
          this.visibleModalDialogo = !this.visibleModalDialogo;
          this.limparForm();
          this.toastr.success(resp.mensagem);         
        },
        (erro: any) => {//erro
          this.toastr.error(erro, 'Atenção!');
      });

    }else{
      return;
    }
  } 

  obterPorFiltro() {
    this.usuarioService.obterPorFiltro(this.filtro).subscribe((_usuarios: Usuario[] = []) => {
      this.usuarios = this.aplicarDescricao(_usuarios);
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }

  aplicarDescricao(usuarios: Usuario[]=[]){
    for (let i = 0; i < usuarios.length; i++) {      
      usuarios[i].nomeEmpresa = this.empresas.find(e => e.idEmpresa = usuarios[i].idEmpresa)?.nome;
      usuarios[i].nomeCategoria = this.categorias.find(e => e.idCategoria = usuarios[i].idCategoria)?.nome;
      usuarios[i].nomeClassificacao = this.classificacoes.find(e => e.idClassificacao = usuarios[i].idClassificacao)?.nome;
      usuarios[i].nomeSetor = this.setores.find(e => e.idSetor = usuarios[i].idSetor)?.nome;
      usuarios[i].nomeRamal = this.ramais.find(e => e.idRamal = usuarios[i].idRamal)?.nome;

      usuarios[i].dataAdmissao = this.datePipe.transform(usuarios[i].dataAdmissao, 'yyyy-MM-dd')!;
      usuarios[i].dataDemissao = this.datePipe.transform(usuarios[i].dataDemissao, 'yyyy-MM-dd')!;
    }
    return usuarios;
  }

  selecionarUsuarioTable(usuario: Usuario){
    this.usuario = usuario;

    window.localStorage.setItem('idEmpresaIdentificador', this.usuario.idEmpresa.toString());
    window.localStorage.setItem('idUsuarioIdentificador', this.usuario.idUsuario);
  }

   //limpar formulário
   limparForm() {
    var forms = document.querySelectorAll('.usuario');
    forms[0].classList.remove('was-validated');
    this.usuario = new Usuario();
  }
  //limpar formulário modal
  limparFormModal() {
    this.filtro = new Usuario();
    this.usuarios = [];
    this.visibleModal = false;
  }
   //limpar formulário modal
   limparFormModalFoto() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.usuario.foto = event.base64!;
      
      //img in base64 retirando cabeçalho
      this.usuario.foto = this.usuario.foto.substring(this.usuario.foto.indexOf(',') + 1);
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  
  abrirIdentificador(){
    this.router.navigate(['/cadastros/identificador']);
  }
}
