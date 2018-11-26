import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  private static readonly DESIRED_PLAYBACK_TIME = 3000;
  private _numberOfSamples: number;
  private _currentSampleIndex: number;
  subscription: Subscription;

  @Output() currentSampleIndexChange = new EventEmitter<number>();

  @Input() set numberOfSamples(value: number) {
    if (this._numberOfSamples !== value) {
      this._numberOfSamples = value;
      if (this.subscription != null) {
        this.subscription.unsubscribe();
        this.subscription = null;
        this.play();
      }
    }
  }

  get numberOfSamples() {
    return this._numberOfSamples;
  }

  @Input() set currentSampleIndex(value: number) {
    if (this._currentSampleIndex !== value) {
      this._currentSampleIndex = value;
      this.currentSampleIndexChange.emit(value);
    }
  }

  get currentSampleIndex() {
    return this._currentSampleIndex;
  }

  play() {
    if (this.currentSampleIndex === this.numberOfSamples - 1) {
      this.currentSampleIndex = 0;
    }

    const timePerSample = PlayerComponent.DESIRED_PLAYBACK_TIME / this.numberOfSamples;
    this.subscription = timer(0, timePerSample)
      .subscribe(t => {
        if (this.currentSampleIndex === this.numberOfSamples - 1) {
          this.subscription.unsubscribe();
          this.subscription = null;
          return;
        }
        ++this.currentSampleIndex;
      });
  }

  pause() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  jumpToFirstSample() {
    this.currentSampleIndex = 0;
  }

  jumpToLastSample() {
    this.currentSampleIndex = this.numberOfSamples - 1;
  }

  jumpOneSampleBack() {
    if (this.currentSampleIndex > 0) {
      --this.currentSampleIndex;
    }
  }

  jumpOneSampleForward() {
    if (this.currentSampleIndex < this.numberOfSamples - 1) {
      ++this.currentSampleIndex;
    }
  }
}
