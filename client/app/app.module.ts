import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { AccordionComponent } from './fpaas/fingerprint/accordion/accordion.component';
import { FpaasComponent } from './fpaas/fpaas.component';
import { FingerPrintComponent } from './fpaas/fingerprint/fingerprint.component';
import { PluckKeysPipe } from './pipes/pluck-keys.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'fpaas', component: FpaasComponent },
      { path: 'fpaas/fingerprint', component: FingerPrintComponent }
    ])
  ],
  declarations: [
    AccordionComponent,
    AppComponent,
    FingerPrintComponent,
    FpaasComponent,
    HomeComponent,
    PluckKeysPipe
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
