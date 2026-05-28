import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-button.html',
  styleUrl: './share-button.css',
})
export class ShareButtonComponent {
  isOpen = false;
  currentUrl = '';

  constructor(private shareService: ShareService) {}

  open() {
    this.currentUrl = this.shareService.getCurrentUrl();
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  copy() {
    const link = this.currentUrl || this.shareService.getCurrentUrl();
    this.shareService.copyToClipboard(link)
      .then(() => alert('Link copiado!'))
      .catch(() => alert('Não foi possível copiar automaticamente. Copie manualmente: ' + link));
  }

  nativeShare() {
    const link = this.currentUrl || this.shareService.getCurrentUrl();
    this.shareService.tryNativeShare({ title: document.title, text: 'Veja este evento', url: link })
      .then(() => this.close())
      .catch(() => {
        // fallback to copy
        this.copy();
      });
  }
}
