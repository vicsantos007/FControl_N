import { Injectable } from "@angular/core";

@Injectable()
export class ValidacaoForms {

    //resposta válido
    valido: boolean = false;

    constructor( ) { }
    
    validarForm(classe: string){

        if(classe != undefined && classe != '' && classe != null){
            var forms = document.querySelectorAll('.' + classe);
            forms[0].classList.remove;
            forms[0].classList.add('was-validated');

            var result =  forms[0].classList.value;
            this.valido = result.indexOf('ng-valid') > -1;

            if(this.valido){
                return true;
            }       
        }    
        return false;
    }    
}