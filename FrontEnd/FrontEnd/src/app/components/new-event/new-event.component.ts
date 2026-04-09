import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent {

  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {

    this.eventForm = this.fb.group({
      name: [''],
      description: [''],
      address: [''],
      startDate: [''],
      endDate: ['']
    });

  }

  createEvent() {
    if (this.eventForm.valid) {

      const event = {
        ...this.eventForm.value,
        score: 0
      };

      // 🔥 ajuste aqui
      this.eventService.createEvent(event);

      console.log('Evento criado:', event);

      this.eventForm.reset();
    }
  }
}