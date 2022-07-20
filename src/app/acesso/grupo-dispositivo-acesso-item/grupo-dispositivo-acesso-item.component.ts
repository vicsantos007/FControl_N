import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GrupoDispositivoAcessoItem } from '../../shared/models/grupo-dispositivo-acesso-item.model';
import { GrupoDispositivoAcessoItemService } from '../../services/acesso-service/grupo-dispositivo-acesso-item.service';
declare var $: any;

@Component({
  selector: 'app-grupo-dispositivo-acesso-item',
  templateUrl: './grupo-dispositivo-acesso-item.component.html',
  styleUrls: ['./grupo-dispositivo-acesso-item.component.css']
})
export class GrupoDispositivoAcessoItemComponent implements OnInit {

  registros: GrupoDispositivoAcessoItem[] = [];
  
  constructor(
    private grupoDispositivoAcessoItemService: GrupoDispositivoAcessoItemService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

}
