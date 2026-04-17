import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      local: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      console.log('Evento Cadastrado:', this.eventForm.value);
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
        this.eventForm.reset();
        this.isSubmitted = false;
      }, 3000);
    }
  }
}
