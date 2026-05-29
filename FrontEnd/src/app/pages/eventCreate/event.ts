import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';

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

  constructor(private fb: FormBuilder, private eventService: EventService) {
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
          setTimeout(() => {
            this.isSuccess = false;
            this.eventForm.reset();
            this.isSubmitted = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar evento:', err);
          // Aqui você pode adicionar um tratamento visual de erro caso queira futuramente
        }
      });
    }
  }
}
