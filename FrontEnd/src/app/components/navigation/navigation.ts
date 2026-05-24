import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  menuOpen = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      setTimeout(() => {
        document.querySelector('.nav-links')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }
}
