import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { LayoutModule  } from '@angular/cdk/layout';
import { MaterialModule } from '@app/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SafePipe } from './helpers/safe.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    LayoutModule,
    CdkTableModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    SafePipe,
    SpinnerComponent
  ],
  entryComponents: [DialogComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    LayoutModule,
    CdkTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SafePipe
 ]
})

export class SharedModule {

}
