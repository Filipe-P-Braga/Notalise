import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface EventItem {
  id: number;
  name: string;
  subtitle?: string;
  address?: string;
  description?: string;
  image?: string;
  score: number;
  genres?: string[];
  format?: string[];
}

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class EventList implements OnInit {
  events: EventItem[] = [];
  filteredEvents: EventItem[] = [];
  searchQuery = '';
  loading = true;
  error = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = false;
    this.http.get<EventItem[]>('http://localhost:5000/event')
      .subscribe({
        next: (data) => {
          this.events = data;
          this.filteredEvents = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar eventos:', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  filterEvents(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredEvents = this.events;
      return;
    }
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(query) ||
      event.subtitle?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.genres?.some(g => g.toLowerCase().includes(query))
    );
  }

  goToEvent(id: number): void {
    this.router.navigate(['/evento', id]);
  }

  getStars(score: number): number[] {
    return Array(Math.min(5, Math.max(0, Math.round(score)))).fill(0);
  }
}
