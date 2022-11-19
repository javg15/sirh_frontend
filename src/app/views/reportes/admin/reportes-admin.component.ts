import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReportesService } from '../services/reportes.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.css']
})


export class ReportesAdminComponent implements OnInit {


  constructor(
    private reportesService: ReportesService,private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

  }


  openModal(id: string, accion: string, idItem: number) {
    this.reportesService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.reportesService.close(id);
  }


}

