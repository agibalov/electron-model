import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ManipulationUpdate } from './manipulation-commons';

@Directive({
  selector: '[appMouseManipulator]'
})
export class MouseManipulatorDirective {
  private static readonly MOUSE_LEFT = 0;
  private static readonly MOUSE_RIGHT = 2;

  @Output() mouseManipulationBegin = new EventEmitter<void>();
  @Output() mouseManipulationUpdate = new EventEmitter<ManipulationUpdate>();
  @Output() mouseManipulationEnd = new EventEmitter<void>();

  private readonly inputElement: HTMLElement;

  private manipulationType: 'rotation' | 'translation';
  private startX: number;
  private startY: number;

  constructor(hostElement: ElementRef) {
    this.inputElement = hostElement.nativeElement as HTMLElement;
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('mouseup', ['$event'])
  onMouseEvent(e: MouseEvent) {
    const bounds = this.inputElement.getBoundingClientRect();
    const x = e.layerX / bounds.width;
    const y = e.layerY / bounds.width;

    if (this.manipulationType == null) {
      if (e.type === 'mousedown') {
        if (e.button === MouseManipulatorDirective.MOUSE_LEFT) {
          this.manipulationType = 'rotation';
          this.startX = x;
          this.startY = y;
          this.mouseManipulationBegin.emit();
        } else if (e.button === MouseManipulatorDirective.MOUSE_RIGHT) {
          this.manipulationType = 'translation';
          this.startX = x;
          this.startY = y;
          this.mouseManipulationBegin.emit();
        }
      }
    } else {
      if (e.type === 'mousemove') {
        const deltaX = this.startX - x;
        const deltaY = this.startY - y;
        if (this.manipulationType === 'rotation') {
          this.mouseManipulationUpdate.emit({
            rotationX: deltaX,
            rotationY: deltaY,
            translationX: 0,
            translationY: 0,
            translationZ: 0
          });
        } else if (this.manipulationType === 'translation') {
          this.mouseManipulationUpdate.emit({
            rotationX: 0,
            rotationY: 0,
            translationX: deltaX,
            translationY: deltaY,
            translationZ: 0
          });
        }
      } else if (e.type === 'mouseup') {
        if (e.button === MouseManipulatorDirective.MOUSE_LEFT || e.button === MouseManipulatorDirective.MOUSE_RIGHT) {
          this.mouseManipulationEnd.emit();
          this.manipulationType = null;
        }
      }
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    e.preventDefault();
    this.mouseManipulationBegin.emit();
    this.mouseManipulationUpdate.emit({
      rotationX: 0,
      rotationY: 0,
      translationX: 0,
      translationY: 0,
      translationZ: e.deltaY * 0.01
    });
    this.mouseManipulationEnd.emit();
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: Event) {
    e.preventDefault();
  }
}
