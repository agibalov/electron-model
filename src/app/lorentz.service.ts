import {Vector3} from 'three';

export class LorentzService {
  private readonly particleMass = 9.1e-31;
  private readonly particleCharge = 1.6e-19;
  private readonly minSubSampleTimeChange = 1e-4;

  private _electricField: Vector3;
  private _magneticField: Vector3;
  private _startVelocity: Vector3;
  private _startPosition: Vector3;
  private _numberOfSamples;
  private _timeOfFlight;
  private _samples: Sample[];
  private _shouldRecalculate = true;

  constructor(
    electricField: Vector3,
    magneticField: Vector3,
    startVelocity: Vector3,
    startPosition: Vector3,
    numberOfSamples: number,
    timeOfFlight: number) {

    this._electricField = electricField;
    this._magneticField = magneticField;
    this._startVelocity = startVelocity;
    this._startPosition = startPosition;
    this._numberOfSamples = numberOfSamples;
    this._timeOfFlight = timeOfFlight;
  }

  set electricField(value: Vector3) {
    if (this._electricField !== value) {
      this._electricField = value;
      this._shouldRecalculate = true;
    }
  }

  get electricField(): Vector3 {
    return this._electricField;
  }

  set magneticField(value: Vector3) {
    if (this._magneticField !== value) {
      this._magneticField = value;
      this._shouldRecalculate = true;
    }
  }

  get magneticField(): Vector3 {
    return this._magneticField;
  }

  set startVelocity(value: Vector3) {
    if (this._startVelocity !== value) {
      this._startVelocity = value;
      this._shouldRecalculate = true;
    }
  }

  get startVelocity(): Vector3 {
    return this._startVelocity;
  }

  set startPosition(value: Vector3) {
    if (this._startPosition !== value) {
      this._startPosition = value;
      this._shouldRecalculate = true;
    }
  }

  get startPosition(): Vector3 {
    return this._startPosition;
  }

  set numberOfSamples(value: number) {
    if (this._numberOfSamples !== value) {
      this._numberOfSamples = value;
      this._shouldRecalculate = true;
    }
  }

  get numberOfSamples(): number {
    return this._numberOfSamples;
  }

  set timeOfFlight(value: number) {
    if (this._timeOfFlight !== value) {
      this._timeOfFlight = value;
      this._shouldRecalculate = true;
    }
  }

  get timeOfFlight(): number {
    return this._timeOfFlight;
  }

  get samples(): Sample[] {
    if (this._shouldRecalculate) {
      this._shouldRecalculate = false;

      const timeChangePerSample = this.timeOfFlight / this.numberOfSamples;
      const timeChangePerSubSample = Math.min(timeChangePerSample, this.minSubSampleTimeChange);
      const numberOfSubSamples = Math.floor(timeChangePerSample / timeChangePerSubSample);
      const samples: Sample[] = [];

      let velocity = this.startVelocity.clone();
      let position = this.startPosition.clone();
      for (let sampleIndex = 0; sampleIndex < this.numberOfSamples; ++sampleIndex) {
        for (let subSampleIndex = 0; subSampleIndex < numberOfSubSamples; ++subSampleIndex) {
          const time = (sampleIndex * numberOfSubSamples + subSampleIndex) * timeChangePerSubSample;
          const electricForce = this.electricField.clone().multiplyScalar(this.particleCharge);
          const magneticForce = velocity.clone().cross(this.magneticField).multiplyScalar(this.particleCharge);
          const lorentzForce = electricForce.clone().add(magneticForce);

          const acceleration = lorentzForce.divideScalar(this.particleMass);

          if (subSampleIndex === 0) {
            const sample = new Sample(
              time,
              position.clone(),
              velocity.clone(),
              acceleration.clone(),
              electricForce.clone(),
              magneticForce.clone(),
              lorentzForce.clone());
            samples.push(sample);
          }

          velocity = velocity.clone().add(acceleration.clone().multiplyScalar(timeChangePerSubSample));
          position = position.clone().add(velocity.clone().multiplyScalar(timeChangePerSubSample));
        }
      }

      this._samples = samples;
    }

    return this._samples;
  }
}

export class Sample {
  constructor(
    public readonly timestamp: number,
    public readonly position: Vector3,
    public readonly velocity: Vector3,
    public readonly acceleration: Vector3,
    public readonly electricForce: Vector3,
    public readonly magneticForce: Vector3,
    public readonly lorentzForce: Vector3) {
  }
}
