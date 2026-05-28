import { Routes } from '@angular/router';
import { isDevMode } from '@angular/core';
import { Main } from './main/main';
import { Counter } from './main/counter/counter';
import { Home } from './main/home/home';
import { Documentation } from './documentation/documentation';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'counter',
        component: Counter,
      },
      {
        path: 'documentation',
        component: Documentation,
        children: [

          {
            path: 'overview',
            loadComponent: () =>
              import('./demo/demo.component').then((m) => m.DemoComponent),
          },
          {
            path: 'install',
            loadComponent: () =>
              import('./documentation/components/installation/installation').then((m) => m.InstallationComponent),
          },
          {
            path: 'input',
            loadComponent: () =>
              import('./documentation/components/input-text/input-text').then((m) => m.InputText),
          },
          {
            path: 'input-number',
            loadComponent: () =>
              import('./documentation/components/input-number/input-number').then((m) => m.InputNumber),
          },
          {
            path: 'input-textarea',
            loadComponent: () =>
              import('./documentation/components/input-textarea/input-textarea').then((m) => m.InputTextarea),
          },
          {
            path: 'checkbox',
            loadComponent: () =>
              import('./documentation/components/checkbox/checkbox').then((m) => m.Checkbox),
          },
          {
            path: 'toggle',
            loadComponent: () =>
              import('./documentation/components/toggle/toggle').then((m) => m.Toggle),
          },
          {
            path: 'radio',
            loadComponent: () =>
              import('./documentation/components/radio/radio').then((m) => m.Radio),
          },
          {
            path: 'single-select',
            loadComponent: () =>
              import('./documentation/components/single-select/single-select').then((m) => m.SingleSelect),
          },
          {
            path: 'multi-select',
            loadComponent: () =>
              import('./documentation/components/multi-select/multi-select').then((m) => m.MultiSelect),
          },
          {
            path: 'date-picker',
            loadComponent: () =>
              import('./documentation/components/date-picker/date-picker').then((m) => m.DatePicker),
          },
          {
            path: 'datetime-picker',
            loadComponent: () =>
              import('./documentation/components/datetime-picker/datetime-picker').then((m) => m.DateTimePicker),
          },
          {
            path: 'files',
            loadComponent: () =>
              import('./documentation/components/files/files').then((m) => m.Files),
          },
          {
            path: 'mobile-number',
            loadComponent: () =>
              import('./documentation/components/mobile-number/mobile-number').then((m) => m.MobileNumberShowcase),
          },
          {
            path: 'name-buddy',
            loadComponent: () =>
              import('./documentation/components/name-buddy/name-buddy').then((m) => m.NameBuddyShowcase),
          },
          {
            path: 'drawer',
            loadComponent: () =>
              import('./documentation/components/drawer/drawer').then((m) => m.DrawerShowcase),
          },
          {
            path: 'dialog',
            loadComponent: () =>
              import('./documentation/components/dialog/dialog').then((m) => m.DialogShowcase),
          },
          {
            path: 'select-button',
            loadComponent: () =>
              import('./documentation/components/select-button/select-button').then((m) => m.SelectButtonShowcase),
          },
          {
            path: 'carousel',
            loadComponent: () =>
              import('./documentation/components/carousel/carousel').then((m) => m.CarouselShowcase),
          },
          {
            path: 'toast',
            loadComponent: () =>
              import('./documentation/components/toast/toast').then((m) => m.ToastShowcase),
          },
          {
            path: 'tooltip',
            loadComponent: () =>
              import('./documentation/components/tooltip/tooltip').then((m) => m.TooltipShowcase),
          },
          {
            path: 'skeleton',
            loadComponent: () =>
              import('./documentation/components/skeleton/skeleton').then((m) => m.SkeletonShowcase),
          },
        ],
      },  
      {
        path: 'demo',
        loadComponent: () =>
          import('./demo/demo.component').then((m) => m.DemoComponent),
      },
    ],
  },
];

// Conditionally append local developer routes
if (isDevMode()) {
  const mainRoute = routes.find((r) => r.component === Main);
  if (mainRoute && mainRoute.children) {
    mainRoute.children.push({
      path: 'dev-deploy-steps',
      loadComponent: () =>
        import('./documentation/components/deploy-steps/deploy-steps').then((m) => m.DeployStepsComponent),
    });
  }
}

