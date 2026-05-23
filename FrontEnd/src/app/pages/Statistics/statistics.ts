import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { Comments } from '../../components/comments/comments';

import { EventService } from '../../services/event.service';

import { CommentService } from '../../services/comment.service';

import { UserActivityService } from '../../services/userActivity.service';

import {
  Subject,
  BehaviorSubject,
  forkJoin,
  EMPTY
} from 'rxjs';

import {
  takeUntil,
  switchMap,
  tap,
  catchError
} from 'rxjs/operators';


@Component({
  selector: 'app-statistics',

  standalone: true,

  imports: [
    CommonModule,
    Comments
  ],

  templateUrl: './statistics.html',

  styleUrls: ['./statistics.css'],
})

export class StatisticsPage implements OnInit, OnDestroy {

  // =========================
  // DESTROY
  // =========================

  private destroy$ = new Subject<void>();


  // =========================
  // REFRESH STREAM
  // =========================

  private refresh$ = new BehaviorSubject<void>(undefined);


  // =========================
  // STATE
  // =========================

  eventId?: number;

  eventDetails: any = null;

  comments: any[] = [];

  loading = false;

  errorMessage = '';


  // =========================
  // SATISFACTION
  // =========================

  satisfactionData = [
    { label: 'Baixa', value: 0, color: '#ef4444' },
    { label: 'Média', value: 0, color: '#f59e0b' },
    { label: 'Alta', value: 0, color: '#10b981' }
  ];


  // =========================
  // PIE CHART
  // =========================

  evaluationPieData = [
    { label: 'Avaliaram', value: 0, color: '#10b981' },
    { label: 'Não Avaliaram', value: 0, color: '#ef4444' }
  ];


  // =========================
  // HOURLY COUNT
  // =========================

  hourlyCountData = [
    { label: '02h', value: 0, heightPercent: 0 },
    { label: '04h', value: 0, heightPercent: 0 },
    { label: '06h', value: 0, heightPercent: 0 },
    { label: '08h', value: 0, heightPercent: 0 },
    { label: '10h', value: 0, heightPercent: 0 },
    { label: '12h', value: 0, heightPercent: 0 },
    { label: '14h', value: 0, heightPercent: 0 },
    { label: '16h', value: 0, heightPercent: 0 },
    { label: '18h', value: 0, heightPercent: 0 },
    { label: '20h', value: 0, heightPercent: 0 },
    { label: '22h', value: 0, heightPercent: 0 },
    { label: '24h', value: 0, heightPercent: 0 }
  ];


  // =========================
  // HOURLY AVERAGE
  // =========================

  hourlyAverageData = [
    { label: '02h', value: 0, heightPercent: 0 },
    { label: '04h', value: 0, heightPercent: 0 },
    { label: '06h', value: 0, heightPercent: 0 },
    { label: '08h', value: 0, heightPercent: 0 },
    { label: '10h', value: 0, heightPercent: 0 },
    { label: '12h', value: 0, heightPercent: 0 },
    { label: '14h', value: 0, heightPercent: 0 },
    { label: '16h', value: 0, heightPercent: 0 },
    { label: '18h', value: 0, heightPercent: 0 },
    { label: '20h', value: 0, heightPercent: 0 },
    { label: '22h', value: 0, heightPercent: 0 },
    { label: '24h', value: 0, heightPercent: 0 }
  ];


  // =========================
  // EVENTS
  // =========================

  events: any[] = [];


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private eventService: EventService,

    private commentService: CommentService,

    private userActivityService: UserActivityService,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) { }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.refresh$.pipe(

      tap(() => {

        this.loading = true;

        this.errorMessage = '';

      }),

      switchMap(() =>

        this.route.paramMap.pipe(

          switchMap(params => {

            const idParam = params.get('id');

            const id = idParam
              ? Number(idParam)
              : null;

            if (!id || Number.isNaN(id)) {

              this.errorMessage =
                'ID inválido';

              return EMPTY;

            }

            this.eventId = id;

            return forkJoin({

              event: this.eventService
                .getEventById(id),

              comments: this.commentService
                .getCommentsByEventId(id),

              activities: this.userActivityService
                .getUserActivities()

            });

          })

        )

      ),

      catchError((err) => {

        console.error(err);

        this.errorMessage =
          'Erro ao carregar estatísticas';

        this.loading = false;

        return EMPTY;

      }),

      takeUntil(this.destroy$)

    ).subscribe({

      next: ({ event, comments, activities }) => {

        // =========================
        // EVENT DETAILS
        // =========================

        this.eventDetails = event;


        // =========================
        // COMMENTS
        // =========================

        this.comments = comments;


        // =========================
        // SATISFACTION
        // =========================

        this.updateSatisfaction();


        // =========================
        // HOURLY STATS
        // =========================

        this.calculateHourlyStats();


        // =========================
        // FILTER ACTIVITIES
        // =========================

        const filtered = activities.filter(activity => {

          const actEventId =
            activity.eventId ?? activity.EventId;

          return actEventId === this.eventId;

        });


        // =========================
        // EVALUATED
        // =========================

        const evaluated = filtered.filter(activity => {

          const hasEvaluated =
            activity.avaliou ?? activity.Avaliou;

          return hasEvaluated === true
            || hasEvaluated === 1
            || hasEvaluated === 'true';

        }).length;


        // =========================
        // NOT EVALUATED
        // =========================

        const notEvaluated = filtered.filter(activity => {

          const hasEvaluated =
            activity.avaliou ?? activity.Avaliou;

          return hasEvaluated === false
            || hasEvaluated === 0
            || hasEvaluated === 'false';

        }).length;


        // =========================
        // UPDATE PIE CHART
        // =========================

        this.evaluationPieData = [

          {
            label: 'Avaliaram',
            value: evaluated,
            color: '#10b981'
          },

          {
            label: 'Não Avaliaram',
            value: notEvaluated,
            color: '#ef4444'
          }

        ];


        // =========================
        // FINALIZE
        // =========================

        this.loading = false;

        this.cdr.detectChanges();

      }

    });


    // =========================
    // FIRST LOAD
    // =========================

    this.refresh();

  }


  // =========================
  // REFRESH
  // =========================

  refresh(): void {

    this.refresh$.next();

  }


  // =========================
  // TOGGLE EVENT
  // =========================

  toggleEvent(eventId: number): void {

    const event = this.events.find(e =>

      e.id === eventId
      || e.Id === eventId

    );

    if (event) {

      event.isOpen = !event.isOpen;

    }

  }


  // =========================
  // SATISFACTION
  // =========================

  updateSatisfaction(): void {

    const low = this.comments.filter(comment => {

      const score =
        comment.score ?? comment.Score ?? 0;

      return score >= 1 && score <= 3;

    }).length;


    const medium = this.comments.filter(comment => {

      const score =
        comment.score ?? comment.Score ?? 0;

      return score === 4;

    }).length;


    const high = this.comments.filter(comment => {

      const score =
        comment.score ?? comment.Score ?? 0;

      return score === 5;

    }).length;


    this.satisfactionData = [

      {
        label: 'Baixa',
        value: low,
        color: '#ef4444'
      },

      {
        label: 'Média',
        value: medium,
        color: '#f59e0b'
      },

      {
        label: 'Alta',
        value: high,
        color: '#10b981'
      }

    ];

  }


  // =========================
  // DONUT BACKGROUND
  // =========================

  get donutBackground(): string {

    let currentPercent = 0;

    const total =
      this.satisfactionData.reduce(

        (sum, item) => sum + item.value,

        0

      ) || 1;


    const gradients =
      this.satisfactionData.map(item => {

        const start = currentPercent;

        currentPercent +=
          (item.value / total) * 100;

        return `${item.color} ${start}% ${currentPercent}%`;

      });

    return `conic-gradient(${gradients.join(',')})`;

  }


  // =========================
  // PIE BACKGROUND
  // =========================

  get pieBackground(): string {

    const total =
      this.evaluationPieData.reduce(

        (sum, item) => sum + item.value,

        0

      );

    if (total === 0) {

      return 'conic-gradient(#64748b 0% 100%)';

    }

    let currentPercent = 0;

    const gradients =
      this.evaluationPieData.map(item => {

        const start = currentPercent;

        currentPercent +=
          (item.value / total) * 100;

        return `${item.color} ${start}% ${currentPercent}%`;

      });

    return `conic-gradient(${gradients.join(',')})`;

  }


  // =========================
  // HOURLY STATS
  // =========================

  calculateHourlyStats(): void {

    const counts =
      new Array(12).fill(0);

    const scoreSums =
      new Array(12).fill(0);

    const scoreCounts =
      new Array(12).fill(0);


    this.comments.forEach(comment => {

      const dateStr =
        comment.date ?? comment.Date;

      if (!dateStr) return;

      let hour = 0;

      const match =
        dateStr.match(/[T ](\d{2}):/);

      if (match) {

        hour = parseInt(match[1], 10);

      } else {

        const dateObj =
          new Date(dateStr);

        if (isNaN(dateObj.getTime())) return;

        hour = dateObj.getHours();

      }

      const bucketIndex =
        Math.floor(hour / 2);

      if (bucketIndex >= 0 && bucketIndex < 12) {

        counts[bucketIndex]++;

        const score =
          comment.score ?? comment.Score;

        if (score !== undefined && score !== null) {

          scoreSums[bucketIndex] += Number(score);

          scoreCounts[bucketIndex]++;

        }

      }

    });


    const labels = [
      '02h',
      '04h',
      '06h',
      '08h',
      '10h',
      '12h',
      '14h',
      '16h',
      '18h',
      '20h',
      '22h',
      '24h'
    ];


    const maxCount =
      Math.max(...counts, 1);


    this.hourlyCountData =
      counts.map((count, index) => ({

        label: labels[index],

        value: count,

        heightPercent:
          (count / maxCount) * 100

      }));


    const averages =
      scoreSums.map((sum, index) => {

        const cnt = scoreCounts[index];

        return cnt > 0
          ? Number((sum / cnt).toFixed(2))
          : 0;

      });


    this.hourlyAverageData =
      averages.map((avg, index) => ({

        label: labels[index],

        value: avg,

        heightPercent:
          (avg / 5.0) * 100

      }));

  }


  // =========================
  // DESTROY
  // =========================

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}