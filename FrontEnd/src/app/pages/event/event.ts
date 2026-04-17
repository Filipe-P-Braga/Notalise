import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode } from '../../components/qrcode/qrcode';
import { StandCard, StandData } from '../../components/stand-card/stand-card';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, Qrcode, StandCard],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class Event {
  eventData = {
    title: 'Inovaweek',
    subtitle: '2026',
    ratingAge: 'Livre',
    format: 'Presencial | Online',
    genres: ['Tecnologia', 'Inovação', 'Negócios', 'Universitário'],
    averageRating: 4.9,
    totalRatings: '21.5K',
    synopsis: 'No maior evento de inovação do estado, alunos apresentam projetos que podem mudar o mundo. Durante as exposições, visitantes avaliam estandes e descobrem o "absoluto segredo" do empreendedorismo moderno. Esta é a história de inovações que encontram desafios, mas alcançam o sucesso.',
    local: 'Campus Boa Vista (UVV), Vila Velha',
    date: '12 a 15 de Outubro de 2026',
    contentRating: 'Livre para todos os públicos',
    copyright: '©Universidade Vila Velha / Notalise'
  };

  stars = [1, 2, 3, 4, 5];

  stands: StandData[] = [
    {
      id: 'stand-1',
      category: 'Eventos',
      title: 'Notalise',
      badge: 'A01',
      date: '12/10/2026',
      description: 'No maior evento de inovação do estado, alunos apresentam projetos que podem mudar o mundo. Durante as exposições, visitantes avaliam estandes e descobrem o "absoluto segredo" do empreendedorismo moderno. Esta é a história de inovações que encontram desafios, mas alcançam o sucesso.',
      image: '/tamanduA.webp',
      tags: ['Inovação', 'Software']
    }

  ];
}
