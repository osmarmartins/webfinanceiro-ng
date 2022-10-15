import { Paginacao } from '../paginacao';

export class UsuarioFilter extends Paginacao {
    id: number;
    nome: string;
    login: string;
    email: string;
    ativo: string;
}
