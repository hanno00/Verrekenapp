import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventhandlerService {
  $reloadEvent = new EventEmitter();
  constructor() { }

  emitEvent() {
    this.$reloadEvent.emit();
  }
}
