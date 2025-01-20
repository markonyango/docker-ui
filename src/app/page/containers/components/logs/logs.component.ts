import { Component, computed, inject, input } from '@angular/core';
import { ContainerService } from '../../../../services/container.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
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
    return this.container_service.container()[this.id()]?.logs.map(trim_timestamp_from_message);
  });

  protected truncated_logs = computed(() => this.logs().slice(-1000));

  protected gridOptions = computed(() => ({
    rowData: this.logs().length < 1000 ? this.logs() : this.truncated_logs(),
    columnDefs: [{ field: 'timestamp' }, { field: 'source' }, { field: 'message' }],
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
