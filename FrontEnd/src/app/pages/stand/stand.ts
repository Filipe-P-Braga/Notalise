import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Qrcode } from '../../components/qrcode/qrcode';
import { Comments } from '../../components/comments/comments';
import { AuthService } from '../../services/auth.service';
import { ComentCreateComponent } from '../../components/comentCreate/comentCreate';
import { CommentService } from '../../services/comment.service';


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
    ComentCreateComponent
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

          averageRating: stand.score || 0,

          totalRatings: '21.5K',

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

  loadComments(id: number) {

    this.commentService.getCommentsByStandId(id).pipe(

      takeUntil(this.destroy$)

    ).subscribe({

      next: (data) => {

        this.selectedStand = {
          ...this.selectedStand,
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


  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();
  }

}