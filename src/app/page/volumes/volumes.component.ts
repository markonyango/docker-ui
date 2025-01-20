import { Component, Signal, computed, effect, inject } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { TableComponent } from '../../components/table/table.component';
import { ActionsCellRendererComponent } from '../../components/cell-renderer/actions.component';
import { ViewButtonRendererComponent } from '../../components/cell-renderer/view-button.component';
import { VolumeService } from '../../services/volume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volumes',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './volumes.component.html',
  styleUrl: './volumes.component.css',
})
export class VolumesComponent {
  private router = inject(Router);
  private volume_service = inject(VolumeService);
  protected volumes = this.volume_service?.volumes;
  protected gridOptions: Signal<GridOptions> = computed(() => ({
    rowData: this.volumes(),
    columnDefs: [
      {
        field: 'Name',
        sort: 'asc',
      },
      {
        field: 'CreatedAt',
      },
      {
        headerName: 'Actions',
        pinned: 'right',
        maxWidth: 100,
        cellRenderer: ActionsCellRendererComponent,
        cellRendererParams: {
          components: [
            {
              component: ViewButtonRendererComponent,
              action: (params: any) => this.router.navigate(['volumes', params.data.Name]),
            },
          ],
        },
      },
    ],
  }));
}
