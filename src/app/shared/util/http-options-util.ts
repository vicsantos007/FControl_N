import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HttpOptions {
    constructor(
        private cookieService: CookieService
    ) { }

    //obter token
    obterToken(): string {
        const token = this.cookieService.get('aut');
        if (token != null && token.length > 0) {
            return token;
        }else{
            return "";
        }
    }

    //retorna header com token ou sem token
    dynamicHeader() {
        return { headers: this.hasToken() ? this.securityHeaders() : this.headers() };
    }

    //verificar se existe token
    hasToken(): boolean {
        const jwt = this.obterToken();
        return jwt != null;
    }

    //header com token
    protected securityHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.obterToken()}`
        });
    }

    //header sem token
    protected headers(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }
}
