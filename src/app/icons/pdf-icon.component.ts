import { Component } from '@angular/core';

@Component({
  selector: 'pdf-icon',
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V8l-6-6z" />
    <text x="7" y="16" font-size="6" fill="red">PDF</text>
  </svg>`,
})
export class PdfIconComponent {}
