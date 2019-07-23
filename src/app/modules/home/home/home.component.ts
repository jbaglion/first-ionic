import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../security/models/usuario.model';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../security/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario[] = [];
  site: string;
  userToken: string;
  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router, ) {
    activatedRoute.params.subscribe(params => {
      this.site = params['site'];
      this.userToken = params['token'];

      //Works as login
      this.authenticationService.loginByToken(this.userToken).pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.site]);
          },
          error => {
            console.log(error);
            this.authenticationService.logout();
          });
    });
  }

  ngOnInit() {
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //     this.usuario = users;
    // });
  }
}
