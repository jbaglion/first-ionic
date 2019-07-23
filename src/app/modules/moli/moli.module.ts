import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoliRoutingModule } from './moli-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MoliService } from './moli.service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoliComponent } from './moli.component';
import { MoliRealizadosComponent } from './pages/molirealizados/molirealizados.component';
import { MoliRechazadosComponent } from './pages/molirechazados/molirechazados.component';

@NgModule({
  declarations: [MoliComponent, MoliRealizadosComponent, MoliRechazadosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoliRoutingModule,
    SharedModule,
    // NgxGalleryModule,
    FlexLayoutModule
  ],
  exports: [
    MoliComponent
  ],
  providers: [
    MoliService
  ],
})
export class MoliModule { }
