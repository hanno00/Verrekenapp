import { Injectable } from '@angular/core';
import { Person } from './../models/person';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements InMemoryDbService {
  createDb() {
    const people = [
      { id: 1, name: 'henk', totalAmount: 15 },
      { id: 2, name: 'henk2', totalAmount: 10.5 },
      { id: 3, name: 'henk3', totalAmount: 12341234 },
      { id: 4, name: 'kees', totalAmount: 0 },
      { id: 5, name: 'joop', totalAmount: 2.5 },
    ];
    return {people};
  }

  genId(people: Person[]): number {
    return people.length > 0
      ? Math.max(...people.map((person) => person.id)) + 1
      : 1;
  }

  constructor() {}
}
