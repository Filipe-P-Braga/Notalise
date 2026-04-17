import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  @Input() comments: any[] = [];

  getStarArray(stars: number) {
    return Array(stars).fill(0);
  }
}
