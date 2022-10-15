import { AuthService } from './../../security/auth.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Usuario } from 'src/app/core/models/usuario';
import { AppToastService } from 'src/app/core/services/toast.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trocarsenha',
  templateUrl: './trocarsenha.component.html',
  styleUrls: ['./trocarsenha.component.scss']
})
export class TrocarsenhaComponent implements OnInit, AfterViewInit {
    @ViewChild('autofocus') autofocus: ElementRef;

    usuario = new Usuario();

    ngAfterViewInit(): void  {
      setTimeout(() => this.autofocus.nativeElement.focus());
   }

   ngOnInit(): void {
    this.getUsuario();
   }

    constructor(
      private service: UsuarioService,
      private toast: AppToastService,
      private loader: NgxUiLoaderService,
      private authService: AuthService,
      private router: Router,
    ) { }

    getUsuario(): void {
        this.usuario = this.authService.getUsuarioAutenticado();
    }

    salvar(): void {
      this.loader.start();
      this.service.trocarsenha(this.usuario).subscribe(
        (usuario) => {
            this.toast.success('Operação realizada com sucesso!', 'Nova senha definida');
            this.loader.stop();
            this.router.navigate(['login']);
        },
        () => {
            this.loader.stop();
            this.toast.error('Erro na operação!', 'Não foi possível salvar os dados');
        }
      );
    }

}
