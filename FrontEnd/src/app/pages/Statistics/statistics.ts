import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comments } from '../../components/comments/comments';
import { EventService } from '../../services/event.service';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { UserActivityService } from '../../services/userActivity.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, Comments],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css'],
})
export class StatisticsPage implements OnInit {
  eventId?: number;
  eventDetails: any = null;
  comments: any[] = [];
  satisfactionData = [
    { label: 'Baixa', value: 0, color: '#ef4444' },
    { label: 'Média', value: 0, color: '#f59e0b' },
    { label: 'Alta', value: 0, color: '#10b981' }
  ];
  loading = false;
  errorMessage = '';
  
  evaluationPieData = [
    { label: 'Avaliaram', value: 0, color: '#10b981' },
    { label: 'Não Avaliaram', value: 0, color: '#ef4444' }
  ];

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
  
  barData = [
    { label: 'Jan', value: 30 },
    { label: 'Fev', value: 50 },
    { label: 'Mar', value: 80 },
    { label: 'Abr', value: 40 },
    { label: 'Mai', value: 90 },
    { label: 'Jun', value: 60 }
  ];

  events: any[] = [];

  toggleEvent(eventId: number): void {
    const event = this.events.find(e => e.id === eventId || e.Id === eventId);
    if (event) {
      event.isOpen = !event.isOpen;
    }
  }

  constructor(
    private eventService: EventService,
    private commentService: CommentService,
    private userActivityService: UserActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id || Number.isNaN(id)) {
      this.errorMessage = 'ID de evento inválido na URL.';
      return;
    }

    this.eventId = id;
    this.loadEvent(id);
    this.loadComments(id);
    this.loadUserActivities(id);
  }

  loadEvent(eventId: number): void {
    this.loading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: event => {
        this.eventDetails = event;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar informações do evento.';
        this.loading = false;
      }
    });
  }

  loadComments(eventId: number): void {
    this.loading = true;
    this.commentService.getCommentsByEventId(eventId).subscribe({
      next: comments => {
        this.comments = comments;
        this.updateSatisfaction();
        this.calculateHourlyStats();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar estatísticas de satisfação.';
        this.loading = false;
      }
    });
  }

  updateSatisfaction(): void {
    const low = this.comments.filter(comment => {
      const score = comment.score ?? comment.Score ?? 0;
      return score >= 1 && score <= 3;
    }).length;

    const medium = this.comments.filter(comment => {
      const score = comment.score ?? comment.Score ?? 0;
      return score === 4;
    }).length;

    const high = this.comments.filter(comment => {
      const score = comment.score ?? comment.Score ?? 0;
      return score === 5;
    }).length;

    this.satisfactionData = [
      { label: 'Baixa', value: low, color: '#ef4444' },
      { label: 'Média', value: medium, color: '#f59e0b' },
      { label: 'Alta', value: high, color: '#10b981' }
    ];
  }

  get donutBackground(): string {
    let currentPercent = 0;
    const total = this.satisfactionData.reduce((sum, item) => sum + item.value, 0) || 1;

    const gradients = this.satisfactionData.map(item => {
      const start = currentPercent;
      currentPercent += (item.value / total) * 100;
      return `${item.color} ${start}% ${currentPercent}%`;
    });

    return `conic-gradient(${gradients.join(',')})`;
  }

  loadUserActivities(eventId: number): void {
    this.userActivityService.getUserActivities().subscribe({
      next: activities => {
        const filtered = activities.filter(activity => {
          const actEventId = activity.eventId ?? activity.EventId;
          return actEventId === eventId;
        });

        const evaluated = filtered.filter(activity => {
          const hasEvaluated = activity.avaliou ?? activity.Avaliou;
          return hasEvaluated === true || hasEvaluated === 1 || hasEvaluated === 'true';
        }).length;

        const notEvaluated = filtered.filter(activity => {
          const hasEvaluated = activity.avaliou ?? activity.Avaliou;
          return hasEvaluated === false || hasEvaluated === 0 || hasEvaluated === 'false';
        }).length;

        this.evaluationPieData = [
          { label: 'Avaliaram', value: evaluated, color: '#10b981' },
          { label: 'Não Avaliaram', value: notEvaluated, color: '#ef4444' }
        ];
      },
      error: () => {
        console.error('Erro ao carregar atividades do usuário.');
      }
    });
  }

  get pieBackground(): string {
    const total = this.evaluationPieData.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
      return 'conic-gradient(#64748b 0% 100%)';
    }

    let currentPercent = 0;
    const gradients = this.evaluationPieData.map(item => {
      const start = currentPercent;
      currentPercent += (item.value / total) * 100;
      return `${item.color} ${start}% ${currentPercent}%`;
    });

    return `conic-gradient(${gradients.join(',')})`;
  }

  calculateHourlyStats(): void {
    const counts = new Array(12).fill(0);
    const scoreSums = new Array(12).fill(0);
    const scoreCounts = new Array(12).fill(0);

    this.comments.forEach(comment => {
      const dateStr = comment.date ?? comment.Date;
      if (!dateStr) return;

      let hour = 0;
      // Extrai a hora diretamente da string para evitar distorções causadas pelo fuso horário (timezone offset)
      const match = dateStr.match(/[T ](\d{2}):/);
      if (match) {
        hour = parseInt(match[1], 10);
      } else {
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return;
        hour = dateObj.getHours();
      }

      const bucketIndex = Math.floor(hour / 2);

      if (bucketIndex >= 0 && bucketIndex < 12) {
        counts[bucketIndex]++;
        
        const score = comment.score ?? comment.Score;
        if (score !== undefined && score !== null) {
          scoreSums[bucketIndex] += Number(score);
          scoreCounts[bucketIndex]++;
        }
      }
    });

    const labels = ['02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];

    const maxCount = Math.max(...counts, 1);
    this.hourlyCountData = counts.map((count, index) => ({
      label: labels[index],
      value: count,
      heightPercent: (count / maxCount) * 100
    }));

    const averages = scoreSums.map((sum, index) => {
      const cnt = scoreCounts[index];
      return cnt > 0 ? Number((sum / cnt).toFixed(2)) : 0;
    });
    this.hourlyAverageData = averages.map((avg, index) => ({
      label: labels[index],
      value: avg,
      heightPercent: (avg / 5.0) * 100
    }));
  }
}
