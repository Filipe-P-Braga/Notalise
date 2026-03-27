import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: EventModel[] = [];

  createEvent(event: EventModel) {
    this.events.push(event);
    console.log("Evento criado:", event);
  }

  getEvents(): EventModel[] {
    return this.events;
  }

}