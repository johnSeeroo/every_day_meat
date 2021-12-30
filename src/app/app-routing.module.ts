import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

const routes: Routes = [
  // Redirect empty path to '/dashboards'
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },
  // {
  //   path: 'sign-in',
  //   canActivate: [NoAuthGuard],
  //   canActivateChild: [NoAuthGuard],
  //   loadChildren: () =>
  //     import('./modules/auth/sign-in/sign-in.module').then(
  //       (m) => m.SignInModule
  //     ),
  // },
 
  
  // {
  //   path: 'inner',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/inner/inner.module').then((m) => m.InnerModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./modules/web/web.module').then(
        (m) => m.WebModule
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' , useHash: true})],
  // imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
