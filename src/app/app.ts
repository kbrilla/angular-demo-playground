import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{ title() }}`,
  host: {
    '[attr.id]': 'id + id',
  },
})
export class App {
  protected readonly title = signal('angular-v21-starter 👋🏼');
}
