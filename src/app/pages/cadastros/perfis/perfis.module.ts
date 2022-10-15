import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfisRoutingModule } from './perfis-routing.module';
import { PerfilListaComponent } from './perfil-lista/perfil-lista.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PerfilListaComponent,
    PerfilFormComponent
  ],
  imports: [
    CommonModule,
    PerfisRoutingModule,
    SharedModule,
  ]
})
export class PerfisModule { }
