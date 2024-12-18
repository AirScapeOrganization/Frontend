import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RouterModule } from '@angular/router';
import { UserResolver } from './shared/services/userResolver/user.resolver';
import { ErrorComponent } from './shared/pages/error/error.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BlogComponent } from './shared/pages/blog/blog.component';
import { ContactComponent } from './shared/pages/contact/contact.component';
import { HelpComponent } from './shared/pages/help/help.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PanelComponent } from './dashboard/panel/panel.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { PropertyComponent } from './property/property.component';

export const routes: Routes = [
  {
    path: '',
    resolve: { user: UserResolver },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'explore',
        children: [
          { path: '', component: ExplorerComponent },
          { path: 'view/:id', component: PropertyComponent },
        ]
        },
      { path: 'contact', component: ContactComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'help', component: HelpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'error', component: ErrorComponent},
      {
        path: 'panel', 
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'panel', pathMatch: 'full' },
          { path: '', component: PanelComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'notifications', component: NotificationsComponent}
        ]
       },
      { path: '**', redirectTo: '/error' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}