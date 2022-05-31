import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SharedDeclaredModules } from './shared-declared-modules';
import { SharedImportedModules } from './shared-imported-modules';

@NgModule({
  declarations: [...SharedDeclaredModules],
  imports: [CustomMaterialModule, CommonModule, ...SharedImportedModules],
  exports: [
    CustomMaterialModule,
    ...SharedDeclaredModules,
    ...SharedImportedModules,
  ],
})
export class SharedModule {}
