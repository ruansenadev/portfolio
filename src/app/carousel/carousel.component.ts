import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ShareService } from '../share/share.service';

export interface Item {
  icon: string;
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
export class CarouselComponent implements AfterViewInit {
  constructor(private shareService: ShareService) { }
  @ViewChild('box') boxRef;
  private box: HTMLDivElement;
  skeleton = Array(4);
  private tolerance = 32;
  private pressPosition: number = null;
  private outBoxSlice: number;
  private transformState = 0;
  private isMoving = false;
  @Input() title = '';
  @Input() items: Item[] = [];
  ngAfterViewInit(): void {
    this.box = this.boxRef.nativeElement;
  }
  onShare(uri: string) {
    this.shareService.openSheet(uri);
  }
  onDrag(e: DragEvent): void {
    e.preventDefault();
  }
  updateTransformState(): void {
    const state = this.box.style.getPropertyValue('transform');
    this.transformState = +state.slice(state.indexOf('(') + 1, state.indexOf('px'));
  }
  onPress(e: PointerEvent | MouseEvent): void {
    this.outBoxSlice = this.box.scrollWidth - this.box.clientWidth;
    this.pressPosition = e.pageX;
    this.isMoving = true;
    this.updateTransformState();
  }
  onMove(e: PointerEvent | MouseEvent): void {
    if (this.isMoving) {
      const currentPosition = e.pageX;
      const X = this.transformState + (currentPosition - this.pressPosition);

      // case actual position plus difference (less or more) is going to move backward from start or forward from end
      if (X > (0 + this.tolerance) || Math.abs(X) > (this.outBoxSlice + this.tolerance)) { return; }
      this.box.style.transform = `translateX(${X}px)`;
    }
  }
  onRelease(): void {
    this.isMoving = false;
    // restores inner state
    this.updateTransformState();
    if (this.transformState > 0) {
      this.box.style.transform = `translateX(${0}px)`;
    } else if (Math.abs(this.transformState) > this.outBoxSlice) {
      this.box.style.transform = `translateX(${-(this.outBoxSlice)}px)`;
    }
  }
}
