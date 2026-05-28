import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ShareService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getCurrentUrl(): string {
    if (!this.isBrowser()) return '';
    return window.location.href;
  }

  copyToClipboard(text: string): Promise<void> {
    if (!this.isBrowser()) return Promise.reject('Not browser');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (ok) resolve();
        else reject('execCommand failed');
      } catch (e) {
        reject(e);
      }
    });
  }

  tryNativeShare(data: { title?: string; text?: string; url?: string }): Promise<void> {
    if (!this.isBrowser()) return Promise.reject('Not browser');
    const nav: any = navigator as any;
    if (nav.share) {
      return nav.share(data);
    }
    return Promise.reject('Web Share API not available');
  }
}
