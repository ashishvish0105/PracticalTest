import { PracticalMainSectionComponent } from './modules/practical/practical-main-section/practical-main-section.component';
import { Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/practical/practical.routes').then((r) => r.routes),
      },
    ],
  },
];
