import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GrupoDispositivoAcesso } from '../../shared/models/grupo-dispositivo-acesso.model';
import { GrupoDispositivoAcessoService } from '../../services/acesso-service/grupo-dispositivo-acesso.service'

declare var $: any;

@Component({
  selector: 'app-grupo-dispositivo-acesso',
  templateUrl: './grupo-dispositivo-acesso.component.html',
  styleUrls: ['./grupo-dispositivo-acesso.component.css']
})
export class GrupoDispositivoAcessoComponent implements OnInit {

 //declarações
 registros: GrupoDispositivoAcesso[] = [];
 filtroGrupoDispositivoAcesso: GrupoDispositivoAcesso[] = [];

 constructor(
   private grupoDispositivoAcessoService: GrupoDispositivoAcessoService,
   private toastr: ToastrService
 ) { }


 ngOnInit(): void {
   
 }
}
