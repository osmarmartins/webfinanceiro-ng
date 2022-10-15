import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AtivoDescricao, AtivoStyle } from 'src/app/core/enums/ativo.enum';
import { UsuarioFilter } from 'src/app/core/filters/usuario.filter';
import { ListagemPaginada } from 'src/app/core/listagem-paginada';
import { Usuario } from 'src/app/core/models/usuario';
import { AppToastService } from 'src/app/core/services/toast.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent {

    cadastroDialog: boolean;
    itens: Usuario[] = [];
    item = new Usuario();
    itensSelecionados: Usuario[] = [];

    filtro = new UsuarioFilter();
    loading = true;
    totalRecords = 0;

    constructor(
        private service: UsuarioService,
        private toast: AppToastService,
        private confirmationService: ConfirmationService,
        private router: Router,
    ) {}

    aoCriar(): void {
        this.router.navigate(['cadastros', 'usuarios']);
    }

    aoAlterar(item: Usuario): void {
        this.router.navigate(['cadastros', 'usuarios', item.id]);
    }

    listar(event: LazyLoadEvent = null): void {
        this.filtro.onLazyLoad(event);
        this.loading = true;
        this.service.listar(this.filtro).subscribe(
            (data: ListagemPaginada<Usuario>) => {
                this.itens = data.content;
                this.totalRecords = data.totalElements;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.toast.error(error);
            }
        );
    }

    aoExcluirSelecao(): void {
        this.confirmationService.confirm({
            message: 'Confirma excluir os registros selecionados?',
            accept: () => {
                this.itensSelecionados.forEach((i) => this.excluir(i));
                this.itensSelecionados = [];
                this.toast.success('Operação realizada com sucesso!');
            },
        });
    }

    aoExcluir(item: Usuario): void {
        this.confirmationService.confirm({
            message: `Confirma exclusão do usuário: <br><br> ${item.nome} ?`,
            accept: () => this.excluir(item),
        });
    }

    excluir(item: Usuario): void {
        this.service.excluir(item).subscribe(
            () => {
                this.toast.success('Operação realizada com sucesso!', `Usuário excluido: ${item.id} - ${item.nome}`);
                this.listar();
            },
            () => this.toast.error('Erro na operação!', 'Não foi possível excluir o usuário')
        );
    }

    getSituacaoStyle(situacao: string): string {
        return AtivoStyle.get(situacao);
    }

    getSituacaoDescricao(situacao: string): string {
        return AtivoDescricao.get(situacao);
    }

}
