import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AfiliacionesDetailComponent } from './afiliaciones-detail/afiliaciones-detail.component';
import { AfiliacionesListComponent } from './afiliaciones-list/afiliaciones-list.component';
import { PotencialExitoComponent } from './dialog-potencial-exito/dialog-potencial-exito.component';

import { MaterialModule } from '../../material.module';

import { AfiliacionesRoutingModule } from './afiliaciones-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AfiliacionesService } from './afiliaciones.service';
import { AfiliacionesComponent } from './afiliaciones.component';
import { ActividadesClientesModule } from '../actividades-clientes/actividades-clientes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../security/helpers';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
    declarations: [
        AfiliacionesComponent,
        AfiliacionesDetailComponent,
        AfiliacionesListComponent,
        PotencialExitoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ActividadesClientesModule,
        AfiliacionesRoutingModule,
        SharedModule,
        // Specify ng-circle-progress as an import
        NgCircleProgressModule.forRoot({
          // set defaults here
          radius: 100,
          outerStrokeWidth: 22,
          innerStrokeWidth: 10,
          outerStrokeColor: '#78C000',
          innerStrokeColor: '#C7E596',
          animation: false,
          responsive: true,
          renderOnClick: false,
          showTitle: true,
          showSubtitle: false,

          // titleFontSize: '100',
          // showUnits: false,
          showUnits: true,
          titleFontSize: '72',
          unitsFontSize: '68',
          space: -4
        })
    ],
    entryComponents: [PotencialExitoComponent],
    exports: [
        AfiliacionesComponent,
        AfiliacionesDetailComponent,
        AfiliacionesListComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AfiliacionesService
    ]
})
export class AfiliacionesModule { }
