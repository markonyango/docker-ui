import { Component, Signal, computed, inject } from '@angular/core';
import { DockerService, Image } from '../../services/docker.service';
import { GridOptions } from 'ag-grid-community';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
})
export class ImagesComponent {
  protected images = inject(DockerService)?.images;
  protected number_of_images = computed(() => this.images().length);

  protected gridOptions: Signal<GridOptions<Image>> = computed(() => ({
    rowData: this.images(),
    getRowId: (params: any) => params.data.Id,
    columnDefs: [
      { headerName: 'Name', valueGetter: (params: any) => params.data?.RepoTags.at(0)?.split(':')?.at(0) ?? '<none>', sort: 'asc' },
      { headerName: 'Tag', valueGetter: (params: any) => params.data?.RepoTags.at(0)?.split(':')?.at(1) ?? '<none>', sortable: true },
      { field: 'Created', valueGetter: (params: any) => new Date((params.data?.Created ?? 0) * 1000).toLocaleString(), sortable: true },
      { field: 'Size', valueGetter: (params: any) => `${((params.data?.Size ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB`, sortable: true },
      { field: 'Id', valueGetter: (params: any) => params.data?.Id.split(':').at(1)?.slice(0, 12), sortable: true },
    ],
  }));
}
