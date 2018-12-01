import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ManipulationUpdate } from './manipulation-commons';

@Directive({
  selector: '[appTouchManipulator]'
})
export class TouchManipulatorDirective {
  @Output() touchManipulationBegin = new EventEmitter<void>();
  @Output() touchManipulationUpdate = new EventEmitter<ManipulationUpdate>();
  @Output() touchManipulationEnd = new EventEmitter<void>();

  private readonly manipulationListener: ManipulationListener;
  private readonly touchEventHandlers: { [touchEventType: string]: (touch: Touch) => void } = {
    'touchstart': (touch: Touch) => this.state = this.state.onTouchStart(touch, this.manipulationListener),
    'touchend': (touch: Touch) => this.state = this.state.onTouchEnd(touch, this.manipulationListener),
    'touchmove': (touch: Touch) => this.state = this.state.onTouchMove(touch, this.manipulationListener)
  };
  private state: State = new IdleState();

  constructor(hostElement: ElementRef) {
    this.manipulationListener = new ManipulationListener(
      hostElement.nativeElement as HTMLElement,
      this.touchManipulationBegin,
      this.touchManipulationUpdate,
      this.touchManipulationEnd);
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  onTouchEvent(e: TouchEvent) {
    e.preventDefault();

    const handler: (touch: Touch) => void = this.touchEventHandlers[e.type];
    for (let i = 0; i < e.changedTouches.length; ++i) {
      const touch = e.changedTouches[i];
      handler(touch);
    }
  }
}

class ManipulationListener {
  constructor(
    private readonly inputElement: HTMLElement,
    private readonly manipulationBegin: EventEmitter<void>,
    private readonly manipulationUpdate: EventEmitter<ManipulationUpdate>,
    private readonly manipulationEnd: EventEmitter<void>) {
  }

  onStart(): void {
    this.manipulationBegin.emit();
  }

  onUpdate(info: ManipulationUpdate): void {
    const bounds = this.inputElement.getBoundingClientRect();
    this.manipulationUpdate.emit({
      rotationX: info.rotationX / bounds.width,
      rotationY: info.rotationY / bounds.width,
      translationX: info.translationX / bounds.width,
      translationY: info.translationY / bounds.width,
      translationZ: info.translationZ / bounds.width * 100 // TODO: get rid of this
    });
  }

  onEnd(): void {
    this.manipulationEnd.emit();
  }
}

interface State {
  onTouchStart(touch: Touch, manipulationListener: ManipulationListener): State;
  onTouchMove(touch: Touch, manipulationListener: ManipulationListener): State;
  onTouchEnd(touch: Touch, manipulationListener: ManipulationListener): State;
}

class IdleState implements State {
  onTouchStart(touch: Touch, manipulationListener: ManipulationListener): State {
    manipulationListener.onStart();
    return new RotationState(touch.identifier, touch.pageX, touch.pageY);
  }

  onTouchMove(touch: Touch, manipulationListener: ManipulationListener): State {
    return this;
  }

  onTouchEnd(touch: Touch, manipulationListener: ManipulationListener): State {
    return this;
  }
}

class RotationState implements State {
  private currentX: number;
  private currentY: number;

  constructor(
    private readonly touchId: number,
    private readonly startX: number,
    private readonly startY: number) {

    this.currentX = startX;
    this.currentY = startY;
  }

  onTouchStart(touch: Touch, manipulationListener: ManipulationListener): State {
    manipulationListener.onEnd();
    manipulationListener.onStart();
    return new TranslationState(
      this.touchId, this.currentX, this.currentY,
      touch.identifier, touch.pageX, touch.pageY);
  }

  onTouchMove(touch: Touch, manipulationListener: ManipulationListener): State {
    if (touch.identifier !== this.touchId) {
      return this;
    }

    this.currentX = touch.pageX;
    this.currentY = touch.pageY;

    const deltaX = this.startX - this.currentX;
    const deltaY = this.startY - this.currentY;

    manipulationListener.onUpdate({
      rotationX: deltaX,
      rotationY: deltaY,
      translationX: 0,
      translationY: 0,
      translationZ: 0
    });

    return this;
  }

  onTouchEnd(touch: Touch, manipulationListener: ManipulationListener): State {
    if (touch.identifier !== this.touchId) {
      return this;
    }

    manipulationListener.onEnd();
    return new IdleState();
  }
}

class TranslationState implements State {
  private finger1CurrentX: number;
  private finger1CurrentY: number;
  private finger2CurrentX: number;
  private finger2CurrentY: number;

  constructor(
    private readonly finger1TouchId: number,
    private readonly finger1StartX: number,
    private readonly finger1StartY: number,
    private readonly finger2TouchId: number,
    private readonly finger2StartX: number,
    private readonly finger2StartY: number) {

    this.finger1CurrentX = finger1StartX;
    this.finger1CurrentY = finger1StartY;
    this.finger2CurrentX = finger2StartX;
    this.finger2CurrentY = finger2StartY;
  }

  onTouchStart(touch: Touch, manipulationListener: ManipulationListener): State {
    return this;
  }

  onTouchMove(touch: Touch, manipulationListener: ManipulationListener): State {
    if (touch.identifier !== this.finger1TouchId && touch.identifier !== this.finger2TouchId) {
      return this;
    }

    if (touch.identifier === this.finger1TouchId) {
      this.finger1CurrentX = touch.pageX;
      this.finger1CurrentY = touch.pageY;
    }

    if (touch.identifier === this.finger2TouchId) {
      this.finger2CurrentX = touch.pageX;
      this.finger2CurrentY = touch.pageY;
    }

    const startCenterX = (this.finger1StartX + this.finger2StartX) / 2;
    const startCenterY = (this.finger1StartY + this.finger2StartY) / 2;
    const currentCenterX = (this.finger1CurrentX + this.finger2CurrentX) / 2;
    const currentCenterY = (this.finger1CurrentY + this.finger2CurrentY) / 2;

    const translationX = startCenterX - currentCenterX;
    const translationY = startCenterY - currentCenterY;

    const startDistanceX = this.finger1StartX - this.finger2StartX;
    const startDistanceY = this.finger1StartY - this.finger2StartY;
    const currentDistanceX = this.finger1CurrentX - this.finger2CurrentX;
    const currentDistanceY = this.finger1CurrentY - this.finger2CurrentY;

    const startDistance = Math.sqrt(startDistanceX * startDistanceX + startDistanceY * startDistanceY);
    const currentDistance = Math.sqrt(currentDistanceX * currentDistanceX + currentDistanceY * currentDistanceY);
    const translationZ = startDistance - currentDistance;

    manipulationListener.onUpdate({
      rotationX: 0,
      rotationY: 0,
      translationX: translationX,
      translationY: translationY,
      translationZ: translationZ
    });

    return this;
  }

  onTouchEnd(touch: Touch, manipulationListener: ManipulationListener): State {
    if (touch.identifier === this.finger1TouchId) {
      manipulationListener.onEnd();
      manipulationListener.onStart();
      return new RotationState(this.finger2TouchId, this.finger2CurrentX, this.finger2CurrentY);
    }

    if (touch.identifier === this.finger2TouchId) {
      manipulationListener.onEnd();
      manipulationListener.onStart();
      return new RotationState(this.finger1TouchId, this.finger1CurrentX, this.finger1CurrentY);
    }

    return this;
  }
}
