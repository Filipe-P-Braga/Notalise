import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class EventCreate {
  eventForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;
  feedbackMessage = '';
  isError = false;

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
  
  
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      subtitle: ['', Validators.required],
      date: ['', Validators.required],
      local: ['', Validators.required],
      imageUrl: ['', Validators.required],
      genres: ['', Validators.required],
      format: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (response) => {
          console.log('Evento Cadastrado com sucesso no backend:', response);

          this.isSuccess = true;
          this.isError = false;
          this.feedbackMessage = 'Evento criado com sucesso! 🎉';

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },

        error: (err) => {
          console.error('Erro ao cadastrar evento:', err);

          this.isSuccess = false;
          this.isError = true;
          this.feedbackMessage = 'Erro ao criar evento. Tente novamente.';
        }
      });

    }
  }
}
