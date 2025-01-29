import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IApiResponseObservation,
  IConvertObservationData,
} from '../../models/practical.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PracticalService {
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {}

  getListObservation(): Observable<IApiResponseObservation> {
    return this.http.get<IApiResponseObservation>(
      environment.BASE_URL + 'payload'
    );
  }

  addObservation(object: IConvertObservationData): Observable<any> {
    let dataSource = this.localstorageService.getData('payLoad');
    dataSource.map((data: any) => {
      if (data.samplingTime == object.samplingTime) {
        data.isCompleted = object.isCompleted;
        data.lengthOfRoad = object.lengthOfRoad;
        data.projectName = object.projectName;
        data.constructionCount = object.constructionCount;
      }
      this.localstorageService.setData('payLoad', dataSource);
    });
    return of({ playload: true });
  }

  getFormLocalData(): Observable<any> {
    return of(this.localstorageService.getData('payLoad'));
  }
}
