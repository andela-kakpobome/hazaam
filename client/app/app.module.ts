import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        { path: 'fpaas', component: AppComponent }
      ])
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
