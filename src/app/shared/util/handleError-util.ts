import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class HandleError {
    constructor() { }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
        let erroMessage = '';
        let descricaoErroServidor = '';

        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            erroMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            descricaoErroServidor = `Origem : ${error.message}. Erro do Servidor: ${error.status} - ${error.error}.`;

            if (error.status === 0) {
                erroMessage = 'Não foi possível concluir a sua solicitação. Entre em contato com o administrador do sistema ou tente novamente em alguns instantes.';
                console.log(descricaoErroServidor);
            }

            if (error.status === 400) {
                console.log(error);
                erroMessage = error.error;
                console.log(descricaoErroServidor);
            }

            if (error.status === 500) {
                erroMessage = 'Ocorreu algo inesperado no servidor do sistema. Entre em contato com o administrador do sistema ou tente novamente em alguns instantes..';
                console.log(descricaoErroServidor);
            }
        }
        return throwError(() => new Error(erroMessage));
    };
}
