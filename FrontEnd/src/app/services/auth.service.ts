import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export type UserRole = 'suporte' | 'organizador' | 'expositor' | 'usuario' | 'anonimo';

export interface AuthUser {
  id?: number | null;
  name?: string | null;
  email: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(id: number | null, name: string | null, email: string, role: UserRole): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const user: AuthUser = { id, name, email, role };

    localStorage.setItem('user', JSON.stringify(user));
    this.cookieService.set('auth_role', role, { path: '/', sameSite: 'Strict' });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.cookieService.delete('auth_role', '/');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem('user');
  }

  getUser(): AuthUser | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  getRole(): UserRole {
    return this.getUser()?.role ?? 'anonimo';
  }
}
