import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Customer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-customer',
  styleUrls: ['./customer.component.css'],
  template: `
    <p>Customer List</p>
    <ul>
      <li *ngFor="let customer of customers">
        <a
          [routerLink]="['/customer', customer.id]"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active"
          >{{ customer.name }}</a
        >
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.customers = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
    ];
  }
}
