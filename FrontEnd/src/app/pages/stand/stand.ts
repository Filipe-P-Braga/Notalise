import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stand',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stand.html',
  styleUrl: './stand.css',
})
export class Stand {
  standForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;

  constructor(private fb: FormBuilder) {
    this.standForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      event: ['inovaweek', Validators.required],
      coordinator: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.standForm.valid) {
      console.log('Estande Cadastrado:', this.standForm.value);
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
        this.standForm.reset({ event: 'inovaweek' });
        this.isSubmitted = false;
      }, 3000);
    }
  }
}
