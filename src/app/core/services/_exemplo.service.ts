import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { GenericService } from './_generic.service';
import { Observable } from 'rxjs';
import { ListagemPaginada } from '../listagem-paginada';
import { take } from 'rxjs/operators';
import { Exemplo } from '../_exemplo';
import { ExemploFilter } from '../filters/_exemplo.filter';

@Injectable({ providedIn: 'root' })
export class ExemploService extends GenericService<Exemplo> {

  getApiUrl(): string {
    return `${environment.apiUrl}/exemplo`;
  }

  // Qdo houver método específico para o service (não consta no GenericService)
  listarPor(filtro: ExemploFilter): Observable<ListagemPaginada<Exemplo>> {
    const queryParams = filtro.getQueryParams();
    return this.http
      .get<ListagemPaginada<Exemplo>>(`${this.getApiUrl()}${queryParams}`)
      .pipe(take(1));
  }

}
