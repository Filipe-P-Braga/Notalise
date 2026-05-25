import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-coment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentCreate.html',
  styleUrl: './comentCreate.css'
})
export class ComentCreateComponent {
  @Input() entityId!: number;
  @Input() entityType!: 'stand' | 'event';

  @Output() commentCreated = new EventEmitter<void>();

  commentForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;

  rating: number = 5;
  hovered: number = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      score: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      userId: [''],
      type: ['visitante']
    });
  }

  setRating(value: number) {
    this.rating = value;
    this.commentForm.patchValue({ score: value });
  }

  hoverRating(value: number) {
    this.hovered = value;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.commentForm.valid) {
      const newComment = {
        [this.entityType === 'stand' ? 'standId' : 'eventId']: this.entityId,
        ...this.commentForm.value
      };

      this.commentService.createComment(newComment).subscribe({
        next: (response) => {
          console.log('Comentário criado com sucesso:', response);
          this.isSuccess = true;
          this.commentCreated.emit();
          setTimeout(() => {
            this.isSuccess = false;
            this.commentForm.reset({ score: 5, type: 'visitante' });
            this.isSubmitted = false;
            this.rating = 5;
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar comentário:', err);
        }
      });
    }
  }
}
