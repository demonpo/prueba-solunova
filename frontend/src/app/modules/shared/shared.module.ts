import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import { FlatActionButtonComponent } from './components/flat-action-button/flat-action-button.component';
import {OnlyNumberDirective} from './directives/only-number/only-number.directive';




@NgModule({
    declarations: [
      FlatActionButtonComponent,
      OnlyNumberDirective,
    ],
    exports: [
      FlatActionButtonComponent,
      OnlyNumberDirective,
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MaterialModule,
    ]
})
export class SharedModule { }
