import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FpaasComponent } from './fpaas/fpaas.component';
import { FingerPrintComponent } from './fpaas/fingerprint/fingerprint.component';

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
