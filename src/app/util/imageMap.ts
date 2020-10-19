import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export enum MAP_LEVEL {
  FREE = 1,
  NORMAL = 3,
  EXTENDED = 5
}
export function setImagesFolder(folder = '') {
  imagesFolder = folder;
}
export function setMapLevel(level: MAP_LEVEL) {
  mapLevel = level;
}

let mapLevel = MAP_LEVEL.NORMAL;
let imagesFolder = '/images';

export function imagesMap(...args: string[]) {
  return (source: Observable<any>) => source.pipe(
    map(val => {
      if (isObject(val)) {
        const apply = applyWithArgs.bind({ args });
        let levelCount = 0;
        function applyLevel(level: any) {
          if (isIterable(level) && mapLevel !== (levelCount + 1)) {
            for (const item of level) {
              if (isObject(item)) {
                levelCount++;
                applyLevel(item);
              }
            }
          } else {
            apply(level);
            if (!args.length) { return; }
            if (++levelCount === mapLevel) { return; }
            for (const prop in level) {
              if (isObject(level[prop])) {
                applyLevel(level[prop]);
              }
            }
          }
        }
        applyLevel(val);
      }
      return val;
    })
  );
}

function isObject(val: any): boolean {
  return val != null && typeof val === 'object';
}
function isIterable(val: object): boolean {
  return Symbol.iterator in val;
}
function applyWithArgs(val: { [key: string]: string }) {
  for (let i = this.args.length; i >= 0; i--) {
    const imagePath = this.args[i];
    if (val.hasOwnProperty(imagePath)) {
      this.args.splice(i, 1);
      if (val[imagePath] && val[imagePath].startsWith(imagesFolder)) {
        val[imagePath] = environment.serverHost + val[imagePath];
      }
    }
  }
}
