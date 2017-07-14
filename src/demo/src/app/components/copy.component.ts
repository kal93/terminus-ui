import { Component } from '@angular/core';

@Component({
  selector: 'demo-copy',
  template: `
    <ts-copy
    >{{ fakeUrl }}</ts-copy>
  `,
})
export class CopyComponent {
  fakeUrl = 'https://github.com/angular/material2/blob/master/src/lib/input/input-container.ts';

}
