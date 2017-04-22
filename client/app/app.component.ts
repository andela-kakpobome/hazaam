import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})

export class AppComponent {
  friends = [
    { age: 40, name: 'Jordan' },
    { age: 30, name: 'Michael' }
  ]
}
