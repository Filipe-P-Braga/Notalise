import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode } from '../../components/qrcode/qrcode';
import { StandCard, StandData } from '../../components/stand-card/stand-card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, Qrcode, StandCard],
  templateUrl: './event.html',
  styleUrl: './event.css',
})

export class Event implements OnInit {


  eventData = {
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
    copyright: ''
  };

  stars = [1, 2, 3, 4, 5];

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

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadEvents(params['id']);
    });
  }

  loadEvents(id?: string): void {
    if (!id) return;

    this.http.get<any>(`http://localhost:5000/event/${id}`)
      .subscribe({
        next: (data) => {
          this.eventData = {
            title: data.name,
            subtitle: data.subtitle || '',
            ratingAge: data.contentRating || 'Livre',
            format: data.format ? data.format.join(' | ') : 'Presencial | Online',
            genres: data.genres || ['Tecnologia', 'Inovação', 'Negócios', 'Universitário'],
            averageRating: data.score || 0,
            totalRatings: '21.5K',
            synopsis: data.description,
            local: data.address,
            date: '12 a 15 de Outubro de 2026',
            contentRating: data.contentRating || 'Livre para todos os públicos',
            copyright: data.copyright
          };

          console.log('Eventos carregados ao abrir a página:', data);
        },
        error: (err) => {
          console.error('Erro ao carregar eventos:', err);
        }
      });
  }
}
