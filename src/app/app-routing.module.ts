import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard], },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
   },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: 'add', loadChildren: () => import('./pages/add/add.module').then(m => m.AddModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] },
  { path: 'edit/:id', loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard] },
  { path: 'preferiti', loadChildren: () => import('./pages/preferiti/preferiti.module').then(m => m.PreferitiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
