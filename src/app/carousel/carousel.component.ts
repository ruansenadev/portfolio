import { Component, OnInit } from '@angular/core';

export interface Item {
  title: string;
  no: number;
  img: string;
  desc: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  constructor() { }
  items: Item[] = [
    {title: 'Item 1', no: 1, img: 'https://www.stevensegallery.com/360/170', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam tenetur explicabo unde eos! Ducimus, reprehenderit exercitationem? Ipsa dolorum repellendus saepe beatae eaque, veritatis quibusdam dicta maiores non, eos nam.'},
    {title: 'Item 2', no: 2, img: 'https://www.stevensegallery.com/360/320', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nam tenetur explicabo unde eos! Ducimus, reprehenderit exercitationem? Ipsa dolorum repellendus saepe beatae eaque, veritatis quibusdam dicta maiores non, eos nam.'},
    {title: 'Item 3', no: 3, img: 'https://www.stevensegallery.com/420/280', desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis nemo vitae laudantium, exercitationem ullam provident sapiente sit repellendus consequatur veniam, cumque tempora, architecto tempore! Esse, deserunt? Voluptatum vel id quos!'},
    {title: 'Item 4', no: 4, img: 'https://www.stevensegallery.com/300/210', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit illum neque suscipit animi nesciunt blanditiis, incidunt ad nostrum perspiciatis. Ex autem velit nostrum quibusdam unde quas obcaecati sapiente quidem voluptate!'},
  ]
  ngOnInit(): void {
  }

}
