import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandService, StandModel } from '../../services/stand.service';
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

  constructor(private fb: FormBuilder, private standService: StandService) {
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
      const formValue = this.standForm.value;
      
      const newStand: StandModel = {
        name: formValue.name,
        description: formValue.description,
        local: formValue.course || '',
        eventId: 1 // Defaulting for now
      };

      this.standService.createStand(newStand).subscribe({
        next: (res) => {
          console.log('Estande Cadastrado:', res);
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.standForm.reset({ event: 'inovaweek' });
            this.isSubmitted = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar estande:', err);
        }
      });
    }
  }
}
