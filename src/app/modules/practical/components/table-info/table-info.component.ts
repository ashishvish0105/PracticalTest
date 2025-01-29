import { Component, Input } from '@angular/core';
import { IConvertObservationData } from '../../../../models/practical.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-info',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.scss',
})
export class TableInfoComponent {
  @Input('dataSource') dataSource: IConvertObservationData[] = [];
}
