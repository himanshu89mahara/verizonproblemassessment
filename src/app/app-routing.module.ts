import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path:'cart',loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)},
  {path:'typing',loadChildren:()=>import('./typing/typing.module').then(m=>m.TypingModule)},
  {path:'user',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
