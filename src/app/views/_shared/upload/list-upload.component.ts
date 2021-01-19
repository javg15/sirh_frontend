import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.showFiles(0);
  }

  showFiles(idArchivos:number) {//enable: boolean
    /*this.showFile = enable;

    if (enable && this.idFile>0) {*/
      this.fileUploads = this.uploadService.listFile(idArchivos);
    //}
  }
}
