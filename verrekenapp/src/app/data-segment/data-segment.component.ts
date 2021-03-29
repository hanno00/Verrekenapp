import { AlgorithmService } from './../services/algorithm.service';
import { EventhandlerService } from './../services/eventhandler.service';
import { DataflowService } from './../services/dataflow.service';
import { Component, OnInit } from '@angular/core';
import { Person, Payment } from './../models/person';

@Component({
  selector: 'app-data-segment',
  templateUrl: './data-segment.component.html',
  styleUrls: ['./data-segment.component.css'],
})
export class DataSegmentComponent implements OnInit {
  people: Person[] = [
    {
      name: '',
      totalAmount: undefined,
      id: undefined,
    },
  ];

  payments:Payment[] = [];

  totalAmountSpent: number;

  constructor(
    private dataflowService: DataflowService,
    private eventhandler: EventhandlerService,
    private algorithm: AlgorithmService
  ) {}

  ngOnInit(): void {
    this.getPeople();
    this.eventhandler.$reloadEvent.subscribe((data) => this.getPeople());
  }

  getPeople(): void {
    this.dataflowService.getPeople().subscribe((people) => {
      this.people = people;
      console.log(this.people);
      this.payments = this.algorithm.calculatePayments(this.people,this.getTotalAmountSpent());
      this.payments.map(payment => payment.amount = Math.round((payment.amount + Number.EPSILON) * 100) / 100)
    });
  }

  getTotalAmountSpent(): number {
    let sum: number = 0;
    this.people.map((person) => {
      sum += +person.totalAmount;
    });
    this.totalAmountSpent = sum;
    return sum;
  }
}
