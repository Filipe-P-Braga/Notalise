import { Injectable } from '@angular/core';
import { StandModel } from '../models/stand.model';

@Injectable({
  providedIn: 'root'
})
export class StandService {

  private stands: StandModel[] = [];

  createStand(stand: StandModel) {
    this.stands.push(stand);
    console.log("Stand criado:", stand);
  }

  getStands() {
    return this.stands;
  }
}
