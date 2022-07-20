import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GestorEmpresa } from '../../shared/models/gestor-empresa.model';
import { GestorEmpresaService } from '../../services/cadastro-service/gestor-empresa.service'
declare var $: any;

@Component({
  selector: 'app-gestor-empresa',
  templateUrl: './gestor-empresa.component.html',
  styleUrls: ['./gestor-empresa.component.css']
})
export class GestorEmpresaComponent implements OnInit {

  //gestorEmpresa
  form: FormGroup;
  registros: GestorEmpresa[];
  filtroGestores: GestorEmpresa[];
  gestorEmpresa = new GestorEmpresa();

  constructor(
    private gestorEmpresaService: GestorEmpresaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
