import { Component, Input } from '@angular/core';
import { ShareService } from "../share/share.service";

export interface Item {
  title: string;
  type: string;
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
  cards: Item[] = [
    {title: 'Item 1', type: 'batata', img: 'https://www.stevensegallery.com/360/170', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam tenetur explicabo unde eos! Ducimus, reprehenderit exercitationem? Ipsa dolorum repellendus saepe beatae eaque, veritatis quibusdam dicta maiores non, eos nam.', uri: '/'},
    {title: 'Item 2', type: 'batata', img: 'https://www.stevensegallery.com/360/320', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam tenetur explicabo unde eos! Ducimus, reprehenderit exercitationem? Ipsa dolorum repellendus saepe beatae eaque, veritatis quibusdam dicta maiores non, eos nam.', uri: '/'},
    {title: 'Item 3', type: 'batata', img: 'https://www.stevensegallery.com/420/280', desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis nemo vitae laudantium, exercitationem ullam provident sapiente sit repellendus consequatur veniam, cumque tempora, architecto tempore! Esse, deserunt? Voluptatum vel id quos!', uri: '/'},
    {title: 'Item 4', type: 'batata', img: 'https://www.stevensegallery.com/300/210', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit illum neque suscipit animi nesciunt blanditiis, incidunt ad nostrum perspiciatis. Ex autem velit nostrum quibusdam unde quas obcaecati sapiente quidem voluptate!', uri: '/'},
  ]
  onShare(uri: string) {
    this.shareService.openSheet(uri)
  }
}
