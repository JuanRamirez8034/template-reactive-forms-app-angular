import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'logup',
        component:LogupComponent
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
