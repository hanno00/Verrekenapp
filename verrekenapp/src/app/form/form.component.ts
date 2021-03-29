import { EventhandlerService } from './../services/eventhandler.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataflowService } from '../services/dataflow.service';
import { Person } from './../models/person';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  person?: Person = {
    id: null,
    name: '',
    totalAmount: undefined,
  };
  exists = false;

  people: Person[] = [];

  constructor(private dataflowService: DataflowService,private eventhandler: EventhandlerService) {}

  ngOnInit(): void {}

  addTransaction(): void {
    let exists = false;
    this.dataflowService.getPeople().subscribe((people) => {
      people.map((person) => {
        if (person.name === this.person.name) {
          person.totalAmount += +this.person.totalAmount;
          this.dataflowService.updatePerson(person).subscribe(data => this.eventhandler.emitEvent());
          
          exists = true;
        }
      });
      if (!exists) {
        this.dataflowService.addPerson(this.person as Person).subscribe(data => this.eventhandler.emitEvent());
        
      }
    });
  }
}
