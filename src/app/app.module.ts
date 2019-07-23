import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { CoreModule } from '@app/modules/core/core.module';
import { AppComponent } from '@app/app.component';

import { AppRoutingModule } from './app-routing.module';
import { CommonService } from './services/common.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { SharedModule } from './modules/shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/modules/security/helpers/jwt.interceptor.ts';
import { ErrorInterceptor } from '@app/modules/core/helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgxWebstorageModule.forRoot()
  ],

  providers: [
    CommonService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent],

})
export class AppModule { }
