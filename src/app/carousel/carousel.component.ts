import { Component, Input } from '@angular/core';
import { ShareService } from "../share/share.service";

export interface Item {
  title: string;
  img: string;
  desc: string;
  uri: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  constructor(private shareService: ShareService) { }
  @Input() title: string = ''
  @Input() items: Item[] = []
  onShare(uri: string) {
    this.shareService.openSheet(uri)
  }
}
