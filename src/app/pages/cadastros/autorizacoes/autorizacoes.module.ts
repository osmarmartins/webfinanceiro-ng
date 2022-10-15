import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacoesRoutingModule } from './autorizacoes-routing.module';
import { AutorizacaoFormComponent } from './autorizacao-form/autorizacao-form.component';
import { AutorizacaoListaComponent } from './autorizacao-lista/autorizacao-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AutorizacaoFormComponent,
    AutorizacaoListaComponent
  ],
  imports: [
    CommonModule,
    AutorizacoesRoutingModule,
    SharedModule,

  ]
})
export class AutorizacoesModule { }
