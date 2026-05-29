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

import { environment } from '../../../env/env';

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
  isAnonymous: boolean = false;
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

  stars: number[] = [];

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
            `${environment.apiUrl}/event/${id}`
          ),

          comments: this.commentService
            .getCommentsByEventId(Number(id)),

          stands: this.http.get<any[]>(
            `${environment.apiUrl}/stand/event/${id}`
          )

        });

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: ({ event, comments, stands }) => {

        console.log('Evento carregado:', event);

        const ratings = this.calculateRatings(comments, event.score);

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

          averageRating: ratings.averageRating,

          totalRatings: ratings.totalRatings,

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

        const roundedScore =
          Math.round(
            this.eventData.averageRating
          );

        this.stars =
          Array(roundedScore).fill(0);

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

  calculateRatings(comments: any[], fallbackScore: number): { averageRating: number, totalRatings: string } {
    const commentsList = comments || [];
    const totalRatingsCount = commentsList.length;
    let averageRating = 0;
    if (totalRatingsCount > 0) {
      const totalScore = commentsList.reduce((sum: number, c: any) => sum + (c.score || c.Score || 0), 0);
      averageRating = parseFloat((totalScore / totalRatingsCount).toFixed(1));
    } else {
      averageRating = fallbackScore || 0;
    }
    return {
      averageRating,
      totalRatings: totalRatingsCount.toString()
    };
  }

  loadComments(id: number) {

    this.commentService.getCommentsByEventId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {

        const ratings = this.calculateRatings(data, this.eventData?.averageRating);

        this.eventData = {
          ...this.eventData,
          averageRating: ratings.averageRating,
          totalRatings: ratings.totalRatings,
          comments: data
        };

        const roundedScore =
          Math.round(
            this.eventData.averageRating
          );

        this.stars =
          Array(roundedScore).fill(0);

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
      const el = document.getElementById('stands-section');
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
