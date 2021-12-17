import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypingRoutingModule } from './typing-routing.module';
import { TypingTestComponent } from './typing-test/typing-test.component';
import { TypeCheckerDirective } from './directives/type-checker.directive';


@NgModule({
  declarations: [
    TypingTestComponent,
    TypeCheckerDirective
  ],
  imports: [
    CommonModule,
    TypingRoutingModule
  ]
})
export class TypingModule { }
