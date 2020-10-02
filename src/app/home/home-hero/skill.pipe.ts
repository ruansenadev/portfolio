import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skill'
})
export class SkillPipe implements PipeTransform {

  transform(value: any): string {
    switch (Object.getPrototypeOf(value)) {
      case Array.prototype:
        return ` [ ${value.join(', ')} ]`;
      case String.prototype:
        return ` '${value}'`;
      case Boolean.prototype:
        return ` ${value}`;
      default:
        return ` ${value.toString()}`;
    }
  }

}
