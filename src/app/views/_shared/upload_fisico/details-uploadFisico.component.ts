import { Component, OnInit, Input } from '@angular/core';
import { UploadFisicoFileService } from './uploadFisico-file.service';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../../../../src/environments/environment';


@Component({
  selector: 'details-uploadFisico',
  templateUrl: './details-uploadFisico.component.html',
  styleUrls: ['./details-uploadFisico.component.css']
})
export class DetailsUploadFisicoComponent implements OnInit {
  public API_URL = environment.APIS_URL;

  @Input() fileUpload: any;

  constructor(private uploadFisicoFileSvc:UploadFisicoFileService) { }

  ngOnInit() {
  }

  getFile(ruta){
    this.uploadFisicoFileSvc.getFile(ruta);
  }

}

