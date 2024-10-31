import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';

import { CustomPaginatorIntl } from '../../pagination/pagination';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { chipInfo } from '../../shared/incident-chip';
import { IncidentService } from '../incident.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface IncidentListEntry {
  name: string;
  user: string;
  filingDate: Date;
  status: string;
}

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class IncidentListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'user', 'dateFiling', 'status', 'actions'];
  incidentsList = new MatTableDataSource<IncidentListEntry>();
  totalIncidents = 0;
  chipInfo = chipInfo;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly incidentService: IncidentService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.loadIncidents(5, 1);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.loadIncidents(event.pageSize, event.pageIndex + 1);
    });
  }

  loadIncidents(pageSize: number, page: number) {
    this.loadingService.setLoading(true);
    this.incidentService.loadIncidents(pageSize, page).subscribe({
      next: data => {
        if (data?.incidents) {
          this.incidentsList.data = data.incidents.map(incident => {
            return {
              name: incident.name,
              user: incident.reportedBy.email,
              filingDate: incident.filingDate,
              status: incident.status,
              id: incident.id,
            };
          });
          this.totalIncidents = data.totalIncidents;
        }
      },
      error: err => {
        this.snackbarService.showError(err);
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  showDetail(incidentId: string) {
    this.router.navigate([`/incidents/${incidentId}`]);
  }
}
