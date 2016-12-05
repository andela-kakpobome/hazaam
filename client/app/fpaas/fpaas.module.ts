import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FpaasComponent } from './fpaas.component';
import { FingerPrintComponent } from './fingerprint/fingerprint.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FpaasComponent,
    FingerPrintComponent
  ],
  bootstrap: [ FpaasComponent ]
})

export class FpaasModule {}
