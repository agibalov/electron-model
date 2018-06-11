import {Pipe, PipeTransform} from '@angular/core';
import {Vector3} from 'three';

@Pipe({
  name: 'vector'
})
export class VectorPipe implements PipeTransform {
  private static readonly DIGITS = 1;

  transform(v: Vector3): string {
    if (v == null) {
      return 'null';
    }

    return `(${v.x.toExponential(VectorPipe.DIGITS)}, ${v.y.toExponential(VectorPipe.DIGITS)}, ${v.z.toExponential(VectorPipe.DIGITS)})`;
  }
}
