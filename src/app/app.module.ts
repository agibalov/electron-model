import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ThreeDirective} from './three.directive';
import {CameraDirective} from './camera.directive';
import {SceneDirective} from './scene.directive';
import {ElectronDirective} from './electron.directive';
import {ManipulatorDirective} from './manipulator.directive';
import {GridDirective} from './grid.directive';
import {LightDirective} from './light.directive';
import {FormsModule} from '@angular/forms';
import {TrajectoryDirective} from './trajectory.directive';
import {ExponentialPipe} from './exponential.pipe';
import {AxesDirective} from './axes.directive';
import {VectorPipe} from './vector.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent, AppState, BASE_URL, DEFAULT_APP_STATE } from './app.component';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { VectorEditorComponent } from './vector-editor/vector-editor.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeDirective,
    CameraDirective,
    SceneDirective,
    ElectronDirective,
    ManipulatorDirective,
    GridDirective,
    LightDirective,
    VectorEditorComponent,
    TrajectoryDirective,
    ExponentialPipe,
    VectorPipe,
    AxesDirective,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ShareButtonsModule.forRoot()
  ],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: BASE_URL,
      useFactory: (document) => `${document.location.protocol}//${document.location.host}${document.location.pathname}`,
      deps: [ DOCUMENT ]
    },
    {
      provide: DEFAULT_APP_STATE,
      useValue: {
        cameraTargetX: 0,
        cameraTargetY: 0,
        cameraTargetZ: 0,
        cameraPhi: Math.PI / 4,
        cameraTheta: -Math.PI / 6,
        cameraDistance: 1.3,

        electricFieldX: 1e-7,
        electricFieldY: 0,
        electricFieldZ: 0,
        magneticFieldX: 1e-10,
        magneticFieldY: 0,
        magneticFieldZ: 0,
        startVelocityX: 0,
        startVelocityY: 3e5,
        startVelocityZ: 0,
        startPositionX: 0,
        startPositionY: 0,
        startPositionZ: 0,
        numberOfSamples: 500,
        timeOfFlight: 5,

        electron: true,
        trajectory: true,
        grid: true,
        axes: true,
        currentSample: 0,
        rightPanel: true,
        bottomPanel: true
      } as AppState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
