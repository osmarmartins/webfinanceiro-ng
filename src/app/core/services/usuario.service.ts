import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { GenericService } from './_generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario> {

    getApiUrl(): string {
        return `${environment.apiUrl}/login-usuarios`;
      }

    trocarsenha(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.getApiUrl()}/${usuario.id}/trocarsenha`, usuario).pipe(take(1));
    }


}
