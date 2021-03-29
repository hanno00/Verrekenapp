import { Injectable } from '@angular/core';
import { DataflowService } from './../services/dataflow.service';
import { Person, Payment, Expense } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService {
  payments: Payment[] = [];
  people: Person[] = [];

  constructor(private dataflowService: DataflowService) {}

  calculatePayments(people:Person[], totalAmountSpent:number): Payment[] {
    this.people = people;
    this.payments = [];
    const average = totalAmountSpent / this.people.length;

    const payers: Expense[] = [];
    const receivers: Expense[] = [];

    this.people.forEach((element) => {
      const diff = element.totalAmount - average;
      if (diff > 0) {
        receivers.push({
          name: element.name,
          amount: diff,
        } as Expense);
      } else {
        payers.push({
          name: element.name,
          amount: -diff,
        } as Expense);
      }
    });

    receivers.sort((a, b) => a.amount - b.amount);
    payers.sort((a, b) => b.amount - a.amount);

    while (receivers.length > 0 && payers.length > 0) {
      const receiver = receivers[0];
      const payer = payers[0];

      if (payer.amount >= receiver.amount) {
        this.payments.push({
          payer: payer.name,
          amount: receiver.amount,
          receiver: receiver.name,
        });
        payer.amount -= receiver.amount;
        receivers.splice(0, 1);
        if (payer.amount == 0) {
          payers.splice(0, 1);
        }
      } else {
        this.payments.push({
          payer: payer.name,
          amount: payer.amount,
          receiver: receiver.name,
        });
        receiver.amount -= payer.amount;
        payers.splice(0, 1);
      }
    }
    console.table(this.payments);
    return this.payments;
  }
}
