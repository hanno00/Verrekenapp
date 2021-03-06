import { Injectable } from '@angular/core';
import { Person } from './../models/person';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements InMemoryDbService {
  createDb() {
    const people = [
      // { id: 1, name: 'Henk', totalAmount: 15 },
      // { id: 2, name: 'Klaas', totalAmount: 10.5 },
      // { id: 3, name: 'Joop', totalAmount: 175 },
      // { id: 4, name: 'Tim', totalAmount: 255 },
      // { id: 5, name: 'Eline', totalAmount: 2.52 },
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
