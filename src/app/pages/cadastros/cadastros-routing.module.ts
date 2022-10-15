import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    },
    {
        path: 'perfis',
        loadChildren: () => import('./perfis/perfis.module').then((m) => m.PerfisModule),
    },
    {
        path: 'autorizacoes',
        loadChildren: () => import('./autorizacoes/autorizacoes.module').then((m) => m.AutorizacoesModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
