import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qrcode } from '../../components/qrcode/qrcode';
import { Comments } from '../../components/comments/comments';

@Component({
  selector: 'app-stand',
  standalone: true,
  imports: [CommonModule, Qrcode, Comments],
  templateUrl: './stand.html',
  styleUrl: './stand.css',
})
export class Stand {
  selectedStand: any;

  eventData = {
    title: 'Notalise',
    subtitle: '',
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

  stands = [
    {
      id: 101,
      name: 'Smart City UVV',
      course: 'Ciência da Computação',
      rating: 4.8,
      comments: [
        { user: 'Maria Silva', text: 'Excelente projeto, muito inovador!', stars: 5 },
        { user: 'João Pedro', text: 'Gostei muito da aplicação prática.', stars: 4 }
      ]
    },
    {
      id: 102,
      name: 'Tech Health',
      course: 'Engenharia Biomédica',
      rating: 4.5,
      comments: [
        { user: 'Ana Clara', text: 'Apresentação impecável, parabéns à equipe.', stars: 5 }
      ]
    }
  ];

  stars = [1, 2, 3, 4, 5];

  constructor() {
    this.selectedStand = this.stands[0];
  }
}
