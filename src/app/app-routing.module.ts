import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/modules/security/helpers';
import { NotFoundComponent } from '@app/modules/core/pages/not-found/not-found.component';

const routes: Routes = [
  // Traerme todas las rutas que tenga home.module (archivo) #clase
  { path: 'autologin', loadChildren: './modules/home/home.module#HomeModule' }, // canActivate: [AuthGuard]
  { path: 'bitacoras', loadChildren: './modules/bitacoras/bitacora.module#BitacoraModule', canActivate: [AuthGuard] },
  { path: 'afiliaciones', loadChildren: './modules/afiliaciones/afiliaciones.module#AfiliacionesModule', canActivate: [AuthGuard] },
  { path: 'actividadesclientes',
    loadChildren: './modules/actividades-clientes/actividades-clientes.module#ActividadesClientesModule',
    canActivate: [AuthGuard]
  },
  { path: 'electros', loadChildren: './modules/operativa-clientes/operativa-clientes.module#OperativaClientesModule' },
  { path: 'moli', loadChildren: './modules/moli/moli.module#MoliModule' },
  { path: 'facturacion', loadChildren: './modules/facturacion/facturacion.module#FacturacionModule', canActivate: [AuthGuard]},
  // Siempre debe estar al final.
  { path: '**', component: NotFoundComponent }
];

@NgModule({

  imports: [
    // Averiguar
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
