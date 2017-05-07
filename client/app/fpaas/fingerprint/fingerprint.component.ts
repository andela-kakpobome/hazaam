import { Component, OnInit } from '@angular/core';

import { FingerPrintService } from '../../shared/fingerprint.service';
import { AccordionComponent } from './accordion/accordion.component';

@Component({
  selector: 'fingerprint',
  templateUrl: './app/fpaas/fingerprint/fingerprint.component.html',
  styleUrls: ['./app/fpaas/fingerprint/fingerprint.component.css'],
  providers: [ FingerPrintService ]
})

export class FingerPrintComponent implements OnInit {
  $id(id) {
    return document.getElementById(id);
  }

  constructor(private fingerprintService: FingerPrintService) {
    console.log("Output;");
    console.log(location.hostname);
    console.log(document.domain);

    console.log("document.URL : "+document.URL);
    console.log("document.location.href : "+document.location.href);
    console.log("document.location.origin : "+document.location.origin);
    console.log("document.location.hostname : "+document.location.hostname);
    console.log("document.location.host : "+document.location.host);
    console.log("document.location.pathname : "+document.location.pathname);
  }

  prepareFile(file) {
    const formData: any = new FormData;
    formData.append("uploads[]", file[0], file[0]['name']);

    return formData
  }

  FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
  }

  FileSelectHandler(e) {
    this.FileDragHover(e);
    let files = e.dataTransfer.files;
    let parsedFile = this.prepareFile(files);

    this.createFingerprint(parsedFile);
  }

  createFingerprint(parsedFile) {
    this.fingerprintService.create(parsedFile)
      .then(
        data => console.log("success", data),
        error => console.log("error", error)
      );
  }

  ngOnInit() {
    let fileDrag = this.$id("filedrag");

		fileDrag.style.display = "block";
  }
}
