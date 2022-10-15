import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from './../../environments/environment';
import { Usuario } from '../core/models/usuario';
import { AppToastService } from '../core/services/toast.service';
import { AccessToken } from '../core/models/accesstoken';

@Injectable({providedIn: 'root', })
export class AuthService {
  oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  jwtPayload: any;
  jwt: any;

  constructor(
    private loader: NgxUiLoaderService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: AppToastService,
  ) {}

  login(usuario: Usuario) {
    this.loader.start();
    const body = `username=${usuario.login}&password=${usuario.senha}&grant_type=password`;
    this.http
      .post<AccessToken>(this.oauthTokenUrl, body)
      .pipe(take(1))
      .subscribe(
        (response: AccessToken) => {
          this.armazenarToken(response.access_token, response);
          this.router.navigate(['/']);
          this.loader.stop();
        },
        (error) => {
          this.loader.stop();
          if (error.status === 400 && error.error.error === 'invalid_grant') {
            this.toastr.error(
              'Usuário ou Senha inválido!',
              'Repita a operação'
            );
          } else {
            this.toastr.error(
              'Erro de comunicação!',
              'Não foi possível efetuar o login'
            );
          }
        }
      );
  }

  private armazenarToken(token: string, jwt: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }

  getToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.logout();
    }
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    return token;
  }

  getUsuarioAutenticado(): Usuario {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      const json = JSON.parse(jwt);
      return json as Usuario;
    }
    return new Usuario();
  }

  logout() {
    this.limparAccessToken();
    this.router.navigate(['/login']);
  }

  limparAccessToken() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('jwt');
    this.jwtPayload = null;
    this.jwt = null;
  }

  isAccessTokenInvalido(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.getUsuarioAutenticado();
    }
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    this.getToken();
    return (
      this.jwtPayload &&
      this.jwtPayload.authorities &&
      this.jwtPayload.authorities.includes(permissao)
    );
  }

  temQualquerPermissao(roles: string[]) {
    this.getToken();
    if (!(this.jwtPayload && this.jwtPayload.authorities)) {
      return false;
    }
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }
}
