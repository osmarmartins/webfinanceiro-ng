import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Início',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard']},
                    {label: 'Trocar Senha', icon: 'pi pi-fw pi-key', routerLink: ['trocarsenha']}
                ]
            },
            {
                label: 'Cadastros',
                items: [
                    {label: 'Autorizações', icon: 'pi pi-fw pi-check-circle', routerLink: ['cadastros/autorizacoes/lista']},
                    {label: 'Perfis', icon: 'pi pi-fw pi-users', routerLink: ['cadastros/perfis/lista']},
                    {label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['cadastros/usuarios/lista']},
                ]
            },
            {
                label: 'Páginas',
                items: [
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['login']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['empty']}
                ]
            },
            {
                label: 'Submenus',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                        ]
                    }
                ]
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
