import { Identificador } from "./identificador.model";

export class Usuario{
    idEmpresa!: number;
    idUsuario!: string 
    nome!: string                   
    documento!: string           
    foto!: string ;                    
    gestorEmpresa!: boolean         
    dataAdmissao!: string ;           
    dataDemissao!: string ;   
    idTipoDocumento!: number;         
    idClassificacao!: number ;         
    idCategoria!: number ;             
    idSetor!: number ;
    idRamal!: number ;                 
    idPeriodoAcessoPermitido!: number;
    idUsuarioBiometria!: number;  
    nomeOperador!: string;
    idOperador!: string;

        
    //não mapeada
    nomeEmpresa: string | undefined;
    nomeClassificacao: string | undefined;
    nomeCategoria: string | undefined;
    nomeSetor: string | undefined;
    nomeRamal: string | undefined;
    identificadores: Identificador[] = [];
}




