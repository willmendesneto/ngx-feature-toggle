import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-app-customer-detail',
  template: '<p>Customer Detail: ID {{ id }}</p>',
})
export class CustomerDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  id: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.id = Number(params.get('id'))));
  }
}
