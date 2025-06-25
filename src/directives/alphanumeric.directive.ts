import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]',
})
export class AlphanumericDirective {
  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;

    // Allow letters, numbers, spaces, and safe characters: @ . _ - # , !
    input.value = input.value.replace(/[^a-zA-Z0-9@._\-#,! ]/g, '');
  }
}
