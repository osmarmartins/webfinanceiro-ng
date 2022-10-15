import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { AutorizacaoFormComponent } from './autorizacao-form/autorizacao-form.component';
import { AutorizacaoListaComponent } from './autorizacao-lista/autorizacao-lista.component';

const routes: Routes = [
    {
        path: 'lista',
        component: AutorizacaoListaComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_AUTORIZACOES'] },
    },
    {
        path: '',
        component: AutorizacaoFormComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_AUTORIZACOES'] },
    },
    {
        path: ':id',
        component: AutorizacaoFormComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_AUTORIZACOES'] },
    },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizacoesRoutingModule { }
