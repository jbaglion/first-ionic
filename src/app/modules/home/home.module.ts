import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { MaterialModule } from '../../material.module'

@NgModule({
    imports: [
        HomeRoutingModule,
        MaterialModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
  })

  export class HomeModule {
}
