import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-app-customer-detail',
  template: '<p>Customer Detail: ID {{ id }}</p>',
})
export class CustomerDetailComponent implements OnInit {
  id: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.id = Number(params.get('id'))));
  }
}
