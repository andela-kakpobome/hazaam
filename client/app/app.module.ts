import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';
import { FpaasComponent } from './fpaas/fpaas.component'

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        { path: '', component: AppComponent },
        { path: 'fpaas', component: FpaasComponent }
      ])
    ],
    declarations: [
      AppComponent,
      FpaasComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
