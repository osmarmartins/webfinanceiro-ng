import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth.guard';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilListaComponent } from './perfil-lista/perfil-lista.component';

const routes: Routes = [
    {
        path: 'lista',
        component: PerfilListaComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_PERFIS'] },
    },
    {
        path: '',
        component: PerfilFormComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_PERFIS'] },
    },
    {
        path: ':id',
        component: PerfilFormComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRO_PERFIS'] },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfisRoutingModule { }
