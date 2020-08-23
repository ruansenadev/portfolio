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
  private width: number
  private view: number
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
  onPress(e: PointerEvent | MouseEvent): void {
    const box = (this.box.nativeElement as HTMLDivElement)
    this.width = box.scrollWidth
    this.view = box.clientWidth
    this.pressPosition = e.pageX
    this.isMoving = true
    const state = box.style.getPropertyValue('transform')
    this.transformState = +state.slice(state.indexOf('(') + 1, state.indexOf('px'))
  }
  onMove(e: PointerEvent | MouseEvent): void {
    if (this.isMoving) {
      const currentPosition = e.pageX
      const X = this.transformState + (currentPosition - this.pressPosition)
      const outBoxSlice = this.width - this.view
      // case actual position plus difference (less or more) is going to move backward from start or forward from end
      if (X > 0 || Math.abs(X) > outBoxSlice ) { return }
      this.box.nativeElement.style.transform = `translateX(${X}px)`
    }
  }
  onRelease(e: PointerEvent | MouseEvent): void {
    this.isMoving = false
  }
}
