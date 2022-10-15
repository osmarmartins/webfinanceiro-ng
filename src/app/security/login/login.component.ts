import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../core/models/appconfig';
import { ConfigService } from 'src/app/core/services/app.config.service';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('inputUsuario') inputUsuario: ElementRef;
  usuario = new Usuario();
  config: AppConfig;
  subscription: Subscription;

  constructor(
    public configService: ConfigService,
    private authService: AuthService,
  ){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.authService.limparAccessToken();
    setTimeout(() => this.inputUsuario.nativeElement.focus());
  }

  onLogin() {
    this.authService.login(this.usuario);
  }
}
