import { Component } from '@angular/core';
import { StandService } from '../../../services/stand.service';

@Component({
  selector: 'app-stand-registration',
  templateUrl: './stand-registration.component.html',
  styleUrls: ['./stand-registration.component.scss']
})
export class StandRegistrationComponent {

  // 🎯 Dados do evento (usados direto no HTML)
  event = {
    title: 'Notalise',
    date: '24 á 17 de setembro',
    description: `
      Sejam bem vindos a MAIOR feira de inovação e tecnologia do Espírito Santo!
      Onde se projetam startups de alcance mundial, onde talentos são apresentados ao mundo
      e onde criamos um mundo novo!
    `
  };

  // 💬 Lista de comentários
  comments = [
    {
      name: 'Carl Castlepillar',
      time: '1h atrás',
      message: 'Minha feira favorita! Ideias sensacionais!',
      color: 'green',
      small: false
    },
    {
      name: 'Carl Castlepillar',
      time: '1h atrás',
      message: 'O Notalise é muito melhor 😎',
      color: 'green',
      small: true
    },
    {
      name: 'Wanda Washington',
      time: '1h atrás',
      message: 'Somos todos fãs da Inova!',
      color: 'pink',
      small: false
    }
  ];

  constructor(private standService: StandService) {}

  // 🚀 método pronto pra usar depois (ex: botão cadastrar stand)
  createStand() {
    const stand = {
      eventName: this.event.title,
      description: 'Stand exemplo'
    };

    this.standService.createStand(stand);

    console.log('Stand criado:', stand);
  }

}