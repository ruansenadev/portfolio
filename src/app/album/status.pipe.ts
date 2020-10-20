import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string, type: string = 'icon'): string {
    value = value.toLowerCase();
    type = type.toLowerCase();
    if (status.hasOwnProperty(value) && status[value][type]) {
      return status[value][type];
    } else {
      return '';
    }
  }
}

const status = {
  protótipagem: {
    icon: 'construction',
    color: ''
  },
  desenvolvimento: {
    icon: 'build_circle',
    color: 'accent'
  },
  encerrado: {
    icon: 'highlight_off',
    color: 'warn'
  },
  finalizado: {
    icon: 'check_circle',
    color: 'primary'
  }
};
