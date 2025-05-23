import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    stats = [
    {
      title: 'Total Sales',
      amount: '180,200',
      progress: {
        value: 50,
      },
      color: 'blue',
    },
    {
      title: 'Revenue',
      amount: '70,205',
      progress: {
        value: 70,
      },
      color: 'green',
    },
    {
      title: 'Traffic',
      amount: '1,291,922',
      progress: {
        value: 80,
      },
      color: 'red',
    },
    {
      title: 'New User',
      amount: '1,922',
      progress: {
        value: 40,
      },
      color: 'orange',
    },
  ];
}
