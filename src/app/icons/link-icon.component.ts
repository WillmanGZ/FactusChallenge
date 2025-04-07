import { Component } from '@angular/core';

@Component({
  selector: 'link-icon',
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M10 14L21 3m0 0v7m0-7h-7" />
    <path d="M21 13v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
  </svg>`,
})
export class LinkIconComponent {}
