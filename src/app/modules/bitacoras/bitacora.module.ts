import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BitacoraDetailComponent } from './bitacora-detail/bitacora-detail.component';
import { ListBitacorasComponent } from './bitacoras-list/bitacoras-list.component';
import { MaterialModule } from '../../material.module';
import { UploadModule } from '../../modules/upload/upload.module';
import { BitacoraRoutingModule } from './bitacora-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgxGalleryModule } from 'ngx-gallery';

import { BitacorasService } from './bitacoras.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtInterceptor } from '../security/helpers';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';

@NgModule({
    declarations: [
        BitacoraDetailComponent,
        ListBitacorasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UploadModule,
        BitacoraRoutingModule,
        SharedModule,
        NgxGalleryModule,
        FlexLayoutModule
    ],
    exports: [
        BitacoraDetailComponent,
        ListBitacorasComponent
    ],
    providers: [
        BitacorasService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class BitacoraModule { }
