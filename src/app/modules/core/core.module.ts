import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/modules/shared/shared.module';
import { SecurityModule } from '@app/modules/security/security.module';
// import { HeaderComponent } from '@app/modules/core/components/header/header.component';
// import { FooterComponent } from '@app/modules/core/components/footer/footer.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
// import { SecureLayoutComponent } from '@app/modules/core/layouts/secure-layout/secure-layout.component';
// import { PublicLayoutComponent } from '@app/modules/core/layouts/public-layout/public-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    SecurityModule
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})

export class CoreModule {
}
