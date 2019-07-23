import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsumosComponent } from './consumos/consumos.component';
import { CuentaCorrienteComponent } from './cuenta.corriente/cuenta.corriente.component';
import { GestionDetailComponent } from './gestiones/gestion-detail/gestion-detail.component';
import { GestionesComponent } from './gestiones/gestiones-list/gestiones.component';
import { ReclamosComponent } from './reclamos/reclamos.component';
import { ActividadesClientesComponent } from './actividades-clientes.component';

import { UploadModule } from '../../modules/upload/upload.module';
import { ActividadesClientesRoutingModule } from './actividades-clientes-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ActividadesClientesService } from './actividades-clientes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../security/helpers';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';


@NgModule({
    declarations: [
        ConsumosComponent,
        CuentaCorrienteComponent,
        GestionesComponent,
        GestionDetailComponent,
        ReclamosComponent,
        ActividadesClientesComponent
    ],

    imports: [
        UploadModule,
        ActividadesClientesRoutingModule,
        SharedModule
    ],
    exports: [
        ConsumosComponent,
        CuentaCorrienteComponent,
        GestionesComponent,
        GestionDetailComponent,
        ReclamosComponent,
        ActividadesClientesComponent
    ],
    providers: [
        ActividadesClientesService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class ActividadesClientesModule {
}