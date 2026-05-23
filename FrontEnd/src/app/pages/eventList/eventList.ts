import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import {
  Subject,
  BehaviorSubject,
  combineLatest,
  EMPTY
} from 'rxjs';

import {
  takeUntil,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  catchError
} from 'rxjs/operators';


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

  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  templateUrl: './eventList.html',

  styleUrls: ['./eventList.css'],
})

export class EventList implements OnInit, OnDestroy {

  // =========================
  // STATE
  // =========================

  events: EventItem[] = [];

  filteredEvents: EventItem[] = [];

  searchQuery = '';

  loading = true;

  error = false;


  // =========================
  // REACTIVE STREAMS
  // =========================

  private destroy$ = new Subject<void>();

  // Responsável por disparar recargas da API.
  private refreshEvents$ = new BehaviorSubject<void>(undefined);

  // Responsável pela pesquisa reativa.
  private searchQuery$ = new BehaviorSubject<string>('');


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private http: HttpClient,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) {}


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    // =========================================
    // STREAM DE EVENTOS
    // =========================================
    //
    // Toda vez que refreshEvents$ emitir:
    // - ativa loading
    // - faz request
    // - cancela request anterior se necessário
    // - salva dados
    //
    const events$ = this.refreshEvents$.pipe(

      tap(() => {

        this.loading = true;

        this.error = false;

      }),

      switchMap(() =>

        this.http.get<EventItem[]>(
          'http://localhost:5000/event'
        ).pipe(

          tap((data) => {

            this.events = data;

          }),

          catchError((err) => {

            console.error(
              'Erro ao carregar eventos:',
              err
            );

            this.error = true;

            this.loading = false;

            return EMPTY;

          })

        )

      )

    );


    // =========================================
    // COMBINA EVENTOS + PESQUISA
    // =========================================
    //
    // Sempre que:
    // - eventos mudarem
    // OU
    // - texto pesquisado mudar
    //
    // o filtro é recalculado.
    //
    combineLatest([

      events$,

      this.searchQuery$.pipe(

        debounceTime(200),

        distinctUntilChanged()

      )

    ]).pipe(

      map(([events, query]) => {

        const normalizedQuery = query
          .toLowerCase()
          .trim();

        // Sem pesquisa → retorna tudo.
        if (!normalizedQuery) {

          return events;

        }

        // Filtra eventos.
        return events.filter(event =>

          event.name
            .toLowerCase()
            .includes(normalizedQuery)

          || event.subtitle
            ?.toLowerCase()
            .includes(normalizedQuery)

          || event.description
            ?.toLowerCase()
            .includes(normalizedQuery)

          || event.genres?.some(g =>

            g.toLowerCase()
              .includes(normalizedQuery)

          )

        );

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: (filtered) => {

        // Atualiza lista filtrada.
        this.filteredEvents = filtered;

        // Finaliza loading.
        this.loading = false;

        // Força atualização visual.
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(
          'Erro no fluxo reativo:',
          err
        );

        this.error = true;

        this.loading = false;

      }

    });


    // =========================================
    // PRIMEIRA CARGA
    // =========================================

    this.refreshEvents$.next();

  }


  // =========================
  // PESQUISA
  // =========================

  onSearchChange(value: string): void {

    // Mantém valor sincronizado no HTML.
    this.searchQuery = value;

    // Dispara fluxo reativo.
    this.searchQuery$.next(value);

  }


  // =========================
  // RECARREGAR EVENTOS
  // =========================

  refreshEvents(): void {

    this.refreshEvents$.next();

  }


  // =========================
  // NAVEGAÇÃO
  // =========================

  goToEvent(id: number): void {

    this.router.navigate([
      '/evento',
      id
    ]);

  }


  // =========================
  // ESTRELAS
  // =========================

  getStars(score: number): number[] {

    return Array(

      Math.min(
        5,
        Math.max(0, Math.round(score))
      )

    ).fill(0);

  }


  // =========================
  // DESTROY
  // =========================

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}