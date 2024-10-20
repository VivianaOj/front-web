import { Component, OnInit } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { InviteEmployeeComponent } from '../invite-employee/invite-employee.component';

@Component({
  selector: 'app-client-management',
  standalone: true,
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss'],
  imports: [EmployeeListComponent, InviteEmployeeComponent, ClientInfoComponent],
})
export class ClientManagementComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
