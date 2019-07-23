import { AuthGuard } from './helpers/auth.guard';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/modules/shared/shared.module';
import { AuthenticationService } from './authentication.service';
import { JwtInterceptor } from './helpers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard,
    AuthenticationService
  ]
})
export class SecurityModule {}
