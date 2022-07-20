import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Operador } from "../../shared/models/operador.model";
import { OperadorService } from "../../services/cadastro-service/operador.service";
import { UsuarioService } from "../../services/cadastro-service/usuario.service";
import { OperadorAutenticado } from "src/app/shared/util/operador-autenticado-util";
import { ValidacaoForms } from "src/app/shared/util/validacao-forms-util";
import { IconSetService } from "@coreui/icons-angular";
import { Router } from "@angular/router";
import { brandSet, cilListNumbered, cilZoom } from "@coreui/icons";
import { Empresa } from "src/app/shared/models/empresa.model";
import { Classificacao } from "src/app/shared/models/classificacao.model";
import { Categoria } from "src/app/shared/models/categoria.model";
import { Setor } from "src/app/shared/models/setor.model";
import { Ramal } from "src/app/shared/models/ramal.model";
import { Usuario } from "src/app/shared/models/usuario.model";

declare var $: any;

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss']
})
export class OperadorComponent implements OnInit {
  constructor(
    private operadorService: OperadorService,
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
  visibleModalOperador: boolean = false;
  finalizarcadastro: boolean = false;

  operador = new Operador();
  filtro = new Usuario();
  filtroOperador = new Operador();
  usuario = new Usuario();
  usuarios: Usuario[]=[];
  operadores: Operador[]=[];
  
  //recp pacote
  empresas: Empresa[]=[];
  classificacoes:Classificacao[]=[];
  categorias: Categoria[]=[];
  setores: Setor[]=[];
  ramais: Ramal[]=[];

  idEmpresaOp: number = 0;
  imageChangedEvent: any = '';
  croppedImage: any = '';


  ngOnInit() {
    if (this.operadorAutenticado.verificarToken()) {
      this.idEmpresaOp = +window.localStorage.getItem('idEmpresaOP')!;
    }
    //this.ObterPacoteInicial();
  }

  gravar(){
    if(this.validacaoForms.validarForm('operador')){

      if(this.operador.idEmpresa == undefined){
        this.operador.idEmpresa = this.idEmpresaOp;
      }     
      
      this.operadorService.criar(this.operador).subscribe(
        (resp: any) => {//sucesso
          this.limparForm();
          this.toastr.success(resp);         
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

  obterPorFiltroOperador() {
    this.operadorService.obterPorFiltro(this.filtroOperador).subscribe((_operadores: Operador[] = []) => {
     this.operadores = _operadores;
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
    }
    return usuarios;
  }

  selecionarUsuarioTable(usuario: Usuario){
    this.operador.idEmpresa = usuario.idEmpresa;
    this.operador.idUsuario = usuario.idUsuario;   
    this.operador.nome = usuario.nome;
    this.operador.foto = usuario.foto;
  }

  selecionarOperadorTable(operador: Operador){
    this.operador = operador;   
    this.operador.dataInicioOperacao = this.datePipe.transform(operador.dataInicioOperacao, 'yyyy-MM-dd')!; 
    if(operador.dataFimOperacao != '0001-01-01T00:00:00'){
      this.operador.dataFimOperacao = this.datePipe.transform(operador.dataFimOperacao, 'yyyy-MM-dd')!;
    }  
  }

   //limpar formulário
   limparForm() {
    var forms = document.querySelectorAll('.operador');
    forms[0].classList.remove('was-validated');
    this.operador = new Operador();
  }

  //limpar formulário modal
  limparFormModal() {
    this.filtro = new Usuario();
    this.operadores = [];
    this.visibleModal = false;
  }
}
