import {Component} from '@angular/core';
import {CameraDriver} from './camera-driver';
import {LorentzService, Sample} from './lorentz.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  // tslint:disable:no-trailing-whitespace max-line-length
  template: `
    <div class="root-container">
      <div class="top-container">
        <div class="scene-view">
          <canvas manipulator
                  (manipulationBegin)="cameraDriver.handleManipulationBegin(three.camera)"
                  (manipulationRotationUpdate)="cameraDriver.handleRotationUpdate($event)"
                  (manipulationTranslationUpdate)="cameraDriver.handleTranslationUpdate($event)"
                  (manipulationZoomUpdate)="cameraDriver.handleZoomUpdate($event)"
                  (manipulationEnd)="cameraDriver.handleManipulationEnd()"
                  three #three="three">
            <camera [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget" fov="60"></camera>
            <scene>
              <light [position]="cameraDriver.cameraPosition" [target]="cameraDriver.cameraTarget"></light>
              <electron *ngIf="showElectron" [position]="currentSample.position"></electron>
              <trajectory *ngIf="showTrajectory" [samples]="lorentzService.samples"></trajectory>
              <grid *ngIf="showGrid"></grid>
              <axes *ngIf="showAxes"></axes>
            </scene>
          </canvas>
          <div class="right-panel-button-overlay">
            <button *ngIf="isRightPanelExpanded" type="button" class="button" (click)="collapseRightPanel()">
              <i class="fas fa-angle-double-right"></i>
            </button>
            <button *ngIf="!isRightPanelExpanded" type="button" class="button" (click)="expandRightPanel()">
              <i class="fas fa-angle-double-left"></i>
            </button>
          </div>
          <div class="bottom-panel-button-overlay">
            <button *ngIf="isBottomPanelExpanded" type="button" class="button" (click)="collapseBottomPanel()">
              <i class="fas fa-angle-double-down"></i>
            </button>
            <button *ngIf="!isBottomPanelExpanded" type="button" class="button" (click)="expandBottomPanel()">
              <i class="fas fa-angle-double-up"></i>
            </button>
          </div>
        </div>
        <div class="right-panel" [@rightPanelState]="rightPanelState">
          <div class="content">
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
      </div>
      <div class="bottom-container" [@bottomPanelState]="bottomPanelState">
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
      position: relative;
    }
    
    .scene-view canvas {
      width: 100%;
      height: 100%;
    }
    
    .scene-view .right-panel-button-overlay {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .scene-view .bottom-panel-button-overlay {
      position: absolute;
      left: 10px;
      bottom: 10px;
    }
    
    .right-panel {
      width: 400px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    
    .right-panel .content {
      width: 400px;
      padding: 10px;
    }

    .bottom-container {
      padding-bottom: 5px;
    }
    
    .checkboxes {
      padding: 0;
      margin: 0;
    }
  `],
  animations: [
    trigger('rightPanelState', [
      state('expanded', style({
        width: '400px',
        minWidth: '400px'
      })),
      state('collapsed', style({
        width: '0',
        minWidth: '0'
      })),
      transition('expanded => collapsed', animate('200ms ease-in-out')),
      transition('collapsed => expanded', animate('200ms ease-in-out'))
    ]),
    trigger('bottomPanelState', [
      state('expanded', style({

      })),
      state('collapsed', style({
        height: '0'
      })),
      transition('expanded => collapsed', animate('200ms ease-in-out')),
      transition('collapsed => expanded', animate('200ms ease-in-out'))
    ])
  ]
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

  isRightPanelExpanded = true;
  isBottomPanelExpanded = true;

  get rightPanelState() {
    return this.isRightPanelExpanded ? 'expanded' : 'collapsed';
  }

  expandRightPanel() {
    this.isRightPanelExpanded = true;
  }

  collapseRightPanel() {
    this.isRightPanelExpanded = false;
  }

  get bottomPanelState() {
    return this.isBottomPanelExpanded ? 'expanded' : 'collapsed';
  }

  expandBottomPanel() {
    this.isBottomPanelExpanded = true;
  }

  collapseBottomPanel() {
    this.isBottomPanelExpanded = false;
  }

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
