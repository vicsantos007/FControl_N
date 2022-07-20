import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dispositivo } from '../../shared/models/dispositivo.model'
import { DispositivoService } from '../../services/acesso-service/dispositivo.service'
declare var $: any;

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.css']
})
export class DispositivoComponent implements OnInit {

  //declarações
  registros: Dispositivo[] = [];
  filtroDispositivo: Dispositivo[] = [];
  
  constructor(
    private dispositivoService: DispositivoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
