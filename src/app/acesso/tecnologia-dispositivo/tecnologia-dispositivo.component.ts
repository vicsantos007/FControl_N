import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TecnologiaDispositivo } from '../../shared/models/tecnologia-dispositivo.model';
import { DispositivoTecnologiaService } from '../../services/acesso-service/dispositivo-tecnologia.service'
declare var $: any;

@Component({
  selector: 'app-tecnologia-dispositivo',
  templateUrl: './tecnologia-dispositivo.component.html',
  styleUrls: ['./tecnologia-dispositivo.component.css']
})
export class TecnologiaDispositivoComponent implements OnInit {

  constructor(
    private tecnologiaDispositivoService: DispositivoTecnologiaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

}
