import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Setor } from '../../shared/models/setor.model';
import { SetorService } from '../../services/cadastro-service/setor.service'
declare var $: any;

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  //declarações 
  setor = new Setor();
  setorPesq = new Setor();
  filtroForm: any;
  exibirExcluir: boolean = false;
  
  constructor(
    private SetorService: SetorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
   
  }
}
