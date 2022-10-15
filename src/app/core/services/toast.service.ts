import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor(
    private messageService: MessageService,
  ) { }

  clear() {
    this.messageService.clear();
  }

  show(mensagem: string) {
    this.message('info', mensagem);
  }

  information(mensagem: string, detalhe = '') {
    this.message('info', mensagem, detalhe);
  }

  success(mensagem: string, detalhe = '') {
    this.message('success', mensagem, detalhe);
  }

  error(mensagem: string, detalhe = '') {
    this.message('error', mensagem, detalhe);
  }

  warning(mensagem: string, detalhe?: string) {
    this.message('warn', mensagem, detalhe);
  }

  private message(severity: string, summary: string, detail?: string) {
    this.messageService.add({severity, summary, detail});
  }

}
