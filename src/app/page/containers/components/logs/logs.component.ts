import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ContainerService } from '../../../../services/container.service';
import { TableComponent } from '../../../../components/table/table.component';

@Component({
  selector: 'container-logs',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, TableComponent],
  template: ` <app-table [gridOptions]="gridOptions()" /> `,
  styles: ``,
})
export class LogsComponent {
  public readonly id = input<string>('');
  private container_service = inject(ContainerService);

  protected logs = computed(() => {
    return this.container_service.container()[this.id()]?.logs?.map(trim_timestamp_from_message);
  });

  protected gridOptions = computed<GridOptions<{ timestamp: string; message: string; source: string }>>(() => ({
    rowData: this.logs(),
    columnDefs: [
      { field: 'timestamp', flex: 1 },
      { field: 'source', flex: 1 },
      { field: 'message', flex: 4 },
    ],
  }));

  ngOnInit() {
    this.container_service.get_container_logs_once(this.id());
  }
}

function trim_timestamp_from_message({ timestamp, source, message }: { timestamp: string; source: string; message: string }) {
  const matches = message.match(/\d+-\d+-\d+T\d+:\d+:+\d+\.\d+Z(.+)/);

  if (matches?.length == 2) {
    return { timestamp, source, message: matches[1] };
  }

  return { timestamp, source, message };
}
