import { Pipe, PipeTransform } from '@angular/core';
import { StatusPipe } from '../album/status.pipe';
import { Item } from './carousel.component';
import { Project } from '../album/project';
import { Post } from '../blog/post';

@Pipe({
  name: 'carousel'
})
export class CarouselPipe implements PipeTransform {
  transform(list: unknown[], model: string): Item[] {
    if (!list || !list.length) { return []; }
    model = model.toLowerCase();
    if (model === 'project') {
      const helperPipe = new StatusPipe();
      return (list as Project[]).map((value) => {
        return {
          icon: helperPipe.transform(value.status),
          title: value.name,
          img: value.thumbnailPath,
          desc: value.description,
          uri: `/album/${value.seq}`
        };
      });
    } else if (model === 'post') {
      return (list as Post[]).map((value) => {
        return {
          icon: value.icon,
          title: value.title,
          img: value.thumbnailPath,
          desc: value.description,
          uri: `/blog/${value.slug}`
        };
      });
    } else {
      return [];
    }
  }

}
