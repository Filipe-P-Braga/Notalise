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

import { environment } from '../../../env/env';

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
  isAnonymous: boolean = false;

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


  stars = [1, 2, 3, 4, 5];

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
      const el = document.getElementById('create-comment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  ngOnInit() {

    this.isOrganizador = this.authService.getRole() === 'organizador';
    this.isAnonymous = this.authService.getRole() === 'anonimo';

    this.route.paramMap.pipe(


      switchMap(params => {

        const id = params.get('id');

        if (!id) {
          throw new Error('ID do stand inválido');
        }

        return forkJoin({

          stand: this.http.get<any>(
            `${environment.apiUrl}/stand/${id}`
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

        const ratings = this.calculateRatings(comments, stand.score);

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

          averageRating: ratings.averageRating,

          totalRatings: ratings.totalRatings,

          synopsis: stand.description,

          local: stand.local,

          date: '12 a 15 de Outubro de 2026',

          contentRating:
            stand.contentRating
            || 'Livre para todos os públicos',

          copyright: stand.copyright,

          image: stand.image || ''
        };

        const roundedScore =
          Math.round(this.eventData.averageRating);

        this.stars = Array(roundedScore).fill(0);

        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Erro ao carregar stand:', err);
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

    this.commentService.getCommentsByStandId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {

        this.selectedStand = {
          ...this.selectedStand,
          comments: data
        };

        const ratings = this.calculateRatings(data, this.selectedStand?.score);

        this.eventData = {
          ...this.eventData,
          averageRating: ratings.averageRating,
          totalRatings: ratings.totalRatings
        };

        const roundedScore =
          Math.round(this.eventData.averageRating);

        this.stars = Array(roundedScore).fill(0);

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