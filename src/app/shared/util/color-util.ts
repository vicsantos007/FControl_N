import { Injectable } from '@angular/core';
import { Colors } from '../models/colors.model';

@Injectable()
export class Color {

    private cor: Colors[] = [
        {'id': 0, 'color': 'primary'},
        {'id': 2, 'color': 'secondary'},
        {'id': 3, 'color': 'success'},
        {'id': 1, 'color': 'danger'},
        {'id': 4, 'color': 'warning'},
        {'id': 5, 'color': 'info'},
        {'id': 6, 'color': 'dark'}
    ];

    private corTexto: Colors[] = [
        {'id': 0, 'color': 'primary'},
        {'id': 2, 'color': 'secondary'},
        {'id': 3, 'color': 'success'},
        {'id': 1, 'color': 'danger'},
        {'id': 4, 'color': 'warning'},
        {'id': 5, 'color': 'info'},
        {'id': 6, 'color': 'dark'}
    ];

    constructor() { }
    
    obterCor(): Colors[]{
        return this.cor;
    }

    obterCorTexto(): Colors[]{
        return this.corTexto;
    }

}