import { Pipe, PipeTransform } from '@angular/core';
import { Item } from "./carousel.component";
import { Project } from "../album/project";
import { Post } from "../blog/post";

@Pipe({
  name: 'carousel'
})
export class CarouselPipe implements PipeTransform {
  transform(list: Project[] | Post[], model: string): Item[] {
    if (!list || !list.length) { return [] }
    model = model.toLowerCase()
    if (model === 'project') {
      return (list as Project[]).map((value) => {
        return {
          title: value.name,
          img: value.thumbnailPath,
          desc: value.description,
          uri: `/album/${value.seq}`
        }
      })
    } else if (model === 'post') {
      return (list as Post[]).map((value) => {
        return {
          title: value.title,
          img: value.thumbnailPath,
          desc: value.description,
          uri: `/blog/${value.slug}`
        }
      })
    } else {
      return [];
    }
  }

}
