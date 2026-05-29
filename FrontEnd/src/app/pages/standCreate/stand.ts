import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StandService, StandModel } from '../../services/stand.service';
@Component({
  selector: 'app-stand',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stand.html',
  styleUrl: './stand.css',
})
export class StandCreate implements OnInit {
  standForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;
  isError = false;
  feedbackMessage = '';
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private standService: StandService,
    private route: ActivatedRoute
  ) {
    this.standForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subtitle: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', Validators.required],
      genres: ['', Validators.required],
      format: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.eventId = Number(id);
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.standForm.valid) {
      const formValue = this.standForm.value;

      const genresArray = formValue.genres
        ? formValue.genres.split(',').map((g: string) => g.trim()).filter((g: string) => g !== '')
        : [];
      const formatArray = formValue.format
        ? formValue.format.split(',').map((f: string) => f.trim()).filter((f: string) => f !== '')
        : [];

      const newStand: StandModel = {
        name: formValue.name,
        subtitle: formValue.subtitle || '',
        description: formValue.description,
        local: '',
        eventId: this.eventId || 1,
        image: formValue.imageUrl || 'https://media.istockphoto.com/id/827247322/pt/vetorial/danger-sign-vector-icon-attention-caution-illustration-business-concept-simple-flat.jpg?s=612x612&w=0&k=20&c=Sh_ACBawrfyU23atGVRvQzB6ql4nyVoKxsbN9ARoU6U=',
        genres: genresArray,
        format: formatArray,
        contentRating: 'Livre para todos os públicos',
        copyright: 'Notalise',
        daysID: 1,
      };

      this.standService.createStand(newStand).subscribe({
        next: (res) => {
          console.log('Estande Cadastrado:', res);

          this.isSuccess = true;
          this.isError = false;
          this.feedbackMessage = 'Estande cadastrado com sucesso! 🚀';

          setTimeout(() => {
            window.history.back();
          }, 2000);
        },

        error: (err) => {
          console.error('Erro ao cadastrar estande:', err);

          this.isSuccess = false;
          this.isError = true;
          this.feedbackMessage = 'Erro ao cadastrar estande.';
        }
      });
    }
  }
}
