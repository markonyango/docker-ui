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

  protected logs = computed(() => this.container_service.container()[this.id()]?.logs);

  protected gridOptions = computed(() => ({
    rowData: this.logs(),
    columnDefs: [{ field: 'timestamp' }, { field: 'source' }, { field: 'message' }],
  }));

  ngOnInit() {
    this.container_service.get_container_logs_once(this.id());
  }
}
