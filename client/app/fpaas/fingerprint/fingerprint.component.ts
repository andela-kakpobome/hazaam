import { Component } from '@angular/core';

import { AccordionComponent } from './accordion/accordion.component';

@Component({
  selector: 'fingerprint',
  templateUrl: './app/fpaas/fingerprint/fingerprint.component.html',
  styleUrls: ['./app/fpaas/fingerprint/fingerprint.component.css']
})

export class FingerPrintComponent {
  $id(id) {
    return document.getElementById(id);
  }

  Output(msg) {
  	let m = this.$id("messages");
  	m.innerHTML = msg + m.innerHTML;
  }

  FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
  }

  FileSelectHandler(e) {
    this.FileDragHover(e);

    let files = e.dataTransfer.files;
    console.log(files);
    // for(let i = 0, f; f = files[i]; i++) {
    //   this.ParseFile(f);
    // }
  }

  ParseFile(file) {
    this.Output(
      "<p>File information: <strong>" + file.name +
  		"</strong> type: <strong>" + file.type +
  		"</strong> size: <strong>" + file.size +
  		"</strong> bytes</p>"
    );
  }

  ngOnInit() {
    let fileDrag = this.$id("filedrag");

		fileDrag.style.display = "block";
  }
}
