import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

  getData(keyName: string) {
    return JSON.parse(window.localStorage.getItem(keyName) || '');
  }
  setData(keyName: string, onject: any): void {
    window.localStorage.setItem(keyName, JSON.stringify(onject));
  }
}
