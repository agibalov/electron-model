import {Component} from '@angular/core';
import {CameraDriver} from './camera-driver';
import {LorentzService, Sample} from './lorentz.service';

@Component({
  selector: 'app-root',
  // tslint:disable:no-trailing-whitespace max-line-length
  template: `
    <div class="root-container">
      <div class="top-container">
        <canvas class="scene-view"
                manipulator
                (manipulationBegin)="cameraDriver.handleManipulationBegin(three.camera)"
                (manipulationRotationUpdate)="cameraDriver.handleRotationUpdate($event)"
                (manipulationTranslationUpdate)="cameraDriver.handleTranslationUpdate($event)"
                (manipulationZoomUpdate)="cameraDriver.handleZoomUpdate($event)"
                (manipulationEnd)="cameraDriver.handleManipulationEnd()"
                three #three="three">
          <camera [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget" fov="60"></camera>
          <scene>
            <light [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget"></light>
            <electron *ngIf="showElectron" [position]="currentSample.position.clone().multiplyScalar(1e-5)"></electron>
            <trajectory *ngIf="showTrajectory" [samples]="lorentzService.samples"></trajectory>
            <grid *ngIf="showGrid"></grid>
            <axes *ngIf="showAxes"></axes>
          </scene>
        </canvas>
        <div class="right-panel">
          <vector-editor name="Start Velocity (m/s)" [range]="1e6" [(ngModel)]="lorentzService.startVelocity"></vector-editor>
          <vector-editor name="Electric Field (V/m)" [range]="1e-5" [(ngModel)]="lorentzService.electricField"></vector-editor>
          <vector-editor name="Magnetic Field (T)" [range]="1e-10" [(ngModel)]="lorentzService.magneticField"></vector-editor>

          <pre class="checkboxes">

<label class="checkbox"><input type="checkbox" [(ngModel)]="showElectron"> Show electron</label>
<label class="checkbox"><input type="checkbox" [(ngModel)]="showTrajectory"> Show trajectory</label>
<label class="checkbox"><input type="checkbox" [(ngModel)]="showGrid"> Show grid</label>
<label class="checkbox"><input type="checkbox" [(ngModel)]="showAxes"> Show axes</label>
          
<span class="has-text-weight-bold">Number of Samples</span>: <input type="range" class="slider is-small is-circle is-success"
                                                                    [min]="10" [max]="5000" [step]="1"
                                                                    [(ngModel)]="lorentzService.numberOfSamples"> ({{lorentzService.numberOfSamples}})
<span class="has-text-weight-bold">Time of Flight (s)</span>: <input type="range" class="slider is-small is-circle is-success"
                                                                 [min]="0.1" [max]="10" [step]="1e-3"
                                                                 [(ngModel)]="lorentzService.timeOfFlight"> ({{lorentzService.timeOfFlight | exponential}})
          </pre>
          <app-player [numberOfSamples]="lorentzService.numberOfSamples"
                      [(currentSampleIndex)]="currentSampleIndex"></app-player>
        </div>
      </div>
      <div class="bottom-container">
        <div class="container is-fluid">
          <pre>
timestamp: {{currentSample.timestamp | exponential}}
position: {{currentSample.position | vector}}
velocity: {{currentSample.velocity | vector}}
acceleration: {{currentSample.acceleration | vector}}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .root-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .top-container {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
    }
    
    .scene-view {
      flex-grow: 1;
      width: 1%;
    }
    
    .right-panel {
      width: 400px;
      padding-left: 5px;
      overflow-y: auto;
    }

    .bottom-container {
      padding-bottom: 5px;
    }
    
    .checkboxes {
      padding: 0;
      margin: 0;
    }
  `]
  // tslint:enable:no-trailing-whitespace max-line-length
})
export class AppComponent {
  lorentzService = new LorentzService();
  showElectron = true;
  showTrajectory = true;
  showGrid = true;
  showAxes = true;
  cameraDriver = new CameraDriver();
  _currentSampleIndex = 0;

  // TODO: how do I get rid of duplicate Math.min() in get/set currentSampleIndex?
  get currentSampleIndex() {
    this._currentSampleIndex = Math.min(this._currentSampleIndex, this.lorentzService.samples.length - 1);
    return this._currentSampleIndex;
  }

  set currentSampleIndex(value: number) {
    this._currentSampleIndex = Math.min(value, this.lorentzService.samples.length - 1);
  }

  get currentSample(): Sample {
    return this.lorentzService.samples[this.currentSampleIndex];
  }
}
