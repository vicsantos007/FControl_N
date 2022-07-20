export class Operador{    
    idEmpresa: number | undefined;
    idOperador: number | undefined;
    idUsuario: string | undefined;
    chaveAcesso: string | undefined;                 
    nome: string | undefined;                    
    email: string | undefined;  
    senha: string | undefined;
    dataCriacao: string | undefined;   
    trocarSenhaPrimeiroLogin: boolean | undefined;
    dataInicioOperacao: string | undefined;
    dataFimOperacao: string | undefined;
    foto!: string ;   

    //somente edição
    senhaConfirmacao: string | undefined;
}