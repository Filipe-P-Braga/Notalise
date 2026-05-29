import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edition-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edition-event.html',
  styleUrl: './edition-event.css',
})
export class EditionEvent implements OnInit {
  eventForm: FormGroup;
  eventId!: number;
  originalEvent: any = null;
  isSubmitted = false;
  isSuccess = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      local: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = Number(idParam);
      this.loadEvent();
    } else {
      console.error('ID do evento não fornecido');
      this.router.navigate(['/eventos']);
    }
  }

  loadEvent() {
    this.isLoading = true;
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.originalEvent = event;
        // Preenche o formulário mapeando os campos do backend para os campos da tela
        this.eventForm.patchValue({
          title: event.name || '',
          date: '2026-10-12', // valor padrão condizente com o mock da listagem de eventos
          local: event.address || '',
          description: event.description || ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar evento:', err);
        this.isLoading = false;
        alert('Erro ao carregar os dados do evento. Redirecionando...');
        this.router.navigate(['/eventos']);
      }
    });
  }

  saveChanges() {
    this.isSubmitted = true;
    if (this.eventForm.valid && this.originalEvent) {
      // Mescla os campos editados com o objeto original do evento
      const updatedEvent = {
        ...this.originalEvent,
        name: this.eventForm.value.title,
        address: this.eventForm.value.local,
        description: this.eventForm.value.description
      };

      this.eventService.updateEvent(updatedEvent).subscribe({
        next: (response) => {
          console.log('Evento atualizado com sucesso:', response);
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.router.navigate(['/evento', this.eventId]);
          }, 2000);
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          alert('Erro ao atualizar o evento. Tente novamente.');
        }
      });
    }
  }
}
