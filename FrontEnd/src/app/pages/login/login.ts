import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';
import { environment } from '../../../env/env';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    fetch(environment.apiUrl + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, password: this.password })
    })
    .then(res => {
      if (!res.ok) throw new Error('Email ou senha incorretos');
      return res.json();
    })
    .then((data) => {
      const role: UserRole = data.role ?? 'usuario';
      const id = data.id ?? null;
      const name = data.name ?? data.email ?? this.email;
      this.authService.login(id, name, data.email ?? this.email, role);
      this.router.navigate(['/']);
    })
    .catch((err: Error) => {
      this.errorMessage = err.message || 'Erro ao conectar com o servidor';
    })
    .finally(() => {
      this.loading = false;
    });
  }
}
