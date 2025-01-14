import { Component, Signal, computed, inject } from '@angular/core';
import { DockerService, Port } from '../../services/docker.service';

import { GridOptions } from 'ag-grid-community';
import { ActionsCellRendererComponent } from '../../components/cell-renderer/actions.component';
import { TableComponent } from '../../components/table/table.component';
import { ViewButtonRendererComponent } from '../../components/cell-renderer/view-button.component';
import { PlayButtonRendererComponent } from '../../components/cell-renderer/play-button.component';
import { StopButtonRendererComponent } from '../../components/cell-renderer/stop-button.component';
import { DeleteButtonComponent } from '../../components/cell-renderer/delete-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './containers.component.html',
  styleUrl: './containers.component.css',
})
export class ContainersComponent {
  private router = inject(Router);
  private dockerService = inject(DockerService);
  protected containers = inject(DockerService)?.containers;
  protected gridOptions: Signal<GridOptions> = computed(() => ({
    rowData: this.containers(),
    columnDefs: [
      {
        field: 'names',
        valueFormatter: (params: any) => params.data.names.map(prettify_name),
        valueGetter: (params: any) => params.data.names.at(0),
      },
      { field: 'image' },
      {
        field: 'ports',
        valueFormatter: (params: any) => prettify_ports(params.data.ports),
        valueGetter: (params: any) => params.data.ports.at(0)?.private_port,
      },
      {
        field: 'id',
        valueFormatter: (params: any) => `${params.data.id.slice(0, 10)}...`,
      },
      { field: 'state', sort: 'desc' },
      { field: 'status', sortable: false },
      {
        headerName: 'Actions',
        pinned: 'right',
        cellRenderer: ActionsCellRendererComponent,
        cellRendererParams: {
          components: [
            {
              component: ViewButtonRendererComponent,
              action: (params: any) => this.router.navigate(['containers', params.data.id]),
            },
            {
              component: PlayButtonRendererComponent,
              action: (params: any) => this.dockerService.start_container(params.data.id),
            },
            {
              component: StopButtonRendererComponent,
              action: (params: any) => this.dockerService.stop_container(params.data.id),
            },
            {
              component: DeleteButtonComponent,
              action: (params: any) => this.dockerService.remove_container(params.data.id),
            },
          ],
        },
      },
    ],
  }));
}

// We do this because Docker internals prepend the container name
// with a string representing the parent. "/" is the root.
function prettify_name(name: string): string {
  if (name.startsWith('/')) {
    return name.slice(1);
  }

  return name;
}

function prettify_ports(ports: Port[]): string {
  return ports.map(port => (port.public_port ? `${port.private_port}:${port.public_port}` : `${port.private_port}}`)).join(', ');
}
