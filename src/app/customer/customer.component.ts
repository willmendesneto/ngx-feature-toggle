import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

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
      @for (customer of customers; track customer) {
        <li>
          <a
            [routerLink]="['/customer', customer.id]"
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="active"
            >{{ customer.name }}</a
          >
        </li>
      }
    </ul>
    <router-outlet></router-outlet>
  `,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
})
export class CustomerComponent implements OnInit {
  private router = inject(Router);

  customers: Customer[] = [];

  ngOnInit() {
    this.customers = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
    ];
  }
}
