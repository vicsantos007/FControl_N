import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TipoDocumento } from '../../shared/models/tipo-documento.model';
import { TipoDocumentoService } from '../../services/cadastro-service/tipo-documento.service';
declare var $: any;

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {
  
  //declarações
  tipoDocumento = new TipoDocumento();
  tipoDocumentoPesq = new TipoDocumento();
  
  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
}
