import { TipoDocumento } from '../models/tipo-documento.model';
import { Classificacao } from '../models/classificacao.model';
import { Categoria } from '../models/categoria.model';
import { Setor } from '../models/setor.model';
import { Ramal } from '../models/ramal.model';
import { PeriodoAcessoPermitido } from '../models/periodo-acesso-permitido.model';
import { Empresa } from './empresa.model';

export class UsuarioPacote{
    empresas: Empresa[] | undefined;
    documentos: TipoDocumento[] | undefined;
    classificacoes:Classificacao[] | undefined;
    categorias: Categoria[] | undefined;
    setores: Setor[] | undefined;
    ramais: Ramal[] | undefined;
    periodosdeAcesso: PeriodoAcessoPermitido[] | undefined;
}