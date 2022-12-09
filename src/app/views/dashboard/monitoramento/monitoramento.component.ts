import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MonitoramentoAcessoModel } from './../../../shared/models/monitoramento-acesso.model';
import { MonitoramentoAcesso } from '../../../services/operacao-service/monitoramento-acesso.service'
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as signalR from "@microsoft/signalr";
import { SignalrService } from '../../../services/signalR-service/signalR.service';


interface Message{
  data: string
}

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit, OnDestroy {

connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:44362/monitoramento', {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
}).build();

  constructor(
    private monitoramentoAcessoService: MonitoramentoAcesso,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router,
    public signalRService: SignalrService
  ) { }

  monitoramentoAcessos: MonitoramentoAcessoModel[] = [];
  monitoramentoAcesso = new MonitoramentoAcessoModel();
  tamanhoLimiteLista: number = 7;
  idInterval: number = 0;
  

  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  dataHoraDisplay: string = '';
  hubConnection!: any;

  ngOnInit() {
    if(!this.verificarToken()){
      this.router.navigate(['/login']);
    }else{
      this.monitoramentoAcesso.idEmpresa = +window.localStorage.getItem('idEmpresaOP')!;
      this.monitoramentoAcesso.idUsuario = window.localStorage.getItem('idUsuarioOP')!;
      this.monitoramentoAcesso.qntTransacoes = +window.localStorage.getItem('qntTransacoes')!;
      this.monitoramentoAcesso.idTransacoes = +window.localStorage.getItem('idTransacoes')!;      
    }

    this.hubConnection = this.signalRService.startConnection();

    setTimeout(() => {
      this.askServerListener();
      this.signalRService.askServer(this.monitoramentoAcesso.idEmpresa, this.monitoramentoAcesso.idUsuario, 1);
    }, 2000);
   
  }     

  askServerListener() {
    this.hubConnection.on("monitoramentoResp", (someText: any) => {
        this.monitoramentoAcessos = this.fila(this.monitoramentoAcessos, someText);
    })
}

  ngOnDestroy() {
    this.signalRService.hubConnection.off("monitoramentoResp");
  }

  obterTransacoes(){    
    this.monitoramentoAcessoService.obterPorFiltro(this.monitoramentoAcesso).subscribe((_monitoramentoAcessos: MonitoramentoAcessoModel[]) => {
      if(_monitoramentoAcessos.length > 0){
        this.monitoramentoAcessos = this.fila(this.monitoramentoAcessos, _monitoramentoAcessos[0]);
      }
            
    }, (erro: any) => {
      this.toastr.error(erro, 'Atenção!');
    });
  }

  //verifica se o operador está autenticado
  verificarToken() {
    const token = this.cookieService.get('aut');
    if (token == null || token.length == 0 || token == '') {
      return false;        
    }else{
        return true;
    }
  }

  //controle de fila
  fila(Lista: MonitoramentoAcessoModel[]=[], novoItem: MonitoramentoAcessoModel){
    
    if(novoItem != undefined){
      Lista.push(novoItem);
      if(Lista.length > this.tamanhoLimiteLista){
        Lista.shift();
      }
    }
    return Lista;
  }

}
function SendNotification(SendNotification: any, arg1: (type: string, message: string) => void) {
  throw new Error('Function not implemented.');
}

