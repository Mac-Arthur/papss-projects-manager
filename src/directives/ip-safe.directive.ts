import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appIpSafe]',
})
export class IpSafeDirective {
  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.]/g, '');
  }
}
