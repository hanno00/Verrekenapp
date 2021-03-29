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

  constructor(
    private dataflowService: DataflowService,
    private eventhandler: EventhandlerService
  ) {}

  ngOnInit(): void {}

  addTransaction(): void {
    let exists = false;
    //Get all people
    this.dataflowService.getPeople().subscribe((people) => {
      //Loop over all people to check if person exists
      people.map((person) => {
        //Person exists
        if (person.name === this.person.name) {
          //Add amount to their original amount
          person.totalAmount += +this.person.totalAmount;
          //Update person
          this.dataflowService
            .updatePerson(person)
            .subscribe((data) => this.eventhandler.emitEvent());
          //Set exist tag on true because you dont want to add it as well
          exists = true;
        }
      });
      //There was no existing person with the same name
      if (!exists) {
        //Add to databse
        this.dataflowService
          .addPerson(this.person as Person)
          .subscribe((data) => this.eventhandler.emitEvent());
      }
      this.person.name = '';
      this.person.totalAmount = undefined;
    });
  }
}
