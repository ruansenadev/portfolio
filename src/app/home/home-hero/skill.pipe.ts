import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skill'
})
export class SkillPipe implements PipeTransform {

  transform(value: any): string {
    switch (typeof value) {
      case 'object':
        return `[ ${value.join(', ')} ]`
      case 'string':
        return `'${value}'`
      default:
        return value+''
    }
  }

}
