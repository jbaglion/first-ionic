import { Component } from '@angular/core';
import { AuthenticationService } from '../../security/authentication.service';
import { CommonService } from '../../../services/common.service';
import { Usuario } from '@app/modules/security/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: Usuario;
  titulo: string;

  constructor(
    private authenticationService: AuthenticationService,
    private commonService: CommonService
  ) {
    this.authenticationService.currentUser.subscribe(userLoged => { this.user = userLoged; });
    this.commonService.titulo.subscribe(currentTitulo => { this.titulo = currentTitulo; });
  }

  logout() {
    this.authenticationService.logout();
  }
}
