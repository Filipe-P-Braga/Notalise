import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  events = [
    {
      id: 1,
      name: 'Inovaweek 2026',
      isOpen: true,
      stands: [
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
      ]
    },
    {
      id: 2,
      name: 'Hackathon UVV 2025',
      isOpen: false,
      stands: [
        {
          id: 201,
          name: 'EcoSystem App',
          course: 'Sistemas de Informação',
          rating: 4.2,
          comments: [
            { user: 'Lucas Martins', text: 'Poderia ter mais funcionalidades, mas a ideia é boa.', stars: 4 }
          ]
        }
      ]
    }
  ];

  toggleEvent(eventId: number) {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.isOpen = !event.isOpen;
    }
  }

  getStarArray(stars: number) {
    return Array(stars).fill(0);
  }
}
