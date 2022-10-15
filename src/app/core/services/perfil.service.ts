import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/perfil';
import { GenericService } from './_generic.service';

@Injectable({ providedIn: 'root' })
export class PerfilService extends GenericService<Perfil>{

    getApiUrl(): string {
        return `${environment.apiUrl}/login-perfis`;
      }

    listarAtivos(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/ativos`).pipe(take(1));
    }

}

