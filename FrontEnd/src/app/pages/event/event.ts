import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode } from '../../components/qrcode/qrcode';
import { StandCard, StandData } from '../../components/stand-card/stand-card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';  

import { Comments } from '../../components/comments/comments';
import { ComentCreateComponent } from '../../components/comentCreate/comentCreate';
import { CommentService } from '../../services/comment.service';
import { ShareButtonComponent } from '../../components/share-button/share-button';

import { EMPTY, forkJoin } from 'rxjs';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, Qrcode, StandCard, RouterModule, Comments, ComentCreateComponent, ShareButtonComponent],
  templateUrl: './event.html',
  styleUrl: './event.css',
})

export class Event implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  isOrganizador: boolean = false;
  eventData = {
    eventId: 0,
    title: '',
    subtitle: '',
    ratingAge: '',
    format: '',
    genres: [''],
    averageRating: 0.0,
    totalRatings: '',
    synopsis: '',
    local: '',
    date: '',
    contentRating: '',
    copyright: '',
    image: '',
    comments: [] as any[]
  };

  starStates: ('full' | 'half' | 'empty')[] = [];

  stands: StandData[] = [
    {
      id: 1,
      name: 'Notalise',
      subtitle: 'A01',
      date: '12/10/2026',
      description: 'No maior evento de inovação do estado, alunos apresentam projetos que podem mudar o mundo. Durante as exposições, visitantes avaliam estandes e descobrem o "absoluto segredo" do empreendedorismo moderno. Esta é a história de inovações que encontram desafios, mas alcançam o sucesso.',
      image: '/tamanduA.webp',
      genres: ['Inovação', 'Software']
    },

  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  , private commentService: CommentService) { }
  
  onImageError(event: any) {
  event.target.src = 'ShowInova.jpg';
}
  ngOnInit(): void {
    this.isOrganizador = this.authService.getRole() === 'organizador';
    console.log('Evento iniciado, carregando dados...');

    this.route.paramMap.pipe(

      switchMap(params => {

        const id = params.get('id');

        if (!id) {

          console.error('ID do evento inválido');

          return EMPTY;
        }

        return forkJoin({

          event: this.http.get<any>(
            `http://localhost:5000/event/${id}`
          ),

          comments: this.commentService
            .getCommentsByEventId(Number(id)),

          stands: this.http.get<any[]>(
            `http://localhost:5000/stand/event/${id}`
          )

        });

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: ({ event, comments, stands }) => {

        console.log('Evento carregado:', event);

        const commentCount = comments?.length ?? 0;
        const averageFromComments = this.calculateAverageRating(comments, event.score);

        this.eventData = {

          eventId: event.id || 0,

          title: event.name,

          subtitle: event.subtitle || '',

          ratingAge:
            event.contentRating || 'Livre',

          format: event.format
            ? event.format.join(' | ')
            : 'Presencial | Online',

          genres: event.genres || [
            'Tecnologia',
            'Inovação',
            'Negócios',
            'Universitário'
          ],

          averageRating: averageFromComments,

          totalRatings: commentCount.toString(),

          synopsis: event.description,

          local: event.address,

          date: '12 a 15 de Outubro de 2026',

          contentRating:
            event.contentRating
            || 'Livre para todos os públicos',

          copyright:
            event.copyright,

          image:
            event.image || '',

          comments
        };

        this.stands = stands.map((stand: any) => ({
          id: stand.id,
          name: stand.name,
          subtitle: stand.subtitle || '',
          date: stand.date || '',
          description: stand.description || '',
          image: stand.image || '',
          genres: stand.genres || []
        }));

        this.starStates = this.buildStarStates(this.eventData.averageRating);

        this.cdr.markForCheck();
      },

      error: (err) => {

        console.error(
          'Erro ao carregar evento:',
          err
        );
      }

    });

  }
  loadComments(id: number) {

    this.commentService.getCommentsByEventId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {
        const averageFromComments = this.calculateAverageRating(data);
        const commentCount = data?.length ?? 0;

        this.eventData = {
          ...this.eventData,
          comments: data,
          averageRating: averageFromComments,
          totalRatings: commentCount.toString()
        };

        this.starStates = this.buildStarStates(averageFromComments);
        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error(
          'Erro ao buscar comentários do evento',
          err
        );
      }

    });

  }
  
  onCommentCreated() {

    if (!this.eventData?.eventId) return;

    this.loadComments(this.eventData.eventId);
  }

  calculateAverageRating(comments: any[], fallbackScore = 0): number {
    if (!comments || comments.length === 0) {
      return fallbackScore || 0;
    }

    const total = comments.reduce((sum, comment) => {
      const score = comment?.score ?? comment?.Score ?? 0;
      return sum + Number(score);
    }, 0);

    const average = total / comments.length;
    return Number(average.toFixed(1));
  }

  buildStarStates(rating: number): ('full' | 'half' | 'empty')[] {
    const fullStars = Math.floor(rating);
    const fraction = rating - fullStars;
    const hasHalf = fraction >= 0.25 && fraction < 0.75;
    const roundUp = fraction >= 0.75;
    const states: ('full' | 'half' | 'empty')[] = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        states.push('full');
      } else if (i === fullStars && hasHalf) {
        states.push('half');
      } else if (i === fullStars && roundUp) {
        states.push('full');
      } else {
        states.push('empty');
      }
    }

    if (roundUp && fullStars < 5) {
      states[fullStars] = 'full';
    }

    return states;
  }

  scrollToComments() {
    // Pequeno delay para garantir que a seção esteja renderizada
    setTimeout(() => {
      const el = document.getElementById('comments-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  showDetails = true;

  scrollToStands() {
    setTimeout(() => {
      const el = document.getElementById('create-comment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
