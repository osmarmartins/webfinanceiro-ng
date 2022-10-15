import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Perfil } from 'src/app/core/models/perfil';
import { Usuario } from 'src/app/core/models/usuario';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { AppToastService } from 'src/app/core/services/toast.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, AfterViewInit {
    @ViewChild('autofocus') autofocus: ElementRef;

    todosPerfis: Perfil[] = [];
    perfisDisponiveis: Perfil[] = [];
    perfisSelecionados: Perfil[] = [];
    perfisSelecionadosUsuario: Perfil[] = [];

    usuario = new Usuario();

    status = [
      {label: 'Ativo', value: 'ATIVO'},
      {label: 'Inativo', value: 'INATIVO'}
    ];

    ngAfterViewInit(): void  {
      setTimeout(() => this.autofocus.nativeElement.focus());
   }

   ngOnInit(): void {
      this.getPerfis();
      const id = this.route.snapshot.params?.id;
      if (id) {
        this.carregar(id);
      }
    }

    constructor(
      private service: UsuarioService,
      private perfilService: PerfilService,
      private toast: AppToastService,
      private router: Router,
      private route: ActivatedRoute,
      private loader: NgxUiLoaderService,
    ) { }

    carregar(id: number): void {
      this.service.buscar(id).subscribe(
        (usuario) => {
            this.usuario = usuario;
            this.getPerfisDisponiveis();
        },
        () => this.toast.error('Não foi possível carregar os dados do usuário!')
      );
    }

    private getPerfis(): void {
        this.perfilService.listarAtivos().subscribe(
            (perfis) => {
                this.todosPerfis = perfis;
                this.getPerfisDisponiveis();
            },
        () => this.toast.error('Não foi possível carregar relação de perfis!')
        );
    }

    private getPerfisDisponiveis(): void {
        if (!this.usuario.perfis || !this.usuario.id) {
            this.perfisDisponiveis = [...this.todosPerfis];
        } else {
            this.perfisDisponiveis = this.todosPerfis.filter(a => !this.usuario.perfis.find(p => p.id === a.id));
        }
        this.perfisSelecionados = [];
    }

    criar(): void {
      this.usuario = new Usuario();
      this.router.navigate(['cadastros', 'usuarios']);
      setTimeout(() => this.autofocus.nativeElement.focus(), 0);
    }

    salvar(): void {

      console.log(this.usuario);

      this.loader.start();
      this.service.salvar(this.usuario).subscribe(
        (usuario) => {
          this.usuario = usuario;
          this.getPerfisDisponiveis();
          this.toast.success('Operação realizada com sucesso!', 'Os dados foram salvos');
          this.router.navigate(['cadastros', 'usuarios', usuario.id]);
          this.loader.stop();
        },
        () => {
            this.loader.stop();
            this.toast.error('Erro na operação!', 'Não foi possível salvar os dados');
        }
      );
    }

    voltar(): void {
      this.router.navigate(['cadastros', 'usuarios', 'lista']);
    }

    adicionarPerfil(): void {
        this.usuario.perfis = [...this.perfisSelecionados, ...this.usuario.perfis || []];
        this.salvar();
    }

    aoExcluir(perfil: Perfil): void {
        this.usuario.perfis = this.usuario.perfis.filter(a => a.id !== perfil.id);
        this.salvar();
    }

    aoExcluirSelecao(): void {
        this.usuario.perfis = this.usuario.perfis.filter(p => !this.perfisSelecionadosUsuario.find(s => p.id === s.id));
        this.perfisSelecionadosUsuario = [];
        this.salvar();
    }


}
