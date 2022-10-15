import { Perfil } from './perfil';

export class Usuario {
    id: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
    confirmarSenha: string;
    senhaAtual: string;
    novaSenha: string;
    authorities: string[];
    perfis: Perfil[];
    ativo: string;
}
