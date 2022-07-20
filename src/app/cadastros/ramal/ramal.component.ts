import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RamalService } from '../../services/cadastro-service/ramal.service';
import { Ramal } from '../../shared/models/ramal.model';
declare var $: any;

@Component({
  selector: 'app-ramal',
  templateUrl: './ramal.component.html',
  styleUrls: ['./ramal.component.css']
})
export class RamalComponent implements OnInit {

  registros: Ramal[] = [];
  filtroRamal: Ramal[] = [];
  
  constructor(
    private ramalService: RamalService,
    private toastr: ToastrService
  ) { }
 
  ngOnInit(): void {    
   
  }
}
