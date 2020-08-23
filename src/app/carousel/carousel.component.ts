import { Component, Input, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { ShareService } from "../share/share.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from 'rxjs/operators';

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
export class CarouselComponent implements OnChanges {
  constructor(private shareService: ShareService, private breakpointObserver: BreakpointObserver) { }
  @ViewChild('box') box: ElementRef
  private pressPosition: number = null
  private transformState: number = 0
  private isMoving: boolean = false
  @Input() title: string = ''
  @Input() items: Item[] = []
  onShare(uri: string) {
    this.shareService.openSheet(uri)
  }
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['items']) {
      if (this.items) {
        // observe for gesture events availability
      }
    }
  }
  onPress(e: MouseEvent): void {
    this.pressPosition = e.pageX
    this.isMoving = true
    const state = (this.box.nativeElement as HTMLDivElement).style.getPropertyValue('transform')
    this.transformState = +state.slice(state.indexOf('(') + 1, state.indexOf('px'))
  }
  onMove(e: MouseEvent): void {
    if (this.isMoving) {
      const currentPosition = e.pageX
      const diff = currentPosition - this.pressPosition
      this.box.nativeElement.style.transform = `translateX(${this.transformState + diff}px)`
    }
  }
  onRelease(e: MouseEvent): void {
    this.isMoving = false
  }
}
