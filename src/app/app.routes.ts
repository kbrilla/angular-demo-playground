import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./demos/overview.component').then(m => m.OverviewComponent) },
  { path: 'ts-features', loadComponent: () => import('./demos/ts-features-demo.component').then(m => m.TsFeaturesDemoComponent) },
  { path: 'mix-match', loadComponent: () => import('./demos/mixed-chaining-demo.component').then(m => m.MixedChainingDemoComponent) },
  { path: 'style-precedence', loadComponent: () => import('./demos/style-precedence-demo.component').then(m => m.StylePrecedenceDemoComponent) },
  { path: '**', redirectTo: '' },
];
