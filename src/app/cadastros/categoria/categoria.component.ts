import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../shared/models/categoria.model';
import { CategoriaService } from '../../services/cadastro-service/categoria.service';
declare var $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  //declarações
  categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }
}
