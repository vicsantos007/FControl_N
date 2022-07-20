export class MonitoramentoAcessoModel{
    idTransacoes: number | undefined;
    idEmpresa: number | undefined;    
    idDispositivo: number | undefined;
    idEvento: number | undefined;
    data: string | undefined;          
    hora: string | undefined; 
    idUsuario: string | undefined;    
    idControle: number | undefined; 
    codigoIdentificador: string | undefined;  
          
    //não mapeada
    nomeEmpresa: string | undefined;
    nomeEvento: string | undefined;
    corTextoEvento: string | undefined;
    corFundoTextoEvento: string | undefined;
    nomeDispositivo: string | undefined;
    nomeUsuario: string | undefined;
    fotoUsuario: string | undefined;
    
    qntTransacoes: number | undefined;
    inicio: boolean | undefined;
}