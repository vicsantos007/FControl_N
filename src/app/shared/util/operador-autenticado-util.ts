import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class OperadorAutenticado {
    constructor(
        private cookieService: CookieService,
        private router: Router
    ) { }

    //verifica se o operador está autenticado
    verificarToken() {
        const token = this.cookieService.get('aut');
        if (token == null || token.length == 0 || token == '') {
            this.router.navigate(['/login']);
            return false;
        }else{
            return true;
        }
    }
}