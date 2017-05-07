import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { FingerPrintService } from '../shared/fingerprint.service';
import { FpaasComponent } from './fpaas.component';
import { FingerPrintComponent } from './fingerprint/fingerprint.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    FpaasComponent,
    FingerPrintComponent
  ],
  bootstrap: [ FpaasComponent ],
  providers: [ FingerPrintService ]
})

export class FpaasModule {}
