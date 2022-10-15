import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AppToastService } from 'src/app/core/services/toast.service';
import { Autorizacao } from 'src/app/core/models/autorizacao';
import { AutorizacaoFilter } from 'src/app/core/filters/autorizacao.filter';
import { ListagemPaginada } from 'src/app/core/listagem-paginada';
import { AtivoDescricao, AtivoStyle } from 'src/app/core/enums/ativo.enum';
import { AutorizacaoService } from 'src/app/core/services/autorizacao.service';

@Component({
    selector: 'app-autorizacao-lista',
    templateUrl: './autorizacao-lista.component.html',
    styleUrls: ['./autorizacao-lista.component.scss'],
})
export class AutorizacaoListaComponent {
    cadastroDialog: boolean;
    itens: Autorizacao[] = [];
    item = new Autorizacao();
    itensSelecionados: Autorizacao[] = [];

    filtro = new AutorizacaoFilter();
    loading = true;
    totalRecords = 0;

    constructor(
        private service: AutorizacaoService,
        private toast: AppToastService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    aoCriar(): void {
        this.router.navigate(['cadastros', 'autorizacoes']);
    }

    aoAlterar(item: Autorizacao): void {
        this.router.navigate(['cadastros', 'autorizacoes', item.id]);
    }

    listar(event: LazyLoadEvent = null): void {
        this.filtro.onLazyLoad(event);
        this.loading = true;
        this.service.listar(this.filtro).subscribe(
            (data: ListagemPaginada<Autorizacao>) => {
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
            message: 'Confirma excluir os clientes selecionados?',
            accept: () => {
                this.itensSelecionados.forEach((i) => this.excluir(i));
                this.itensSelecionados = [];
                this.toast.success('Operação realizada com sucesso!');
            },
        });
    }

    aoExcluir(item: Autorizacao): void {
        this.confirmationService.confirm({
            message: `Confirma exclusão do registro: <br><br> ${item.descricao} ?`,
            accept: () => this.excluir(item),
        });
    }

    excluir(item: Autorizacao): void {
        this.service.excluir(item).subscribe(
            () => {
                this.toast.success('Operação realizada com sucesso!', `Autorização excluida: ${item.id} - ${item.descricao}`);
                this.listar();
            },
            () => this.toast.error('Erro na operação!', 'Não foi possível excluir a autorização')
        );
    }

    getSituacaoStyle(situacao: string): string {
        return AtivoStyle.get(situacao);
    }

    getSituacaoDescricao(situacao: string): string {
        return AtivoDescricao.get(situacao);
    }
}
