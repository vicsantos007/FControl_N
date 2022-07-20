import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DispositivoClassificacao } from '../../shared/models/dispositivo-classificacao.model';
import { DispositivoClassificacaoService } from '../../services/acesso-service/dispositivo-classificacao.service';
declare var $: any;

@Component({
  selector: 'app-dispositivo-classificacao',
  templateUrl: './dispositivo-classificacao.component.html',
  styleUrls: ['./dispositivo-classificacao.component.css']
})
export class DispositivoClassificacaoComponent implements OnInit {

  constructor(
    private dispositivoClassificacaoService: DispositivoClassificacaoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
