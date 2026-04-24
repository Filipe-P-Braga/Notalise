import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Qrcode } from '../../components/qrcode/qrcode';
import { Comments } from '../../components/comments/comments';
import { ComentCreateComponent } from '../../components/comentCreate/comentCreate';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-stand',
  standalone: true,
  imports: [CommonModule, RouterModule, Qrcode, Comments, ComentCreateComponent],
  templateUrl: './stand.html',
  styleUrl: './stand.css',
})
export class Stand implements OnInit {
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

  stands = [  //Isso aqui na realidade deveria ser chamado do proprio banco, sendo o stand que está sendo acessado via ID, entretanto, como sabemos o Stand ainda está martelado, e por isso seria inutil tentar pegar ele por agora. Sendo assim, isso será um array ainda por hora
    {
      id: 1
    },

  ];

  stars = [1, 2, 3, 4, 5];

  onCommentCreated() {
    console.log('ANTES DO LOAD');
    this.loadComments();
  }

  constructor(private commentService: CommentService, private cdr: ChangeDetectorRef) {
    this.selectedStand = this.stands[0];
  }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByStandId(this.selectedStand.id).subscribe({
      next: (data) => {
        this.selectedStand = {
          ...this.selectedStand,
          comments: data
        };
      },
      error: (err) => {
        console.error('Erro ao buscar comentários do stand', err);
      }
    });
  }
}
