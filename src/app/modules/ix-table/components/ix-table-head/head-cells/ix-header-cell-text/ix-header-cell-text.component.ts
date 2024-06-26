import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColumnComponent } from 'app/modules/ix-table/interfaces/table-column.interface';

@Component({
  selector: 'ix-header-cell-text',
  templateUrl: './ix-header-cell-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IxHeaderCellTextComponent<T> extends ColumnComponent<T> {}
