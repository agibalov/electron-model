import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Vector3 } from 'three';

@Component({
  selector: 'app-vector-editor',
  templateUrl: './vector-editor.component.html',
  styleUrls: ['./vector-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VectorEditorComponent),
      multi: true
    }
  ]
})
export class VectorEditorComponent implements ControlValueAccessor {
  readonly inputRange = 100;
  readonly inputStep = 1;

  @Input() name: string;
  @Input() range = 1.0;
  vector: Vector3 = new Vector3(0, 0, 0);

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.vector = obj;
    this.onChange(this.vector);
  }

  get realX() {
    return this.vector != null ? this.vector.x : null;
  }

  get visualX() {
    return this.vector != null ? (this.vector.x / this.range) * this.inputRange : null;
  }

  set visualX(value: number) {
    this.vector = this.vector.setX((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }

  get realY() {
    return this.vector != null ? this.vector.y : null;
  }

  get visualY() {
    return this.vector != null ? (this.vector.y / this.range) * this.inputRange : null;
  }

  set visualY(value: number) {
    this.vector = this.vector.setY((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }

  get realZ() {
    return this.vector != null ? this.vector.z : null;
  }

  get visualZ() {
    return this.vector != null ? (this.vector.z / this.range) * this.inputRange : null;
  }

  set visualZ(value: number) {
    this.vector = this.vector.setZ((value / this.inputRange) * this.range).clone();
    this.onChange(this.vector);
  }
}
