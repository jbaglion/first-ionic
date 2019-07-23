import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxGalleryModule } from 'ngx-gallery';

import { OperativaClientesRoutingModule } from './operativa-clientes-routing.module';
import { SharedModule } from './../shared/shared.module';
import { OperativaClientesService } from './operativa-clientes.service';
import { ElectrosComponent } from './pages/electros/electros.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [ElectrosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OperativaClientesRoutingModule,
    SharedModule,
    NgxGalleryModule,
    FlexLayoutModule
  ],
  exports: [
    ElectrosComponent
  ],
  providers: [
    OperativaClientesService
  ],
})
export class OperativaClientesModule { }
