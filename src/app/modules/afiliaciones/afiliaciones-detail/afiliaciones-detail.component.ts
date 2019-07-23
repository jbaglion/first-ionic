import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppConfig } from '../../../configs/app.config';


@Component({
  selector: 'app-afiliaciones-detail',
  templateUrl: './afiliaciones-detail.component.html',
  styleUrls: ['./afiliaciones-detail.component.css']
})
export class AfiliacionesDetailComponent implements OnInit {

  url_1: string = AppConfig.endpoints.oldExranet + 'afiliacionesPopUp?GetDirectClienteId=';
  url_2 = '&GetDirectSolicitud=true';
  url_3 = '&Acceso=';
  url_4 = '&Estado=';
  urlFinal: string;
  constructor(
    public dialogRef: MatDialogRef<AfiliacionesDetailComponent>
    , @Inject(MAT_DIALOG_DATA) public data: AfiliacionesDialogData
  ) {

    this.urlFinal = this.url_1 + data.clienteId + this.url_2 + this.url_3 + data.acceso + this.url_4 + data.estado;
    alert(this.urlFinal);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}

export interface AfiliacionesDialogData {
  clienteId: string;
  acceso: string;
  estado: string;
}
