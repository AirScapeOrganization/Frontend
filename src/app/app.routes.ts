import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'explore',
    title: 'Explore in AirScape',
    loadComponent: () =>
      import('./explorer/explorer.component').then((c) => c.ExplorerComponent),
  },
  {
    path: 'owners',
    loadComponent: () =>
      import('./owners/owners.component').then((c) => c.OwnersComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./shared/pages/blog/blog.component').then((c) => c.BlogComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./shared/pages/contact/contact.component').then((c) => c.ContactComponent),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./shared/pages/help/help.component').then((c) => c.HelpComponent),
  },
  {
    path: 'login',
    title: 'Log in to your account',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    title: 'Register to access content',
    loadComponent: () =>
      import('./auth/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'error',
    title: 'Page not found 404',
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
