import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autorizacao } from 'src/app/core/models/autorizacao';
import { AutorizacaoService } from 'src/app/core/services/autorizacao.service';
import { AppToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-autorizacao-form',
  templateUrl: './autorizacao-form.component.html',
  styleUrls: ['./autorizacao-form.component.scss']
})
export class AutorizacaoFormComponent implements OnInit, AfterViewInit {
    @ViewChild('autofocus') autofocus: ElementRef;

    autorizacao = new Autorizacao();
    status = [
      {label: 'Ativo', value: 'ATIVO'},
      {label: 'Inativo', value: 'INATIVO'}
    ];

    ngAfterViewInit(): void  {
      setTimeout(() => this.autofocus.nativeElement.focus());
   }

   ngOnInit(): void {
      const id = this.route.snapshot.params?.id;
      if (id) {
        this.carregar(id);
      }
    }

    constructor(
      private service: AutorizacaoService,
      private toast: AppToastService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }

    carregar(id: number): void {
      this.service.buscar(id).subscribe(
        (autorizacao) => this.autorizacao = autorizacao,
        () => this.toast.error('Não foi possível carregar os dados da autorização!')
      );
    }

    criar(): void {
      this.autorizacao = new Autorizacao();
      this.router.navigate(['cadastros', 'autorizacoes']);
      setTimeout(() => this.autofocus.nativeElement.focus(), 0);
    }

    salvar(): void {
      this.service.salvar(this.autorizacao).subscribe(
        (autorizacao) => {
          this.toast.success('Operação realizada com sucesso!', 'Os dados foram salvos');
          this.router.navigate(['cadastros', 'autorizacoes', autorizacao.id]);
        },
        () => this.toast.error('Erro na operação!', 'Não foi possível salvar os dados')
      );
    }

    voltar(): void {
      this.router.navigate(['cadastros', 'autorizacoes', 'lista']);
    }


}
