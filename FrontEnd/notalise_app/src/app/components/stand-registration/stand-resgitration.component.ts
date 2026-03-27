import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StandService } from '../../services/stand.service';

@Component({
  selector: 'app-stand-registration',
  templateUrl: './stand-registration.component.html',
  styleUrls: ['./stand-registration.component.scss']
})
export class StandRegistrationComponent {

  standForm: FormGroup;
  comments: string[] = [];

  constructor(
    private fb: FormBuilder,
    private standService: StandService
  ) {
    this.standForm = this.fb.group({
      eventName: ['INOVAWEEK'],
      startDate: ['2025-09-24'],
      endDate: ['2025-09-17'],
      description: [''],
      newComment: [''] // 👈 novo campo
    });
  }

  submit() {
    if (this.standForm.valid) {
      this.standService.createStand(this.standForm.value);
      this.standForm.reset();
    }
  }

  addComment() {
    const comment = this.standForm.get('newComment')?.value;

    if (comment) {
      this.comments.push(comment);
      this.standForm.get('newComment')?.reset();
    }
  }

}