import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autorizacao } from '../models/autorizacao';
import { GenericService } from './_generic.service';

@Injectable({ providedIn: 'root' })
export class AutorizacaoService extends GenericService<Autorizacao> {

  getApiUrl(): string {
    return `${environment.apiUrl}/login-autorizacoes`;
  }

  listarAtivos(): Observable<Autorizacao[]> {
    return this.http.get<Autorizacao[]>(`${this.apiUrl}/ativos`).pipe(take(1));
  }

}
