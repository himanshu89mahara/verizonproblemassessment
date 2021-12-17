import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingTestComponent } from './typing-test/typing-test.component';

const routes: Routes = [
  {path:'',component:TypingTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypingRoutingModule { }
