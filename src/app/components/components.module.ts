import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [InputComponent, TableComponent],

  imports: [CommonModule, SharedModule, NgxMaskModule.forRoot()],
  exports: [InputComponent, TableComponent],
})
export class ComponentsModule {}
