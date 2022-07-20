import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PeriodoAcessoPermitido } from '../../shared/models/periodo-acesso-permitido.model';
import { PeriodoAcessoPermitidoService } from '../../services/acesso-service/periodo-acesso-permitido.service'
declare var $: any;

@Component({
  selector: 'app-periodo-acesso-permitido',
  templateUrl: './periodo-acesso-permitido.component.html',
  styleUrls: ['./periodo-acesso-permitido.component.css']
})
export class PeriodoAcessoPermitidoComponent implements OnInit {

  constructor(
    private periodoAcessoPermitidoService: PeriodoAcessoPermitidoService,
    private toastr: ToastrService  ) { }

  ngOnInit(): void {
    
  }
}
