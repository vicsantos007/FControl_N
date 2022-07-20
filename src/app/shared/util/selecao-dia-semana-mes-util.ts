import { Injectable } from '@angular/core';
import { ArrayGenerico } from '../models/array-gererico.model';

@Injectable()
export class SelecaoDiaSemanaMes {

    diaSemana: ArrayGenerico[] = [
        {'id': 0, 'descricao': 'DOMINGO'},
        {'id': 1, 'descricao': 'SEGUNDA-FEIRA'},
        {'id': 2, 'descricao': 'TERÇA-FEIRA'},
        {'id': 3, 'descricao': 'QUARTA-FEIRA'},
        {'id': 4, 'descricao': 'QUINTA-FEIRA'},
        {'id': 5, 'descricao': 'SEXTA-FEIRA'},
        {'id': 6, 'descricao': 'SÁBADO'}
    ];

    mes: ArrayGenerico[] = [
        {'id': 0, 'descricao': 'JANEIRO'},
        {'id': 1, 'descricao': 'FEVEREIRO'},
        {'id': 2, 'descricao': 'MARÇO'},
        {'id': 3, 'descricao': 'ABRIL'},
        {'id': 4, 'descricao': 'MAIO'},
        {'id': 5, 'descricao': 'JUNHO'},
        {'id': 6, 'descricao': 'JULHO'},
        {'id': 7, 'descricao': 'AGOSTO'},
        {'id': 8, 'descricao': 'SETEMBRO'},
        {'id': 9, 'descricao': 'OUTUBRO'},
        {'id': 10, 'descricao': 'NOVEMBRO'},
        {'id': 11, 'descricao': 'DEZEMBRO'}
    ];

    constructor() { }
    
    obterDiaSemana(): ArrayGenerico[]{
        return this.diaSemana;
    }

    obterMes(): ArrayGenerico[]{
        return this.mes;
    }

}