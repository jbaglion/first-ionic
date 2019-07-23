import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../security/authentication.service';
import { ActividadesClientesService } from '../actividades-clientes.service';
import { ClienteReclamo } from 'src/app/models/cliente-reclamo';
import { listable } from 'src/app/models/listable.model';

@Component({
  selector: 'app-actividades-clientes-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})

export class ReclamosComponent implements OnInit {
  @Input() clienteId = 0;
  modoGenerico: boolean;
  dcClienteReclamos: string[] = [ 'nro', 'fecInicio', 'tipoReclamo', 'motivo', 'cliente', 'situacion',
                                  'administrador', 'prioridad', 'fecIncidente', 'nroIncidente'];
  mtClienteReclamos: MatTableDataSource<ClienteReclamo>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userId: number;
  userAcceso: string;
  vendedores: listable[];

  desde: FormControl;
  hasta: FormControl;
  descripcionInput: FormControl;
  vendedorSelect: FormControl;

  constructor(
    private actividadesClientesService: ActividadesClientesService,
    private authenticationService: AuthenticationService,
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
      // this.actividadesClientesService.getClientesConConsumos().subscribe(data => this.clientes = data);
      this.desde = new FormControl(new Date(new Date().setMonth(new Date().getMonth() - 1)));
      this.dcClienteReclamos.splice( 1, 0, 'razonSocial');
      if (this.userAcceso == '3') {
        this.actividadesClientesService.getVendedores().subscribe(data => this.vendedores = data);
        this.vendedorSelect = new FormControl('0');
      }

    }
    this.GetReclamos();
  }

  private GetReclamos() {
    let vendedor: string;
    let modoAdmin = false;
    if (this.vendedorSelect.value == 0 || !this.modoGenerico) {
      modoAdmin = this.userAcceso == '3';
      vendedor = this.userId.toString();
    } else {
      vendedor = this.vendedorSelect.value;
    }
    this.actividadesClientesService.GetReclamos(this.desde.value, this.hasta.value, vendedor, this.clienteId, modoAdmin).subscribe(data => {

      this.mtClienteReclamos = new MatTableDataSource(data);
      this.mtClienteReclamos.paginator = this.paginator;
      this.mtClienteReclamos.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue != null && filterValue != '') {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.mtClienteReclamos.filter = filterValue;
    }
  }

  GetReclamosFiltrados() {
    this.GetReclamos();
    this.applyFilter(this.descripcionInput.value);
  }
}
