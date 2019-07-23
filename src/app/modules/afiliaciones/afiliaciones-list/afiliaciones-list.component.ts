import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';

import { AfiliacionesService } from '../afiliaciones.service';
import { CommonService } from '@app/services/common.service';
import { AuthenticationService } from '../../security/authentication.service';

import { listable } from 'src/app/models/listable.model';
import { AfiliacionesDetailComponent } from '../afiliaciones-detail/afiliaciones-detail.component';
import { ClientePotencial, ClientePotencialForExcel } from 'src/app/models/cliente-potencial.model';
import { PotencialExitoComponent } from '../dialog-potencial-exito/dialog-potencial-exito.component';
import { ExportMatTableToXlxs } from '@app/modules/shared/helpers/export-mat-table-to-xlxs';

@Component({
  selector: 'app-afiliaciones-list',
  templateUrl: './afiliaciones-list.component.html',
  styleUrls: ['./afiliaciones-list.component.css']
})

export class AfiliacionesListComponent implements OnInit {

  dcClientesPotencialesBasic: string[] = ['nombreComercial', 'rubro', 'razonSocial', 'cuit',
    'domicilio', 'localidad', 'credencialID', 'importeMensual', 'estado', 'actividad'];
  dcClientesPotenciales: string[] = this.dcClientesPotencialesBasic;

  mtClientesPotenciales: MatTableDataSource<ClientePotencial>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userToken: string;
  userAcceso: string;

  vendedores: listable[] = [{ descripcion: 'Todos', id: '0' }]; // For fix error load.
  tiposClientesSelect: FormControl;
  vendedoresSelect: FormControl;
  descripcionInput: FormControl;

  tiposClientes: listable[] = [
    { descripcion: 'Todos', id: '0' },
    { descripcion: 'Potenciales', id: '1' },
    { descripcion: 'Preparados', id: '2' },
    { descripcion: 'Activos', id: '3' },
    { descripcion: 'Inactivos', id: '4' },
    { descripcion: 'Suspendidos', id: '5' }
  ];
  tooltipExito: listable[] = [
    { descripcion: 'Todos', id: '0' },
    { descripcion: 'Cambiar potencial de Exito', id: '1' },
    { descripcion: 'Cambiar estado Preparado', id: '2' },
    { descripcion: 'Activos', id: '3' },
    { descripcion: 'Inactivos', id: '4' },
    { descripcion: 'Suspendidos', id: 'Cambiar estado Suspendido' }
  ];
  estadosDesc: any[] = [
    { descripcion: 'Sin estado', icon: 'radio_button_unchecked', color: 'grey' },
    { descripcion: 'Potencial', icon: 'error', color: 'oldGold' }, // A400
    { descripcion: 'Preparado', icon: 'check_circle_outline', color: 'primary' },
    { descripcion: 'Activo', icon: 'check_circle_outline', color: 'success' },
    { descripcion: 'Inactivo', icon: 'cancel_outline', color: 'warn' },
    { descripcion: 'Suspendidos', icon: 'pause_circle_outline', color: 'accent' }
  ];



  constructor(
    private afiliacionesService: AfiliacionesService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private router: Router) {

    this.commonService.setTitulo('Clientes Potenciales');

    this.descripcionInput = new FormControl();
    this.tiposClientesSelect = new FormControl(this.tiposClientes[0].id);
    this.vendedoresSelect = new FormControl(this.vendedores[0].id);
    this.afiliacionesService.getVendedores().subscribe(data => {
      this.vendedores = data;
    });

    this.userAcceso = this.authenticationService.currentUserValue.acceso;
  }

  ngOnInit() {
    this.afiliacionesService.getClientePotencial(this.tiposClientes[0].id, '').subscribe(data => {
      this.mtClientesPotenciales = new MatTableDataSource(data);
      this.mtClientesPotenciales.paginator = this.paginator;
      this.mtClientesPotenciales.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue != null && filterValue != '') {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.mtClientesPotenciales.filter = filterValue;
    }
  }

  GetClientesFiltrados() {
    this.afiliacionesService.getClientePotencial(this.tiposClientesSelect.value, this.vendedoresSelect.value).subscribe(
      data => {
        if (this.tiposClientesSelect.value == 5) {
          this.dcClientesPotenciales = this.dcClientesPotencialesBasic.concat('potencialExito', 'motivoSuspension');
          this.dcClientesPotenciales.splice(this.dcClientesPotenciales.indexOf('domicilio'), 1);
        } else if (this.tiposClientesSelect.value == 1) {
          this.dcClientesPotenciales = this.dcClientesPotencialesBasic.concat(['potencialExito']);
        } else {
          this.dcClientesPotenciales = this.dcClientesPotencialesBasic;
        }
        this.mtClientesPotenciales.data = data;
        // this.renderedDataFull = data;

        this.applyFilter(this.descripcionInput.value);

      });
  }

  openDialogCliente(paramClienteId: number = 0, paramClienteEstado: number = 1, ): void {
    const dialogRef = this.dialog.open(AfiliacionesDetailComponent, {
      width: '95vw',
      height: '95%',
      maxWidth: '95vw',
      panelClass: 'my-panel',
      data: { clienteId: paramClienteId, acceso: this.userAcceso, estado: paramClienteEstado }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  navigateToActividadCliente(paramClienteId: number = 0) {
    this.router.navigate(['actividadesclientes/', paramClienteId]);
  }

  cambiarPotencialExito(element: ClientePotencial = null): void {

    // alert('id' + id);
    const dialogRef = this.dialog.open(PotencialExitoComponent, {
      width: '95vw',
      maxWidth: '380px',
      data: { elemento: element } // id: id, clienteId: this.clienteId, acceso: this.userAcceso,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'updated') {
        this.GetClientesFiltrados();
      }
    });
  }

  exportToExcel() {
    ExportMatTableToXlxs.export(new ClientePotencialForExcel(), this.mtClientesPotenciales, 'afiliaciones', this.commonService);
  }
}
