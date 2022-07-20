import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Classificacao } from '../../shared/models/classificacao.model';
import { ClassificacaoService } from '../../services/cadastro-service/classificacao.service';
declare var $: any;

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {

  //declarações
  classificacao = new Classificacao();

  constructor(
    private classificacaoService: ClassificacaoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }
}
