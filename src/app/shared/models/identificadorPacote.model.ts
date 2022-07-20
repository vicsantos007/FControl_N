
import { TipoIdentificador } from './tipo-Identificador.model';
import { GrupoDispositivoAcesso } from './grupo-dispositivo-acesso.model';
import { Identificador } from './identificador.model';
import { Empresa } from './empresa.model';

export class IdentificadorPacote{
    tiposIdentificador: TipoIdentificador[] | undefined;
    gruposAcesso:GrupoDispositivoAcesso[] | undefined;
    empresas:Empresa[] | undefined;
}