import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioVeiculo } from '../../shared/models/usuario-veiculo.model';
import { UsuarioVeiculoService } from '../../services/cadastro-service/usuario-veiculo.service';
declare var $: any;

@Component({
  selector: 'app-usuario-veiculo',
  templateUrl: './usuario-veiculo.component.html',
  styleUrls: ['./usuario-veiculo.component.css']
})
export class UsuarioVeiculoComponent implements OnInit {

  usuarioVeiculos: UsuarioVeiculo[] = [];
  filtroUsuarioVeiculo: UsuarioVeiculo[] = [];
 
  constructor(
    private usuarioVeiculoService: UsuarioVeiculoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }
}
