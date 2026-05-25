import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode } from '../../components/qrcode/qrcode';
import { StandCard, StandData } from '../../components/stand-card/stand-card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';  

import { Comments } from '../../components/comments/comments';
import { ComentCreateComponent } from '../../components/comentCreate/comentCreate';
import { CommentService } from '../../services/comment.service';

import { EMPTY, forkJoin } from 'rxjs';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, Qrcode, StandCard, RouterModule, Comments, ComentCreateComponent],
  templateUrl: './event.html',
  styleUrl: './event.css',
})

export class Event implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private commentService: CommentService) { }
  
  onImageError(event: any) {
  event.target.src = 'ShowInova.jpg';
}
  ngOnInit(): void {

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
            .getCommentsByEventId(Number(id))

        });

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: ({ event, comments }) => {

        console.log('Evento carregado:', event);

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

          averageRating: event.score || 0,

          totalRatings: '21.5K',

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
  loadComments(id: number) {

    this.commentService.getCommentsByEventId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {

        this.eventData = {
          ...this.eventData,
          comments: data
        };

        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error(
          'Erro ao buscar comentários do stand',
          err
        );
      }

    });

  }
  
  onCommentCreated() {

    if (!this.eventData?.eventId) return;

    this.loadComments(this.eventData.eventId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
