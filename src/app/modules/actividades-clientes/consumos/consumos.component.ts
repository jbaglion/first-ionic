import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../security/authentication.service';
import { ActividadesClientesService } from '../actividades-clientes.service';
import { ClienteConsumo } from 'src/app/models/cliente-consumo';
import { listable } from 'src/app/models/listable.model';

@Component({
  selector: 'app-actividades-clientes-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.css']
})

export class ConsumosComponent implements OnInit {
  @Input() clienteId = 0;
  modoGenerico: boolean;
  dcClienteConsumos = [ 'nro', 'fecIncidente', 'nroIncidente', 'gradoId', 'domicilio',
                        'horLlamada', 'movil', 'cierre', 'horLlegada', 'horFinal'];
  mtClienteConsumos: MatTableDataSource<ClienteConsumo>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userId: number;
  userAcceso: string;
  vendedores: listable[];
  // clientes: listable[];

  desde: FormControl;
  hasta: FormControl;
  descripcionInput: FormControl;
  vendedorSelect: FormControl;
  // clienteSelect: FormControl;

  constructor(
    private actividadesClientesService: ActividadesClientesService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
    // this.clienteSelect = new FormControl('0');
  }

  ngOnInit() {
    this.userId = this.authenticationService.currentUserValue.id;
    this.userAcceso = this.authenticationService.currentUserValue.acceso;
    this.desde = new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    this.hasta = new FormControl(new Date());
    this.modoGenerico = this.clienteId == 0;
    this.descripcionInput = new FormControl();
    this.vendedorSelect = new FormControl('');

    // this.clienteSelect = new FormControl(this.clienteId);

    if (this.modoGenerico) {
      // this.actividadesClientesService.getClientesConConsumos().subscribe(data => this.clientes = data);
      this.desde = new FormControl(new Date(new Date().setMonth(new Date().getMonth() - 1)));
      this.dcClienteConsumos.splice( 1, 0, 'razonSocial');
      if (this.userAcceso == '3') {
        this.actividadesClientesService.getVendedores().subscribe(data => this.vendedores = data);
        this.vendedorSelect = new FormControl('0');
      }

    }
    this.GetConsumos();
  }

  public GetConsumos() {
    let vendedor: string;
    let modoAdmin = false;
    if (this.vendedorSelect.value == 0 || !this.modoGenerico) {
      modoAdmin = this.userAcceso == '3';
      vendedor = this.userId.toString();
    } else {
      vendedor = this.vendedorSelect.value;
    }
    this.actividadesClientesService.GetConsumos(this.desde.value, this.hasta.value, vendedor, this.clienteId, modoAdmin)
    .subscribe(data => {
      this.mtClienteConsumos = new MatTableDataSource(data);
      this.paginator.length = data.length;
      this.mtClienteConsumos.paginator = this.paginator;
      this.mtClienteConsumos.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue != null && filterValue != '') {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.mtClienteConsumos.filter = filterValue;
    }
  }

  GetReclamosFiltrados() {
    this.GetConsumos();
    this.applyFilter(this.descripcionInput.value);
  }
}
