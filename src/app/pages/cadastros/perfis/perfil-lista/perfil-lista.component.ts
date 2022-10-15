import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AtivoStyle, AtivoDescricao } from 'src/app/core/enums/ativo.enum';
import { PerfilFilter } from 'src/app/core/filters/perfil.filter';
import { ListagemPaginada } from 'src/app/core/listagem-paginada';
import { Perfil } from 'src/app/core/models/perfil';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { AppToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-perfil-lista',
  templateUrl: './perfil-lista.component.html',
  styleUrls: ['./perfil-lista.component.scss']
})
export class PerfilListaComponent {

    cadastroDialog: boolean;
    itens: Perfil[] = [];
    item = new Perfil();
    itensSelecionados: Perfil[] = [];

    filtro = new PerfilFilter();
    loading = true;
    totalRecords = 0;

    constructor(
        private service: PerfilService,
        private toast: AppToastService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    aoCriar(): void {
        this.router.navigate(['cadastros', 'perfis']);
    }

    aoAlterar(item: Perfil): void {
        this.router.navigate(['cadastros', 'perfis', item.id]);
    }

    aoCarregar(event: LazyLoadEvent = null) {
        this.filtro.size = event?.rows;
        this.filtro.page = Math.ceil(event?.first / event?.rows);
        this.listar();
    }

    listar(event: LazyLoadEvent = null): void {
        this.filtro.onLazyLoad(event);
        this.loading = true;
        this.filtro.sort = 'descricao,asc';
        this.service.listar(this.filtro).subscribe(
            (data: ListagemPaginada<Perfil>) => {
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

    aoExcluir(item: Perfil): void {
        this.confirmationService.confirm({
            message: `Confirma exclusão do registro: <br><br> ${item.descricao} ?`,
            accept: () => this.excluir(item),
        });
    }

    excluir(item: Perfil): void {
        this.service.excluir(item).subscribe(
            () => {
                this.toast.success('Operação realizada com sucesso!', `Perfil excluido: ${item.id} - ${item.descricao}`);
                this.listar();
            },
            () => this.toast.error('Erro na operação!', 'Não foi possível excluir o perfil')
        );
    }

    getSituacaoStyle(situacao: string): string {
        return AtivoStyle.get(situacao);
    }

    getSituacaoDescricao(situacao: string): string {
        return AtivoDescricao.get(situacao);
    }

}
