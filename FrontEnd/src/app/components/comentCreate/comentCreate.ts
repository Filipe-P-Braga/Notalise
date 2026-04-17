import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-coment-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentCreate.html',
  styleUrl: './comentCreate.css'
})
export class ComentCreateComponent {
  @Input() standId!: number;
  commentForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      score: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      userId: [''],
      type: ['visitante']
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.commentForm.valid) {
      const newComment = {
        standId: this.standId, // Pegando o standId que foi passado por input
        ...this.commentForm.value
      };

      this.commentService.createComment(newComment).subscribe({
        next: (response) => {
          console.log('Comentário criado com sucesso:', response);
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.commentForm.reset({ score: 5, type: 'visitante' });
            this.isSubmitted = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar comentário:', err);
        }
      });
    }
  }
}
