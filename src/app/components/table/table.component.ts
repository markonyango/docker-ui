import { Component, computed, effect, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  GridOptions,
  ModuleRegistry,
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule,
  RowSelectionModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule, ColumnAutoSizeModule, RowSelectionModule]);

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  private _defaultGridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
    },
    suppressCellFocus: true,
    animateRows: false,
    rowSelection: 'single',
    pagination: false,
    domLayout: 'autoHeight',
    onGridReady: event => {
      event.api.sizeColumnsToFit();
    },
  };

  public gridOptions = input<GridOptions>({});

  protected computedGridOptions = computed<GridOptions>(() => ({
    ...this._defaultGridOptions,
    ...this.gridOptions(),
  }));

  protected rowData = computed(() => this.gridOptions()?.rowData);
}
