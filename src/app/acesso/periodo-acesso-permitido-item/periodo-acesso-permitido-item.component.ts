import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PeriodoAcessoPermitidoItem } from '../../shared/models/periodo-acesso-permitido-item.model';
import { PeriodoAcessoPermitidoItemService } from '../../services/acesso-service/periodo-acesso-permitido-item.service'
declare var $: any;

@Component({
  selector: 'app-periodo-acesso-permitido-item',
  templateUrl: './periodo-acesso-permitido-item.component.html',
  styleUrls: ['./periodo-acesso-permitido-item.component.css']
})

export class PeriodoAcessoPermitidoItemComponent implements OnInit {

  registros: PeriodoAcessoPermitidoItem[] = [];
  filtroPeriodoAcessoPermitidoItem: PeriodoAcessoPermitidoItem[] = [];
  periodoAcessoPermitidoItem = new PeriodoAcessoPermitidoItem();

  constructor(
    private periodoAcessoPermitidoItemService: PeriodoAcessoPermitidoItemService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    
  }

}

