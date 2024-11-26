import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'explorer',
    loadComponent: () =>
      import('./explorer/explorer.component').then((c) => c.ExplorerComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./shared/pages/error/error.component').then((c) => c.ErrorComponent),
  },
  { path: '**', redirectTo: '/error' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
