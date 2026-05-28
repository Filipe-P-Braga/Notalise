import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Qrcode } from '../../components/qrcode/qrcode';
import { Comments } from '../../components/comments/comments';
import { AuthService } from '../../services/auth.service';
import { ComentCreateComponent } from '../../components/comentCreate/comentCreate';
import { CommentService } from '../../services/comment.service';
import { ShareButtonComponent } from '../../components/share-button/share-button';


// - switchMap permite reagir à mudança da rota automaticamente.
// - forkJoin permite carregar stand + comentários juntos.
import { Subject, forkJoin } from 'rxjs';

import {
  takeUntil,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-stand',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Qrcode,
    Comments,
    ComentCreateComponent,
    ShareButtonComponent
  ],
  templateUrl: './stand.html',
  styleUrl: './stand.css',
})

export class Stand implements OnInit, OnDestroy {

  // Mantemos o destroy$ para evitar vazamentos de memória.
  private destroy$ = new Subject<void>();

  isOrganizador: boolean = false;
  selectedStand: any;

  eventData = {
    title: 'Notalise',
    subtitle: '',
    ratingAge: 'Livre',
    format: 'Presencial | Online',
    genres: ['Tecnologia', 'Inovação', 'Negócios', 'Universitário'],
    averageRating: 4.9,
    totalRatings: '21.5K',
    synopsis: '',
    local: '',
    date: '12 a 15 de Outubro de 2026',
    contentRating: '',
    copyright: '',
    image: ''
  };


  starStates: ('full' | 'half' | 'empty')[] = [];

  constructor(
    private commentService: CommentService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) { }


  onCommentCreated() {

    if (!this.selectedStand?.id) return;

    this.loadComments(this.selectedStand.id);
  }

  showDetails = true;

  scrollToComments() {
    // Pequeno delay para garantir que a renderização ocorra antes do scroll
    setTimeout(() => {
      const el = document.getElementById('comments-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
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

  ngOnInit() {

    this.isOrganizador = this.authService.getRole() === 'organizador';

    this.route.paramMap.pipe(


      switchMap(params => {

        const id = params.get('id');

        if (!id) {
          throw new Error('ID do stand inválido');
        }

        return forkJoin({

          stand: this.http.get<any>(
            `http://localhost:5000/stand/${id}`
          ),

          comments: this.commentService.getCommentsByStandId(Number(id))

        });

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: ({ stand, comments }) => {

        console.log('Stand carregado:', stand);

        this.selectedStand = {
          ...stand,
          comments
        };

        const commentCount = comments?.length ?? 0;
        const averageFromComments = this.calculateAverageRating(comments, stand.score);

        this.eventData = {
          title: stand.name,
          subtitle: stand.subtitle || '',
          ratingAge: stand.contentRating || 'Livre',

          format: stand.format
            ? stand.format.join(' | ')
            : 'Presencial | Online',

          genres: stand.genres || [
            'Tecnologia',
            'Inovação',
            'Negócios',
            'Universitário'
          ],

          averageRating: averageFromComments,

          totalRatings: commentCount.toString(),

          synopsis: stand.description,

          local: stand.local,

          date: '12 a 15 de Outubro de 2026',

          contentRating:
            stand.contentRating
            || 'Livre para todos os públicos',

          copyright: stand.copyright,

          image: stand.image || ''
        };

        this.starStates = this.buildStarStates(this.eventData.averageRating);

        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Erro ao carregar stand:', err);
      }

    });

  }

  loadComments(id: number) {

    this.commentService.getCommentsByStandId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {
        const averageFromComments = this.calculateAverageRating(data, this.eventData.averageRating);
        const commentCount = data?.length ?? 0;

        this.selectedStand = {
          ...this.selectedStand,
          comments: data
        };

        this.eventData = {
          ...this.eventData,
          averageRating: averageFromComments,
          totalRatings: commentCount.toString()
        };

        this.starStates = this.buildStarStates(averageFromComments);
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


  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();
  }

}