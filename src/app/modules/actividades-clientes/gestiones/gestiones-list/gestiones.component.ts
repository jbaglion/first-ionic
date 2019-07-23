import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../security/authentication.service';
import { ClientesGestion } from 'src/app/models/clientes-gestion';
import { ActividadesClientesService } from '../../actividades-clientes.service';
import { GestionDetailComponent } from '../gestion-detail/gestion-detail.component';
import { listable } from 'src/app/models/listable.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-actividades-clientes-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})

export class GestionesComponent implements OnInit {
  @Input() clienteId = 0;
  modoGenerico: boolean;
  dcClientesGestiones: string[] = ['fecha', 'tipoGestion', 'observaciones', 'fechaRecontacto', 'adjunto', 'edit', 'delete'];
  mtClientesGestiones: MatTableDataSource<ClientesGestion>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userId: number;
  userAcceso: string;
  vendedores: listable[];
  tiposFechas: listable [];
  descripcionInput: FormControl;
  // clientes: listable[];

  tipoFechaGestionSelect: FormControl;
  desde: FormControl;
  hasta: FormControl;
  vendedorSelect: FormControl;
  // clienteSelect: FormControl;

  constructor(
    private gestionesService: ActividadesClientesService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.userId = this.authenticationService.currentUserValue.id;
    this.userAcceso = this.authenticationService.currentUserValue.acceso;
    this.desde = new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    this.hasta = new FormControl(new Date());
    this.modoGenerico = this.clienteId == 0;
    this.descripcionInput = new FormControl();
    this.vendedorSelect = new FormControl('');

    if (this.modoGenerico) {
      if (this.userAcceso == '3') {
        this.gestionesService.getVendedores().subscribe(data => { this.vendedores = data; });
        // alert(data);
        this.vendedorSelect = new FormControl('0');
      }

      // this.gestionesService.getClientesConGestiones().subscribe(data => this.clientes = data);
      this.tiposFechas = new Array<listable>(new listable('0', 'Realizadas'), new listable('1', 'Programadas'));
      this.dcClientesGestiones.splice( 1, 0, 'razonSocial');
    }
    // this.clienteSelect = new FormControl('0');
    this.tipoFechaGestionSelect = new FormControl('0');
    this.LoadData();
  }

  private GetGestiones() {
    this.gestionesService.GetGestiones(this.clienteId).subscribe(data => {
      this.mtClientesGestiones = new MatTableDataSource(data);
      this.paginator.length = data.length;
      this.mtClientesGestiones.paginator = this.paginator;
      this.mtClientesGestiones.sort = this.sort;
    });
  }

  GetGestionesGenerales() {
    let vendedor: string;
    let modoAdmin = false;
    if (this.vendedorSelect.value == 0) {
      modoAdmin = this.userAcceso == '3';
      vendedor = this.userId.toString();
    } else {
      vendedor = this.vendedorSelect.value;
    }

    this.gestionesService.GetGestionesGenerales( this.tipoFechaGestionSelect.value,
                                        this.desde.value,
                                        this.hasta.value,
                                        vendedor,
                                        0,
                                        modoAdmin).subscribe(
      data => {
        this.mtClientesGestiones = new MatTableDataSource(data);
        this.paginator.length = data.length;
        this.mtClientesGestiones.paginator = this.paginator;
        this.mtClientesGestiones.sort = this.sort;
      });
  }

  private LoadData() {
    if (this.modoGenerico) {
      this.GetGestionesGenerales();
    } else { this.GetGestiones(); }
    this.applyFilter(this.descripcionInput.value);
  }

  eliminarGestion(id: any) {
    console.log(`eliminar gestion id= ${id}`);
    this.gestionesService.EliminarGestion(id).subscribe(result => { if (result == null) { this.LoadData(); } });
  }


  applyFilter(filterValue: string) {
    if (filterValue != null && filterValue != '') {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.mtClientesGestiones.filter = filterValue;
    }
  }

  verGestion(id: any = 0, element: ClientesGestion = null): void {

    const dialogRef = this.dialog.open(GestionDetailComponent, {
      width: '95vw',
      maxWidth: '700px',
      data: { id: id, clienteId: this.clienteId, acceso: this.userAcceso, elemento: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'updated') {
        this.LoadData();
      }
    });
  }
}
