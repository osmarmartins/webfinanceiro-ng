import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from './security/auth.service';
import { AppConfigComponent } from './app.config.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items: MenuItem[];

    constructor(
        public appMain: AppMainComponent,
    ) { }

    configurarApp() {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
      }

}
