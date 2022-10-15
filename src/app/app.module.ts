import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { ErrorComponent } from './pages/erros/error/error.component';
import { NotfoundComponent } from './pages/erros/notfound/notfound.component';
import { AccessComponent } from './pages/erros/access/access.component';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { TrocarsenhaComponent } from './pages/trocarsenha/trocarsenha.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,

        SharedModule,
        SecurityModule,

    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,

        DashboardComponent,
        EmptyComponent,
        ErrorComponent,
        NotfoundComponent,
        AccessComponent,
        TrocarsenhaComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
