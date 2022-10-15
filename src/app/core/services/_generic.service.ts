import { Paginacao } from './../paginacao';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../entity';
import { take } from 'rxjs/operators';
import { ListagemPaginada } from '../listagem-paginada';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T> {
  constructor(public http: HttpClient) {}

  apiUrl = this.getApiUrl();

  buscar(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  listar(filtro: Paginacao): Observable<ListagemPaginada<T>> {
    const queryParams: string = filtro.getQueryParams();
    return this.http.get<ListagemPaginada<T>>(`${this.apiUrl}${queryParams}`).pipe(take(1));
  }

  salvar(dados: T): Observable<T> {
    const id = (dados as unknown as Entity).id;
    if (id == null) {
      return this.http.post<T>(`${this.apiUrl}`, dados).pipe(take(1));
    }
    return this.http.put<T>(`${this.apiUrl}/${id}`, dados).pipe(take(1));
  }

  excluir(dados: T): Observable<void> {
    const id = (dados as unknown as Entity).id;
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  abstract getApiUrl(): string;

}
