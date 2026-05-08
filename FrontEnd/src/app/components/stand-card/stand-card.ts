import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

export interface StandData {
  id: string | number;
  category?: string;
  name: string;
  subtitle?: string;
  date?: string;
  description: string;
  image: string;
  genres: string[];
}

@Component({
  selector: 'app-stand-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stand-card.html',
  styleUrl: './stand-card.css',
})
export class StandCard {
  @Input() stand!: StandData;

  constructor(private router: Router) { }

  goToStand() {
    this.router.navigate(['/estande', this.stand.id]);
    console.log('Navigating to stand:', this.stand.id);
  }
}
