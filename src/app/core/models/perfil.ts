import { Autorizacao } from './autorizacao';

export class Perfil {
    id: number;
    descricao: string;
    ativo: string;
    autorizacoes: Autorizacao[] = [];
}
