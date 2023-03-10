import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'reactive',
    loadChildren: ()=>import('./reactive/reactive.module').then(moduleRoutes => moduleRoutes.ReactiveModule)
  },
  {
    path:'template',
    loadChildren: ()=>import('./template/template.module').then(moduleRoutes => moduleRoutes.TemplateModule)
  },
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(moduleRoutes => moduleRoutes.AuthModule)
  },
  {
    path:'**',
    redirectTo:'template'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
