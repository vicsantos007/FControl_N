import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../shared/models/empresa.model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../services/cadastro-service/empresa.service';
declare var $: any;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit{

  empresa = new Empresa();

  constructor(
    private empresaService: EmpresaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

}


