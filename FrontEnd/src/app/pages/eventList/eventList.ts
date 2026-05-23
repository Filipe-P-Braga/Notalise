import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Removido EMPTY porque não será mais utilizado.
import { Subject } from 'rxjs';

// Removido catchError porque o tratamento será feito no subscribe.
import { takeUntil } from 'rxjs/operators';

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

  // Mantido o caminho correto do HTML.
  templateUrl: './eventList.html',

  // Corrigido para usar styleUrls no padrão Angular.
  styleUrls: ['./eventList.css'],
})

export class EventList implements OnInit, OnDestroy {

  events: EventItem[] = [];

  filteredEvents: EventItem[] = [];

  searchQuery = '';

  loading = true;

  error = false;

  // Subject usado para cancelar subscriptions ao destruir o componente.
  private destroy$ = new Subject<void>();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  ngOnInit(): void {

    // Carrega os eventos quando o componente inicia.
    this.loadEvents();

  }


  loadEvents(): void {

    // Ativa estado de loading.
    this.loading = true;

    // Reseta estado de erro.
    this.error = false;

    this.http.get<EventItem[]>(
      'http://localhost:5000/event'
    ).pipe(

      // Cancela automaticamente a requisição ao destruir o componente.
      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {

        // Salva lista original de eventos.
        this.events = data;

        // Inicializa lista filtrada.
        this.filteredEvents = data;

        // Finaliza loading.
        this.loading = false;

      },

      error: (err) => {

        // Exibe erro no console.
        console.error('Erro ao carregar eventos:', err);

        // Ativa flag de erro.
        this.error = true;

        // Finaliza loading mesmo em caso de erro.
        this.loading = false;

      }

    });

  }


  filterEvents(): void {

    // Remove espaços e converte pesquisa para minúsculo.
    const query = this.searchQuery
      .toLowerCase()
      .trim();

    // Se pesquisa estiver vazia, mostra todos os eventos.
    if (!query) {

      this.filteredEvents = this.events;

      return;

    }

    // Filtra eventos com base no texto digitado.
    this.filteredEvents = this.events.filter(event =>

      event.name.toLowerCase().includes(query)

      || event.subtitle?.toLowerCase().includes(query)

      || event.description?.toLowerCase().includes(query)

      || event.genres?.some(g =>
        g.toLowerCase().includes(query)
      )

    );

  }


  goToEvent(id: number): void {

    // Navega para página do evento selecionado.
    this.router.navigate(['/evento', id]);

  }


  getStars(score: number): number[] {

    // Gera array baseado na quantidade de estrelas.
    return Array(
      Math.min(5, Math.max(0, Math.round(score)))
    ).fill(0);

  }


  ngOnDestroy(): void {

    // Emite sinal de destruição.
    this.destroy$.next();

    // Finaliza o Subject.
    this.destroy$.complete();

  }

}