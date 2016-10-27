import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';
import { FpaasComponent } from './fpaas/fpaas.component'
import { FingerPrintComponent } from './fpaas/fingerprint/fingerprint.component'

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        { path: '', component: AppComponent },
        { path: 'fpaas', component: FpaasComponent },
        { path: 'fpaas/fingerprint', component: FingerPrintComponent }
      ])
    ],
    declarations: [
      AppComponent,
      FpaasComponent,
      FingerPrintComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
