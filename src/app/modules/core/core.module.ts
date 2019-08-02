import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '@app/modules/shared/shared.module';
import { SecurityModule } from '@app/modules/security/security.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { SecureLayoutComponent } from './layouts/secure-layout/secure-layout.component';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    NotFoundComponent,
    PublicLayoutComponent,
    SecureLayoutComponent,
  ],
  imports: [
    SharedModule,
    SecurityModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})

export class CoreModule {
}
