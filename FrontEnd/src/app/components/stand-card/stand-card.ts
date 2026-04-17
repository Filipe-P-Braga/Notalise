import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

export interface StandData {
  id: string;
  category: string;
  title: string;
  badge: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
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
    // Navigate to the stand page
    // Replace '/stand' with your actual stand route path
    this.router.navigate(['/estande']);
    console.log('Navigating to stand:', this.stand.id);
  }
}
