import {Mesh, MeshLambertMaterial, Scene, SphereGeometry, Vector3} from 'three';
import {Directive, Inject, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'electron'
})
export class ElectronDirective implements OnInit, OnDestroy {
  private mesh: Mesh;

  constructor(private scene: Scene) {
    const geometry = new SphereGeometry(0.03, 7, 7);
    const material = new MeshLambertMaterial({
      color: 0xff0000
    });
    this.mesh = new Mesh(geometry, material);
  }

  @Input() set position(position: Vector3) {
    this.mesh.position.set(position.x, position.y, position.z);
  }

  ngOnInit(): void {
    this.scene.add(this.mesh);
  }

  ngOnDestroy(): void {
    this.scene.remove(this.mesh);
  }
}
