import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComprobantesComponent } from './pages/comprobantes/comprobantes.component';
import { FacturacionService } from './facturacion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../security/helpers';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';
import { ComprobanteServiciosComponent } from './pages/comprobante-servicios/comprobante-servicios.component';
import { ServicioRenglonComponent } from './pages/servicio-renglones/servicio-renglones.component';


@NgModule({
  declarations: [ServicioRenglonComponent, ComprobantesComponent, ComprobanteServiciosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FacturacionRoutingModule,
    SharedModule,
    NgxGalleryModule,
    FlexLayoutModule
  ],
  entryComponents: [ServicioRenglonComponent],
  exports: [
    ServicioRenglonComponent
  ],
  providers: [
    FacturacionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class FacturacionModule { }
