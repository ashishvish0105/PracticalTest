import { Component, OnInit } from '@angular/core';
import { PracticalService } from '../practical.service';
import { TableInfoComponent } from '../components/table-info/table-info.component';
import { map } from 'rxjs';
import {
  IApiResponseObservation,
  IConvertObservationData,
} from '../../../models/practical.model';
import { constantLabel } from '../../../constants/practical.conts';
import { ColumnInfoComponent } from '../components/column-info/column-info.component';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-practical-main-section',
  standalone: true,
  imports: [TableInfoComponent, ColumnInfoComponent],
  templateUrl: './practical-main-section.component.html',
  styleUrl: './practical-main-section.component.scss',
})
export class PracticalMainSectionComponent implements OnInit {
  dataSource: IConvertObservationData[] = [];
  constructor(
    private practicalService: PracticalService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.getListObservation();
  }

  submitEvent(event: IConvertObservationData) {
    this.practicalService.addObservation(event).subscribe((res) => {
      this.getFormLocalData();
    });
  }

  private getFormLocalData() {
    this.practicalService.getFormLocalData().subscribe((res) => {
      this.dataSource = res;
    });
  }

  private getListObservation() {
    this.practicalService
      .getListObservation()
      .pipe(
        map((paylod: IApiResponseObservation) => {
          return paylod.Datas.map((data: any) => {
            const projectName =
              data.Properties.find(
                (p: any) => p.Label === constantLabel.ProjectName
              )?.Value || '';
            const constructionCount =
              data.Properties.find(
                (p: any) => p.Label === constantLabel.constructionCount
              )?.Value || '';
            const isCompleted =
              data.Properties.find(
                (p: any) => p.Label === constantLabel.isCompleted
              )?.Value || '';
            const lengthOfRoad =
              data.Properties.find(
                (p: any) => p.Label === constantLabel.lengthOfRoad
              )?.Value || '';
            return {
              samplingTime: new Date(data.SamplingTime),
              projectName,
              constructionCount,
              isCompleted,
              lengthOfRoad,
            };
          });
        })
      )
      .subscribe({
        next: (res: any) => {
          this.localstorageService.setData('payLoad', res);
          this.dataSource = this.localstorageService.getData('payLoad');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
