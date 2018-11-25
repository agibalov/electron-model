import {Camera, Vector2, Vector3} from 'three';

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

  handleRotationUpdate(position: Vector2) {
    this._cameraPhi = this.manipulation.phiStart + position.x * 10;
    this._cameraTheta = this.manipulation.thetaStart + position.y * 10;
  }

  handleTranslationUpdate(position: Vector2) {
    const horizontalTranslation = this.manipulation.horizontalAxis.clone().multiplyScalar(position.x * 3);
    const verticalTranslation = this.manipulation.verticalAxis.clone().multiplyScalar(-position.y * 3);
    this.cameraTarget = this.manipulation.translationStart.clone()
      .add(horizontalTranslation)
      .add(verticalTranslation);
  }

  handleZoomUpdate(zoom: number) {
    const translation = this.manipulation.depthicalAxis.clone().multiplyScalar(zoom * 0.1);
    this.cameraTarget = this.manipulation.translationStart.clone()
      .add(translation);
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
