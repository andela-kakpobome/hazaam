import { Component } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './app/fpaas/fingerprint/accordion/accordion.component.html',
  styleUrls: ['./app/fpaas/fingerprint/fingerprint.component.css']
})

export class AccordionComponent {

  accordionState: any = null;
  tab: string;
  
  public data: any = [{
    title: 'Fingerprint Data',
    rows: {
           "Code Count": 654,
           Code: "eJzVmmuOJDcOhK-kFynpOKQe9z_CfuwF3eJzVmmuOJDcOhK-kFynpOKQe9z_CfuwF3"
         }
  },
  {
    title: 'Metadata',
    rows: {
           artist: 'untitled',
           release: 'untitled',
           title: 'untitled',
           genre: 'untitled',
           bitrate: 1411,
           sample_rate: 44100,
           duration: 43,
           filename: '/Users/makinwa37/js-apps/ng2-start-test/myRecording00.wav',
           samples_decoded: 478208,
           given_duration: 0,
           start_offset: 0,
           version: 4.12,
           codegen_time: 0.063245,
           decode_time: 0.237394
         }
    }
  ];

  getKeys(data) {
    return Object.keys(data.rows);
  }

  //activate accordion
  activate(tab) {
    this.tab = tab;

    if(this.accordionState) {
      this.accordionState = null;
    } else {
      this.accordionState = "open-accordion";
    }
  }

  doAccordion(position) {
    if(position === this.tab) {
      return this.accordionState;
    }
  }
}
