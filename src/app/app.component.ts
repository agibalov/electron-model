import { Component, Inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { CameraDriver} from './camera-driver';
import {LorentzService, Sample} from './lorentz.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Vector3 } from 'three';
import * as pako from 'pako';

export interface AppState {
  cameraTargetX: number;
  cameraTargetY: number;
  cameraTargetZ: number;
  cameraPhi: number;
  cameraTheta: number;
  cameraDistance: number;

  electricFieldX: number;
  electricFieldY: number;
  electricFieldZ: number;
  magneticFieldX: number;
  magneticFieldY: number;
  magneticFieldZ: number;
  startVelocityX: number;
  startVelocityY: number;
  startVelocityZ: number;
  startPositionX: number;
  startPositionY: number;
  startPositionZ: number;
  numberOfSamples: number;
  timeOfFlight: number;

  electron: boolean;
  trajectory: boolean;
  grid: boolean;
  axes: boolean;
  currentSample: number;
  rightPanel: boolean;
  bottomPanel: boolean;
}

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const DEFAULT_APP_STATE = new InjectionToken<AppState>('DEFAULT_APP_STATE');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rightPanelState', [
      state('expanded', style({
        width: '450px',
        minWidth: '450px'
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
})
export class AppComponent implements OnInit, OnDestroy {
  readonly cameraDriver: CameraDriver;
  readonly lorentzService: LorentzService;
  showElectron = true;
  showTrajectory = true;
  showGrid = true;
  showAxes = true;
  _currentSampleIndex = 0;

  isRightPanelExpanded = true;
  isBottomPanelExpanded = true;

  private urlGeneratorSubscription: Subscription;

  url: string;

  constructor(
    private readonly location: Location,
    @Inject(BASE_URL) private readonly baseUrl: string,
    @Inject(DEFAULT_APP_STATE) defaultAppState: AppState) {

    let appStateOverrides = {};

    const base64EncodedDeflatedAppStateJson = location.path();
    if (base64EncodedDeflatedAppStateJson != null && base64EncodedDeflatedAppStateJson !== '') {
      const appStateJson = pako.inflate(atob(base64EncodedDeflatedAppStateJson.substring(1)), { to: 'string' });
      appStateOverrides = JSON.parse(appStateJson);
    }

    const appState = Object.assign(defaultAppState, appStateOverrides);

    this.cameraDriver = new CameraDriver(
      appState.cameraTargetX, appState.cameraTargetY, appState.cameraTargetZ,
      appState.cameraPhi, appState.cameraTheta, appState.cameraDistance);
    this.lorentzService = new LorentzService(
      new Vector3(appState.electricFieldX, appState.electricFieldY, appState.electricFieldZ),
      new Vector3(appState.magneticFieldX, appState.magneticFieldY, appState.magneticFieldZ),
      new Vector3(appState.startVelocityX, appState.startVelocityY, appState.startVelocityZ),
      new Vector3(appState.startPositionX, appState.startPositionY, appState.startPositionZ),
      appState.numberOfSamples,
      appState.timeOfFlight);
    this.showElectron = appState.electron;
    this.showTrajectory = appState.trajectory;
    this.showGrid = appState.grid;
    this.showAxes = appState.axes;
    this._currentSampleIndex = appState.currentSample;
    this.isRightPanelExpanded = appState.rightPanel;
    this.isBottomPanelExpanded = appState.bottomPanel;
  }

  ngOnInit(): void {
    this.urlGeneratorSubscription = interval(1000).subscribe(() => {
      const appState: AppState = {
        cameraTargetX: this.cameraDriver.cameraTarget.x,
        cameraTargetY: this.cameraDriver.cameraTarget.y,
        cameraTargetZ: this.cameraDriver.cameraTarget.z,
        cameraPhi: this.cameraDriver.state.phi,
        cameraTheta: this.cameraDriver.state.theta,
        cameraDistance: this.cameraDriver.state.distance,

        electricFieldX: this.lorentzService.electricField.x,
        electricFieldY: this.lorentzService.electricField.y,
        electricFieldZ: this.lorentzService.electricField.z,
        magneticFieldX: this.lorentzService.magneticField.x,
        magneticFieldY: this.lorentzService.magneticField.y,
        magneticFieldZ: this.lorentzService.magneticField.z,
        startVelocityX: this.lorentzService.startVelocity.x,
        startVelocityY: this.lorentzService.startVelocity.y,
        startVelocityZ: this.lorentzService.startVelocity.z,
        startPositionX: this.lorentzService.startPosition.x,
        startPositionY: this.lorentzService.startPosition.y,
        startPositionZ: this.lorentzService.startPosition.z,
        numberOfSamples: this.lorentzService.numberOfSamples,
        timeOfFlight: this.lorentzService.timeOfFlight,

        electron: this.showElectron,
        trajectory: this.showTrajectory,
        grid: this.showGrid,
        axes: this.showAxes,
        currentSample: this._currentSampleIndex,
        rightPanel: this.isRightPanelExpanded,
        bottomPanel: this.isBottomPanelExpanded
      };

      const base64EncodedDeflatedAppStateJson = btoa(pako.deflate(JSON.stringify(appState), { to: 'string' }));
      this.location.replaceState('', base64EncodedDeflatedAppStateJson);
      this.url = this.baseUrl + this.location.path();
    });
  }

  ngOnDestroy(): void {
    this.urlGeneratorSubscription.unsubscribe();
  }

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
