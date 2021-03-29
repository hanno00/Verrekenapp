import { EventhandlerService } from './../services/eventhandler.service';
import { DataflowService } from './../services/dataflow.service';
import { Component, OnInit } from '@angular/core';
import { Person } from './../models/person';

@Component({
  selector: 'app-data-segment',
  templateUrl: './data-segment.component.html',
  styleUrls: ['./data-segment.component.css']
})
export class DataSegmentComponent implements OnInit {
  people: Person[] = [{
    name: "henk",
    totalAmount: 15,
    id: 1
  }];

  totalAmountSpent: number;

  constructor(private dataflowService: DataflowService, private eventhandler: EventhandlerService) { }

  ngOnInit(): void {
    this.getPeople();
    this.eventhandler.$reloadEvent.subscribe(data => this.getPeople());
  }

  getPeople(): void {
    this.dataflowService.getPeople().subscribe((people) => {
      this.people = people;
      console.log(this.people);
      this.getTotalAmountSpent();
    });
  }

  getTotalAmountSpent(): void{
    let sum: number = 0;
    this.people.map(person => {
      sum += +person.totalAmount;
    });
    this.totalAmountSpent = sum;
  }
}
