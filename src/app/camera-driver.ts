import { Camera, Vector3 } from 'three';
import { ManipulationUpdate } from './manipulations/manipulation-commons';

export class CameraDriver {
  cameraTarget: Vector3;

  private _cameraPhi: number;
  private _cameraTheta: number;
  private _cameraDistance: number;
  private manipulation: Manipulation = null;

  constructor(targetX: number, targetY: number, targetZ: number, phi: number, theta: number, distance: number) {
    this.cameraTarget = new Vector3(targetX, targetY, targetZ);
    this._cameraPhi = phi;
    this._cameraTheta = theta;
    this._cameraDistance = distance;
  }

  get phi(): number {
    return this._cameraPhi;
  }

  get theta(): number {
    return this._cameraTheta;
  }

  get distance(): number {
    return this._cameraDistance;
  }

  get cameraPosition() {
    const position = new Vector3(
      -Math.cos(this._cameraPhi) * Math.cos(this._cameraTheta) * this._cameraDistance,
      -Math.sin(this._cameraTheta) * this._cameraDistance,
      Math.sin(this._cameraPhi) * Math.cos(this._cameraTheta) * this._cameraDistance
    ).add(this.cameraTarget);
    return position;
  }

  handleManipulationBegin(camera: Camera) {
    const xAxis = new Vector3();
    const yAxis = new Vector3();
    const zAxis = new Vector3();
    camera.matrixWorld.extractBasis(xAxis, yAxis, zAxis);

    this.manipulation = {
      phiStart: this._cameraPhi,
      thetaStart: this._cameraTheta,
      translationStart: this.cameraTarget,
      horizontalAxis: xAxis.normalize(),
      verticalAxis: yAxis.normalize(),
      depthicalAxis: zAxis.normalize()
    };
  }

  handleManipulationUpdate(manipulationInfo: ManipulationUpdate) {
    // rotate
    this._cameraPhi = this.manipulation.phiStart + manipulationInfo.rotationX * 10;
    this._cameraTheta = this.manipulation.thetaStart + manipulationInfo.rotationY * 10;

    // translate
    const horizontalTranslation = this.manipulation.horizontalAxis.clone().multiplyScalar(manipulationInfo.translationX * 3);
    const verticalTranslation = this.manipulation.verticalAxis.clone().multiplyScalar(-manipulationInfo.translationY * 3);
    const depthicalTranslation = this.manipulation.depthicalAxis.clone().multiplyScalar(manipulationInfo.translationZ * 0.1);
    this.cameraTarget = this.manipulation.translationStart.clone()
      .add(horizontalTranslation)
      .add(verticalTranslation)
      .add(depthicalTranslation);
  }

  handleManipulationEnd() {
    this.manipulation = null;
  }
}

interface Manipulation {
  phiStart: number;
  thetaStart: number;
  translationStart: Vector3;
  horizontalAxis: Vector3;
  verticalAxis: Vector3;
  depthicalAxis: Vector3;
}
