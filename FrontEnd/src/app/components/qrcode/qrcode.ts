import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qrcode.html',
  styleUrl: './qrcode.css',
})
export class Qrcode {
  @Input() value: string = '';

  qrCodeImage: string = '';
  isOpen: boolean = false;

  gerarQRCode() {
    QRCode.toDataURL(this.value)
      .then(url => {
        this.qrCodeImage = url;
        this.isOpen = true; // abre o modal
      })
      .catch(err => console.error(err));
  }

  fechar() {
    this.isOpen = false;
  }
}


