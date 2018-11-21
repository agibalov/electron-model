(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _camera_driver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera-driver */ "./src/app/camera-driver.ts");
/* harmony import */ var _lorentz_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lorentz.service */ "./src/app/lorentz.service.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.lorentzService = new _lorentz_service__WEBPACK_IMPORTED_MODULE_2__["LorentzService"]();
        this.showElectron = true;
        this.showTrajectory = true;
        this.showGrid = true;
        this.showAxes = true;
        this.cameraDriver = new _camera_driver__WEBPACK_IMPORTED_MODULE_1__["CameraDriver"]();
        this._currentSampleIndex = 0;
        this.isRightPanelExpanded = true;
        this.isBottomPanelExpanded = true;
    }
    Object.defineProperty(AppComponent.prototype, "rightPanelState", {
        get: function () {
            return this.isRightPanelExpanded ? 'expanded' : 'collapsed';
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.expandRightPanel = function () {
        this.isRightPanelExpanded = true;
    };
    AppComponent.prototype.collapseRightPanel = function () {
        this.isRightPanelExpanded = false;
    };
    Object.defineProperty(AppComponent.prototype, "bottomPanelState", {
        get: function () {
            return this.isBottomPanelExpanded ? 'expanded' : 'collapsed';
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.expandBottomPanel = function () {
        this.isBottomPanelExpanded = true;
    };
    AppComponent.prototype.collapseBottomPanel = function () {
        this.isBottomPanelExpanded = false;
    };
    Object.defineProperty(AppComponent.prototype, "currentSampleIndex", {
        // TODO: how do I get rid of duplicate Math.min() in get/set currentSampleIndex?
        get: function () {
            this._currentSampleIndex = Math.min(this._currentSampleIndex, this.lorentzService.samples.length - 1);
            return this._currentSampleIndex;
        },
        set: function (value) {
            this._currentSampleIndex = Math.min(value, this.lorentzService.samples.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "currentSample", {
        get: function () {
            return this.lorentzService.samples[this.currentSampleIndex];
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            // tslint:disable:no-trailing-whitespace max-line-length
            template: "\n    <div class=\"root-container\">\n      <div class=\"top-container\">\n        <div class=\"scene-view\">\n          <canvas manipulator\n                  (manipulationBegin)=\"cameraDriver.handleManipulationBegin(three.camera)\"\n                  (manipulationRotationUpdate)=\"cameraDriver.handleRotationUpdate($event)\"\n                  (manipulationTranslationUpdate)=\"cameraDriver.handleTranslationUpdate($event)\"\n                  (manipulationZoomUpdate)=\"cameraDriver.handleZoomUpdate($event)\"\n                  (manipulationEnd)=\"cameraDriver.handleManipulationEnd()\"\n                  three #three=\"three\">\n            <camera [position]=\"cameraDriver.cameraPosition\" [target]=\"cameraDriver.cameraTarget\" fov=\"60\"></camera>\n            <scene>\n              <light [position]=\"cameraDriver.cameraPosition\" [target]=\"cameraDriver.cameraTarget\"></light>\n              <electron *ngIf=\"showElectron\" [position]=\"currentSample.position\"></electron>\n              <trajectory *ngIf=\"showTrajectory\" [samples]=\"lorentzService.samples\"></trajectory>\n              <grid *ngIf=\"showGrid\"></grid>\n              <axes *ngIf=\"showAxes\"></axes>\n            </scene>\n          </canvas>\n          <div class=\"right-panel-button-overlay\">\n            <button *ngIf=\"isRightPanelExpanded\" type=\"button\" class=\"button\" (click)=\"collapseRightPanel()\">\n              <i class=\"fas fa-angle-double-right\"></i>\n            </button>\n            <button *ngIf=\"!isRightPanelExpanded\" type=\"button\" class=\"button\" (click)=\"expandRightPanel()\">\n              <i class=\"fas fa-angle-double-left\"></i>\n            </button>\n          </div>\n          <div class=\"bottom-panel-button-overlay\">\n            <button *ngIf=\"isBottomPanelExpanded\" type=\"button\" class=\"button\" (click)=\"collapseBottomPanel()\">\n              <i class=\"fas fa-angle-double-down\"></i>\n            </button>\n            <button *ngIf=\"!isBottomPanelExpanded\" type=\"button\" class=\"button\" (click)=\"expandBottomPanel()\">\n              <i class=\"fas fa-angle-double-up\"></i>\n            </button>\n          </div>\n          <div class=\"copyright-overlay\">\n            &copy; 2018 by <a href=\"http://agibalov.io\" target=\"_blank\">Andrey Agibalov</a>\n          </div>\n        </div>\n        <div class=\"right-panel\" [@rightPanelState]=\"rightPanelState\">\n          <div class=\"content\">\n            <app-vector-editor name=\"Start Velocity (m/s)\" [range]=\"1e6\" [(ngModel)]=\"lorentzService.startVelocity\"></app-vector-editor>\n            <app-vector-editor name=\"Electric Field (V/m)\" [range]=\"1e-5\" [(ngModel)]=\"lorentzService.electricField\"></app-vector-editor>\n            <app-vector-editor name=\"Magnetic Field (T)\" [range]=\"1e-10\" [(ngModel)]=\"lorentzService.magneticField\"></app-vector-editor>\n  \n            <pre class=\"checkboxes\">\n  \n  <label class=\"checkbox\"><input type=\"checkbox\" [(ngModel)]=\"showElectron\"> Show electron</label>\n  <label class=\"checkbox\"><input type=\"checkbox\" [(ngModel)]=\"showTrajectory\"> Show trajectory</label>\n  <label class=\"checkbox\"><input type=\"checkbox\" [(ngModel)]=\"showGrid\"> Show grid</label>\n  <label class=\"checkbox\"><input type=\"checkbox\" [(ngModel)]=\"showAxes\"> Show axes</label>\n            \n  <span class=\"has-text-weight-bold\">Number of Samples</span>: <input type=\"range\" class=\"slider is-small is-circle is-success\"\n                                                                      [min]=\"10\" [max]=\"5000\" [step]=\"1\"\n                                                                      [(ngModel)]=\"lorentzService.numberOfSamples\"> ({{lorentzService.numberOfSamples}})\n  <span class=\"has-text-weight-bold\">Time of Flight (s)</span>: <input type=\"range\" class=\"slider is-small is-circle is-success\"\n                                                                       [min]=\"0.1\" [max]=\"10\" [step]=\"1e-3\"\n                                                                       [(ngModel)]=\"lorentzService.timeOfFlight\"> ({{lorentzService.timeOfFlight | exponential}})\n            </pre>\n            <app-player [numberOfSamples]=\"lorentzService.numberOfSamples\"\n                        [(currentSampleIndex)]=\"currentSampleIndex\"></app-player>\n          </div>\n        </div>\n      </div>\n      <div class=\"bottom-container\" [@bottomPanelState]=\"bottomPanelState\">\n        <div class=\"container is-fluid\">\n          <pre>\ntimestamp: {{currentSample.timestamp | exponential}}\nposition: {{currentSample.position | vector}}\nvelocity: {{currentSample.velocity | vector}}\nacceleration: {{currentSample.acceleration | vector}}</pre>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .root-container {\n      width: 100vw;\n      height: 100vh;\n      display: flex;\n      flex-direction: column;\n    }\n    \n    .top-container {\n      flex-grow: 1;\n      display: flex;\n      flex-direction: row;\n    }\n    \n    .scene-view {\n      flex-grow: 1;\n      width: 1%;\n      position: relative;\n    }\n    \n    .scene-view canvas {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n    }\n    \n    .scene-view .right-panel-button-overlay {\n      position: absolute;\n      right: 10px;\n      top: 10px;\n    }\n\n    .scene-view .bottom-panel-button-overlay {\n      position: absolute;\n      left: 10px;\n      bottom: 10px;\n    }\n    \n    .scene-view .copyright-overlay {\n      position: absolute;\n      right: 10px;\n      bottom: 10px;\n      background-color: rgba(0, 0, 0, 0.8);\n      padding: 3px;\n    }\n    \n    .right-panel {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n    \n    .right-panel .content {\n      padding: 10px;\n    }\n\n    .bottom-container {\n      padding-bottom: 5px;\n    }\n    \n    .checkboxes {\n      padding: 0;\n      margin: 0;\n    }\n\n    input.slider {\n      margin: 0;\n    }\n  "],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('rightPanelState', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
                        width: '450px',
                        minWidth: '450px'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
                        width: '0',
                        minWidth: '0'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('expanded => collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('200ms ease-in-out')),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('collapsed => expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('200ms ease-in-out'))
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('bottomPanelState', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({})),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
                        height: '0'
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('expanded => collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('200ms ease-in-out')),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('collapsed => expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('200ms ease-in-out'))
                ])
            ]
            // tslint:enable:no-trailing-whitespace max-line-length
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _three_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./three.directive */ "./src/app/three.directive.ts");
/* harmony import */ var _camera_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./camera.directive */ "./src/app/camera.directive.ts");
/* harmony import */ var _scene_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scene.directive */ "./src/app/scene.directive.ts");
/* harmony import */ var _electron_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./electron.directive */ "./src/app/electron.directive.ts");
/* harmony import */ var _manipulator_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./manipulator.directive */ "./src/app/manipulator.directive.ts");
/* harmony import */ var _grid_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./grid.directive */ "./src/app/grid.directive.ts");
/* harmony import */ var _light_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./light.directive */ "./src/app/light.directive.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _vector_editor_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./vector-editor.component */ "./src/app/vector-editor.component.ts");
/* harmony import */ var _trajectory_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./trajectory.directive */ "./src/app/trajectory.directive.ts");
/* harmony import */ var _exponential_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./exponential.pipe */ "./src/app/exponential.pipe.ts");
/* harmony import */ var _axes_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./axes.directive */ "./src/app/axes.directive.ts");
/* harmony import */ var _player_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./player.component */ "./src/app/player.component.ts");
/* harmony import */ var _vector_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./vector.pipe */ "./src/app/vector.pipe.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _three_directive__WEBPACK_IMPORTED_MODULE_3__["ThreeDirective"],
                _camera_directive__WEBPACK_IMPORTED_MODULE_4__["CameraDirective"],
                _scene_directive__WEBPACK_IMPORTED_MODULE_5__["SceneDirective"],
                _electron_directive__WEBPACK_IMPORTED_MODULE_6__["ElectronDirective"],
                _manipulator_directive__WEBPACK_IMPORTED_MODULE_7__["ManipulatorDirective"],
                _grid_directive__WEBPACK_IMPORTED_MODULE_8__["GridDirective"],
                _light_directive__WEBPACK_IMPORTED_MODULE_9__["LightDirective"],
                _vector_editor_component__WEBPACK_IMPORTED_MODULE_11__["VectorEditorComponent"],
                _trajectory_directive__WEBPACK_IMPORTED_MODULE_12__["TrajectoryDirective"],
                _exponential_pipe__WEBPACK_IMPORTED_MODULE_13__["ExponentialPipe"],
                _vector_pipe__WEBPACK_IMPORTED_MODULE_16__["VectorPipe"],
                _axes_directive__WEBPACK_IMPORTED_MODULE_14__["AxesDirective"],
                _player_component__WEBPACK_IMPORTED_MODULE_15__["PlayerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/axes.directive.ts":
/*!***********************************!*\
  !*** ./src/app/axes.directive.ts ***!
  \***********************************/
/*! exports provided: AxesDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxesDirective", function() { return AxesDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AxesDirective = /** @class */ (function () {
    function AxesDirective(scene) {
        this.scene = scene;
        this.cylinderMaterial = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
            color: 0xff0000
        });
        this.coneMaterial = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
            color: 0x00ff00
        });
        this.group = new three__WEBPACK_IMPORTED_MODULE_0__["Group"]();
        this.group.add(this.makeAxis().rotateZ(-Math.PI / 2));
        this.group.add(this.makeAxis());
        this.group.add(this.makeAxis().rotateX(Math.PI / 2));
    }
    AxesDirective.prototype.ngOnInit = function () {
        this.scene.add(this.group);
    };
    AxesDirective.prototype.ngOnDestroy = function () {
        this.scene.remove(this.group);
    };
    AxesDirective.prototype.makeAxis = function () {
        var cylinderHeight = 1;
        var cylinderGeometry = new three__WEBPACK_IMPORTED_MODULE_0__["CylinderGeometry"](0.01, 0.01, cylinderHeight, 8, 1);
        var cylinderMesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](cylinderGeometry, this.cylinderMaterial);
        var coneHeight = 0.1;
        var coneGeometry = new three__WEBPACK_IMPORTED_MODULE_0__["ConeGeometry"](0.03, coneHeight, 8, 1);
        coneGeometry.translate(0, cylinderHeight / 2 + coneHeight / 2, 0);
        var coneMesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](coneGeometry, this.coneMaterial);
        var group = new three__WEBPACK_IMPORTED_MODULE_0__["Group"]();
        group.add(cylinderMesh);
        group.add(coneMesh);
        return group;
    };
    AxesDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'axes'
        }),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], AxesDirective);
    return AxesDirective;
}());



/***/ }),

/***/ "./src/app/camera-driver.ts":
/*!**********************************!*\
  !*** ./src/app/camera-driver.ts ***!
  \**********************************/
/*! exports provided: CameraDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraDriver", function() { return CameraDriver; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var CameraDriver = /** @class */ (function () {
    function CameraDriver() {
        this.cameraTarget = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this.cameraPhi = Math.PI / 4;
        this.cameraTheta = -Math.PI / 6;
        this.cameraDistance = 1.3;
        this.manipulation = null;
    }
    Object.defineProperty(CameraDriver.prototype, "cameraPosition", {
        get: function () {
            var position = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-Math.cos(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance, -Math.sin(this.cameraTheta) * this.cameraDistance, Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance).add(this.cameraTarget);
            return position;
        },
        enumerable: true,
        configurable: true
    });
    CameraDriver.prototype.handleManipulationBegin = function (camera) {
        var xAxis = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        var yAxis = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        var zAxis = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        camera.matrixWorld.extractBasis(xAxis, yAxis, zAxis);
        this.manipulation = {
            phiStart: this.cameraPhi,
            thetaStart: this.cameraTheta,
            translationStart: this.cameraTarget,
            horizontalAxis: xAxis.normalize(),
            verticalAxis: yAxis.normalize(),
            depthicalAxis: zAxis.normalize()
        };
    };
    CameraDriver.prototype.handleRotationUpdate = function (position) {
        this.cameraPhi = this.manipulation.phiStart + position.x * 10;
        this.cameraTheta = this.manipulation.thetaStart + position.y * 10;
    };
    CameraDriver.prototype.handleTranslationUpdate = function (position) {
        var horizontalTranslation = this.manipulation.horizontalAxis.clone().multiplyScalar(position.x * 3);
        var verticalTranslation = this.manipulation.verticalAxis.clone().multiplyScalar(-position.y * 3);
        this.cameraTarget = this.manipulation.translationStart.clone()
            .add(horizontalTranslation)
            .add(verticalTranslation);
    };
    CameraDriver.prototype.handleZoomUpdate = function (zoom) {
        var translation = this.manipulation.depthicalAxis.clone().multiplyScalar(zoom * 0.1);
        this.cameraTarget = this.manipulation.translationStart.clone()
            .add(translation);
    };
    CameraDriver.prototype.handleManipulationEnd = function () {
        this.manipulation = null;
    };
    return CameraDriver;
}());



/***/ }),

/***/ "./src/app/camera.directive.ts":
/*!*************************************!*\
  !*** ./src/app/camera.directive.ts ***!
  \*************************************/
/*! exports provided: CameraDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraDirective", function() { return CameraDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _three_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./three.directive */ "./src/app/three.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var CameraDirective = /** @class */ (function () {
    function CameraDirective(threeDirective) {
        this.threeDirective = threeDirective;
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](70);
    }
    CameraDirective.prototype.ngOnInit = function () {
        this.threeDirective.setCamera(this.camera);
    };
    CameraDirective.prototype.ngOnDestroy = function () {
        this.threeDirective.setCamera(null);
    };
    CameraDirective.prototype.ngOnChanges = function (changes) {
        if (changes.fov) {
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
        }
        if (changes.position || changes.target) {
            this.camera.position.set(this.position.x, this.position.y, this.position.z);
            this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](this.target.x, this.target.y, this.target.z));
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", three__WEBPACK_IMPORTED_MODULE_0__["Vector3"])
    ], CameraDirective.prototype, "position", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", three__WEBPACK_IMPORTED_MODULE_0__["Vector3"])
    ], CameraDirective.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], CameraDirective.prototype, "fov", void 0);
    CameraDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'camera'
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_three_directive__WEBPACK_IMPORTED_MODULE_2__["ThreeDirective"])),
        __metadata("design:paramtypes", [_three_directive__WEBPACK_IMPORTED_MODULE_2__["ThreeDirective"]])
    ], CameraDirective);
    return CameraDirective;
}());



/***/ }),

/***/ "./src/app/electron.directive.ts":
/*!***************************************!*\
  !*** ./src/app/electron.directive.ts ***!
  \***************************************/
/*! exports provided: ElectronDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectronDirective", function() { return ElectronDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ElectronDirective = /** @class */ (function () {
    function ElectronDirective(scene) {
        this.scene = scene;
        var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](0.03, 7, 7);
        var material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
            color: 0xff0000
        });
        this.mesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    }
    ElectronDirective_1 = ElectronDirective;
    Object.defineProperty(ElectronDirective.prototype, "position", {
        set: function (position) {
            this.mesh.position.set(position.x, position.y, position.z);
            this.mesh.position.multiplyScalar(ElectronDirective_1.SCALE);
        },
        enumerable: true,
        configurable: true
    });
    ElectronDirective.prototype.ngOnInit = function () {
        this.scene.add(this.mesh);
    };
    ElectronDirective.prototype.ngOnDestroy = function () {
        this.scene.remove(this.mesh);
    };
    var ElectronDirective_1;
    ElectronDirective.SCALE = 1e-5;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]])
    ], ElectronDirective.prototype, "position", null);
    ElectronDirective = ElectronDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'electron'
        }),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], ElectronDirective);
    return ElectronDirective;
}());



/***/ }),

/***/ "./src/app/exponential.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/exponential.pipe.ts ***!
  \*************************************/
/*! exports provided: ExponentialPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExponentialPipe", function() { return ExponentialPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ExponentialPipe = /** @class */ (function () {
    function ExponentialPipe() {
    }
    ExponentialPipe.prototype.transform = function (value) {
        if (value === null) {
            return null;
        }
        return value.toExponential(1);
    };
    ExponentialPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'exponential' })
    ], ExponentialPipe);
    return ExponentialPipe;
}());



/***/ }),

/***/ "./src/app/grid.directive.ts":
/*!***********************************!*\
  !*** ./src/app/grid.directive.ts ***!
  \***********************************/
/*! exports provided: GridDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridDirective", function() { return GridDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GridDirective = /** @class */ (function () {
    function GridDirective(scene) {
        this.scene = scene;
        var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["Geometry"]();
        for (var i = -200; i <= 200; ++i) {
            geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-200, 0, i));
            geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](200, 0, i));
            geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](i, 0, -200));
            geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](i, 0, 200));
        }
        var material = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]({
            color: 0x7766ff
        });
        this.line = new three__WEBPACK_IMPORTED_MODULE_0__["Line"](geometry, material);
        this.line.scale.set(GridDirective_1.SCALE, GridDirective_1.SCALE, GridDirective_1.SCALE);
    }
    GridDirective_1 = GridDirective;
    GridDirective.prototype.ngOnInit = function () {
        this.scene.add(this.line);
    };
    GridDirective.prototype.ngOnDestroy = function () {
        this.scene.remove(this.line);
    };
    var GridDirective_1;
    GridDirective.SCALE = 1e-1;
    GridDirective = GridDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'grid'
        }),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], GridDirective);
    return GridDirective;
}());



/***/ }),

/***/ "./src/app/light.directive.ts":
/*!************************************!*\
  !*** ./src/app/light.directive.ts ***!
  \************************************/
/*! exports provided: LightDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightDirective", function() { return LightDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LightDirective = /** @class */ (function () {
    function LightDirective(scene) {
        this.scene = scene;
        this.light = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffffff);
    }
    Object.defineProperty(LightDirective.prototype, "position", {
        set: function (value) {
            this.light.position.set(value.x, value.y, value.z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightDirective.prototype, "target", {
        set: function (value) {
            this.light.target.position.set(value.x, value.y, value.z);
        },
        enumerable: true,
        configurable: true
    });
    LightDirective.prototype.ngOnInit = function () {
        this.scene.add(this.light);
        this.scene.add(this.light.target);
    };
    LightDirective.prototype.ngOnDestroy = function () {
        this.scene.remove(this.light);
        this.scene.remove(this.light.target);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]])
    ], LightDirective.prototype, "position", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]])
    ], LightDirective.prototype, "target", null);
    LightDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'light'
        }),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], LightDirective);
    return LightDirective;
}());



/***/ }),

/***/ "./src/app/lorentz.service.ts":
/*!************************************!*\
  !*** ./src/app/lorentz.service.ts ***!
  \************************************/
/*! exports provided: LorentzService, Sample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LorentzService", function() { return LorentzService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sample", function() { return Sample; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var LorentzService = /** @class */ (function () {
    function LorentzService() {
        this.particleMass = 9.1e-31;
        this.particleCharge = 1.6e-19;
        this.minSubSampleTimeChange = 1e-4;
        this._electricField = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1e-7, 0, 0);
        this._magneticField = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1e-10, 0, 0);
        this._startVelocity = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 3e5, 0);
        this._startPosition = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
        this._numberOfSamples = 500;
        this._timeOfFlight = 5;
        this._shouldRecalculate = true;
    }
    Object.defineProperty(LorentzService.prototype, "electricField", {
        get: function () {
            return this._electricField;
        },
        set: function (value) {
            if (this._electricField !== value) {
                this._electricField = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "magneticField", {
        get: function () {
            return this._magneticField;
        },
        set: function (value) {
            if (this._magneticField !== value) {
                this._magneticField = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "startVelocity", {
        get: function () {
            return this._startVelocity;
        },
        set: function (value) {
            if (this._startVelocity !== value) {
                this._startVelocity = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "startPosition", {
        get: function () {
            return this._startPosition;
        },
        set: function (value) {
            if (this._startPosition !== value) {
                this._startPosition = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "numberOfSamples", {
        get: function () {
            return this._numberOfSamples;
        },
        set: function (value) {
            if (this._numberOfSamples !== value) {
                this._numberOfSamples = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "timeOfFlight", {
        get: function () {
            return this._timeOfFlight;
        },
        set: function (value) {
            if (this._timeOfFlight !== value) {
                this._timeOfFlight = value;
                this._shouldRecalculate = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LorentzService.prototype, "samples", {
        get: function () {
            if (this._shouldRecalculate) {
                this._shouldRecalculate = false;
                var timeChangePerSample = this.timeOfFlight / this.numberOfSamples;
                var timeChangePerSubSample = Math.min(timeChangePerSample, this.minSubSampleTimeChange);
                var numberOfSubSamples = Math.floor(timeChangePerSample / timeChangePerSubSample);
                var samples = [];
                var velocity = this.startVelocity.clone();
                var position = this.startPosition.clone();
                for (var sampleIndex = 0; sampleIndex < this.numberOfSamples; ++sampleIndex) {
                    for (var subSampleIndex = 0; subSampleIndex < numberOfSubSamples; ++subSampleIndex) {
                        var time = (sampleIndex * numberOfSubSamples + subSampleIndex) * timeChangePerSubSample;
                        var electricForce = this.electricField.clone().multiplyScalar(this.particleCharge);
                        var magneticForce = velocity.clone().cross(this.magneticField).multiplyScalar(this.particleCharge);
                        var lorentzForce = electricForce.clone().add(magneticForce);
                        var acceleration = lorentzForce.divideScalar(this.particleMass);
                        if (subSampleIndex === 0) {
                            var sample = new Sample(time, position.clone(), velocity.clone(), acceleration.clone(), electricForce.clone(), magneticForce.clone(), lorentzForce.clone());
                            samples.push(sample);
                        }
                        velocity = velocity.clone().add(acceleration.clone().multiplyScalar(timeChangePerSubSample));
                        position = position.clone().add(velocity.clone().multiplyScalar(timeChangePerSubSample));
                    }
                }
                this._samples = samples;
            }
            return this._samples;
        },
        enumerable: true,
        configurable: true
    });
    return LorentzService;
}());

var Sample = /** @class */ (function () {
    function Sample(timestamp, position, velocity, acceleration, electricForce, magneticForce, lorentzForce) {
        this.timestamp = timestamp;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.electricForce = electricForce;
        this.magneticForce = magneticForce;
        this.lorentzForce = lorentzForce;
    }
    return Sample;
}());



/***/ }),

/***/ "./src/app/manipulator.directive.ts":
/*!******************************************!*\
  !*** ./src/app/manipulator.directive.ts ***!
  \******************************************/
/*! exports provided: ManipulatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManipulatorDirective", function() { return ManipulatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ManipulatorDirective = /** @class */ (function () {
    function ManipulatorDirective() {
        this.manipulationBegin = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.manipulationRotationUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.manipulationTranslationUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.manipulationZoomUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.manipulationEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.MOUSE_LEFT = 0;
        this.MOUSE_RIGHT = 2;
    }
    ManipulatorDirective.prototype.onMouseEvent = function (e) {
        var bounds = e.target.getBoundingClientRect();
        var x = e.layerX / bounds.width;
        var y = e.layerY / bounds.width;
        if (this.startPos == null) {
            if (e.type === 'mousedown') {
                if (e.button === this.MOUSE_LEFT) {
                    this.manipulationType = ManipulationType.Rotation;
                    this.startPos = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"](x, y);
                    this.manipulationBegin.emit();
                }
                else if (e.button === this.MOUSE_RIGHT) {
                    this.manipulationType = ManipulationType.Translation;
                    this.startPos = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"](x, y);
                    this.manipulationBegin.emit();
                }
            }
        }
        else {
            if (e.type === 'mousemove') {
                var currentPos = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"](x, y);
                var diff = this.startPos.clone().sub(currentPos);
                if (this.manipulationType === ManipulationType.Rotation) {
                    this.manipulationRotationUpdate.emit(diff);
                }
                else if (this.manipulationType === ManipulationType.Translation) {
                    this.manipulationTranslationUpdate.emit(diff);
                }
            }
            else if (e.type === 'mouseup') {
                if (e.button === this.MOUSE_LEFT || e.button === this.MOUSE_RIGHT) {
                    this.manipulationEnd.emit();
                    this.startPos = null;
                    this.manipulationType = null;
                }
            }
        }
    };
    ManipulatorDirective.prototype.onWheel = function (e) {
        e.preventDefault();
        this.manipulationBegin.emit();
        this.manipulationZoomUpdate.emit(e.deltaY > 0 ? 1 : -1);
        this.manipulationEnd.emit();
    };
    ManipulatorDirective.prototype.onContextMenu = function (e) {
        e.preventDefault();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManipulatorDirective.prototype, "manipulationBegin", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManipulatorDirective.prototype, "manipulationRotationUpdate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManipulatorDirective.prototype, "manipulationTranslationUpdate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManipulatorDirective.prototype, "manipulationZoomUpdate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManipulatorDirective.prototype, "manipulationEnd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('mousemove', ['$event']),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('mousedown', ['$event']),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], ManipulatorDirective.prototype, "onMouseEvent", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('wheel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [WheelEvent]),
        __metadata("design:returntype", void 0)
    ], ManipulatorDirective.prototype, "onWheel", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('contextmenu', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ManipulatorDirective.prototype, "onContextMenu", null);
    ManipulatorDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: '[manipulator]'
        })
    ], ManipulatorDirective);
    return ManipulatorDirective;
}());

var ManipulationType;
(function (ManipulationType) {
    ManipulationType[ManipulationType["Rotation"] = 0] = "Rotation";
    ManipulationType[ManipulationType["Translation"] = 1] = "Translation";
})(ManipulationType || (ManipulationType = {}));


/***/ }),

/***/ "./src/app/player.component.ts":
/*!*************************************!*\
  !*** ./src/app/player.component.ts ***!
  \*************************************/
/*! exports provided: PlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PlayerComponent = /** @class */ (function () {
    function PlayerComponent() {
        this.currentSampleIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PlayerComponent_1 = PlayerComponent;
    Object.defineProperty(PlayerComponent.prototype, "numberOfSamples", {
        get: function () {
            return this._numberOfSamples;
        },
        set: function (value) {
            if (this._numberOfSamples !== value) {
                this._numberOfSamples = value;
                if (this.subscription != null) {
                    this.subscription.unsubscribe();
                    this.subscription = null;
                    this.play();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComponent.prototype, "currentSampleIndex", {
        get: function () {
            return this._currentSampleIndex;
        },
        set: function (value) {
            if (this._currentSampleIndex !== value) {
                this._currentSampleIndex = value;
                this.currentSampleIndexChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    PlayerComponent.prototype.play = function () {
        var _this = this;
        if (this.currentSampleIndex === this.numberOfSamples - 1) {
            this.currentSampleIndex = 0;
        }
        var timePerSample = PlayerComponent_1.DESIRED_PLAYBACK_TIME / this.numberOfSamples;
        this.subscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0, timePerSample)
            .subscribe(function (t) {
            if (_this.currentSampleIndex === _this.numberOfSamples - 1) {
                _this.subscription.unsubscribe();
                _this.subscription = null;
                return;
            }
            ++_this.currentSampleIndex;
        });
    };
    PlayerComponent.prototype.pause = function () {
        this.subscription.unsubscribe();
        this.subscription = null;
    };
    PlayerComponent.prototype.jumpToFirstSample = function () {
        this.currentSampleIndex = 0;
    };
    PlayerComponent.prototype.jumpToLastSample = function () {
        this.currentSampleIndex = this.numberOfSamples - 1;
    };
    PlayerComponent.prototype.jumpOneSampleBack = function () {
        if (this.currentSampleIndex > 0) {
            --this.currentSampleIndex;
        }
    };
    PlayerComponent.prototype.jumpOneSampleForward = function () {
        if (this.currentSampleIndex < this.numberOfSamples - 1) {
            ++this.currentSampleIndex;
        }
    };
    var PlayerComponent_1;
    PlayerComponent.DESIRED_PLAYBACK_TIME = 3000;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PlayerComponent.prototype, "currentSampleIndexChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PlayerComponent.prototype, "numberOfSamples", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PlayerComponent.prototype, "currentSampleIndex", null);
    PlayerComponent = PlayerComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-player',
            template: "\n    <input type=\"range\" class=\"slider is-large is-fullwidth\"\n           [min]=\"0\"\n           [max]=\"numberOfSamples - 1\"\n           [step]=\"1\"\n           [(ngModel)]=\"currentSampleIndex\">\n\n    <div class=\"buttons\">\n      <button type=\"button\" class=\"button is-small\" (click)=\"jumpToFirstSample()\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-fast-backward\"></i>\n        </span>\n      </button>\n      <button type=\"button\" class=\"button is-small\" (click)=\"jumpOneSampleBack()\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-step-backward\"></i>\n        </span>\n      </button>\n      <button type=\"button\" class=\"button is-small\" (click)=\"play()\" *ngIf=\"subscription == null\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-play\"></i>\n        </span>\n      </button>\n      <button type=\"button\" class=\"button is-small\" (click)=\"pause()\" *ngIf=\"subscription != null\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-pause\"></i>\n        </span>\n      </button>\n      <button type=\"button\" class=\"button is-small\" (click)=\"jumpOneSampleForward()\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-step-forward\"></i>\n        </span>\n      </button>\n      <button type=\"button\" class=\"button is-small\" (click)=\"jumpToLastSample()\">\n        <span class=\"icon is-small\">\n          <i class=\"fas fa-fast-forward\"></i>\n        </span>\n      </button>\n      <span>Sample {{currentSampleIndex + 1}} of {{numberOfSamples}}</span>\n    </div>\n  ",
            styles: ["\n    input {\n      padding-right: 10px;\n    }\n  "]
        })
    ], PlayerComponent);
    return PlayerComponent;
}());



/***/ }),

/***/ "./src/app/scene.directive.ts":
/*!************************************!*\
  !*** ./src/app/scene.directive.ts ***!
  \************************************/
/*! exports provided: SceneDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneDirective", function() { return SceneDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _three_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./three.directive */ "./src/app/three.directive.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SceneDirective = /** @class */ (function () {
    function SceneDirective(threeDirective, scene) {
        this.threeDirective = threeDirective;
        this.scene = scene;
    }
    SceneDirective.prototype.ngOnInit = function () {
        this.threeDirective.setScene(this.scene);
    };
    SceneDirective.prototype.ngOnDestroy = function () {
        this.threeDirective.setScene(null);
    };
    SceneDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'scene',
            providers: [
                {
                    provide: three__WEBPACK_IMPORTED_MODULE_0__["Scene"],
                    useFactory: function () { return new three__WEBPACK_IMPORTED_MODULE_0__["Scene"](); }
                }
            ]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_three_directive__WEBPACK_IMPORTED_MODULE_1__["ThreeDirective"])),
        __metadata("design:paramtypes", [_three_directive__WEBPACK_IMPORTED_MODULE_1__["ThreeDirective"],
            three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], SceneDirective);
    return SceneDirective;
}());



/***/ }),

/***/ "./src/app/three.directive.ts":
/*!************************************!*\
  !*** ./src/app/three.directive.ts ***!
  \************************************/
/*! exports provided: ThreeDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeDirective", function() { return ThreeDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ThreeDirective = /** @class */ (function () {
    function ThreeDirective(element) {
        this.element = element;
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]({
            antialias: true,
            canvas: this.element.nativeElement
        });
        this.renderer.setClearColor(0x000000);
    }
    ThreeDirective.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    ThreeDirective.prototype.setCamera = function (camera) {
        this.camera = camera;
    };
    ThreeDirective.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    ThreeDirective.prototype.ngOnDestroy = function () {
        clearInterval(this.resizePollHandle);
    };
    ThreeDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.resizePollHandle = setInterval(function () {
            _this.updateRendererAndCameraIfNeeded();
        }, 1000);
    };
    ThreeDirective.prototype.ngAfterContentChecked = function () {
        this.render();
    };
    ThreeDirective.prototype.updateRendererAndCameraIfNeeded = function () {
        var canvas = this.element.nativeElement;
        var clientWidth = canvas.clientWidth, clientHeight = canvas.clientHeight;
        var sizeHaveChanged = canvas.width !== clientWidth ||
            canvas.height !== clientHeight;
        if (sizeHaveChanged) {
            canvas.width = clientWidth;
            canvas.height = clientHeight;
            this.renderer.setSize(clientWidth, clientHeight, false);
            if (this.camera instanceof three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"]) {
                this.camera.aspect = clientWidth / clientHeight;
                this.camera.updateProjectionMatrix();
            }
            this.render();
        }
    };
    ThreeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: '[three]',
            exportAs: 'three',
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ThreeDirective);
    return ThreeDirective;
}());



/***/ }),

/***/ "./src/app/trajectory.directive.ts":
/*!*****************************************!*\
  !*** ./src/app/trajectory.directive.ts ***!
  \*****************************************/
/*! exports provided: TrajectoryDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrajectoryDirective", function() { return TrajectoryDirective; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrajectoryDirective = /** @class */ (function () {
    function TrajectoryDirective(scene) {
        this.scene = scene;
        this.geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();
        this.positionAttribute = new three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](new Float32Array(3 * 5000), 3);
        this.positionAttribute.setDynamic(true);
        this.geometry.addAttribute('position', this.positionAttribute);
        var material = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]({
            color: 0x00ff00
        });
        this.line = new three__WEBPACK_IMPORTED_MODULE_0__["Line"](this.geometry, material);
        this.line.scale.set(TrajectoryDirective_1.SCALE, TrajectoryDirective_1.SCALE, TrajectoryDirective_1.SCALE);
    }
    TrajectoryDirective_1 = TrajectoryDirective;
    Object.defineProperty(TrajectoryDirective.prototype, "samples", {
        set: function (samples) {
            this.positionAttribute.copyVector3sArray(samples.map(function (s) { return s.position; }));
            this.positionAttribute.needsUpdate = true;
            this.geometry.setDrawRange(0, samples.length);
        },
        enumerable: true,
        configurable: true
    });
    TrajectoryDirective.prototype.ngOnInit = function () {
        this.scene.add(this.line);
    };
    TrajectoryDirective.prototype.ngOnDestroy = function () {
        this.scene.remove(this.line);
    };
    var TrajectoryDirective_1;
    TrajectoryDirective.SCALE = 1e-5;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TrajectoryDirective.prototype, "samples", null);
    TrajectoryDirective = TrajectoryDirective_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            // tslint:disable-next-line:directive-selector
            selector: 'trajectory'
        }),
        __metadata("design:paramtypes", [three__WEBPACK_IMPORTED_MODULE_0__["Scene"]])
    ], TrajectoryDirective);
    return TrajectoryDirective;
}());



/***/ }),

/***/ "./src/app/vector-editor.component.ts":
/*!********************************************!*\
  !*** ./src/app/vector-editor.component.ts ***!
  \********************************************/
/*! exports provided: VectorEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VectorEditorComponent", function() { return VectorEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VectorEditorComponent = /** @class */ (function () {
    function VectorEditorComponent() {
        this.inputRange = 100;
        this.inputStep = 1;
        this.range = 1.0;
        this.vector = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 0);
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    VectorEditorComponent_1 = VectorEditorComponent;
    VectorEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    VectorEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    VectorEditorComponent.prototype.setDisabledState = function (isDisabled) {
    };
    VectorEditorComponent.prototype.writeValue = function (obj) {
        this.vector = obj;
        this.onChange(this.vector);
    };
    Object.defineProperty(VectorEditorComponent.prototype, "realX", {
        get: function () {
            return this.vector != null ? this.vector.x : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorEditorComponent.prototype, "visualX", {
        get: function () {
            return this.vector != null ? (this.vector.x / this.range) * this.inputRange : null;
        },
        set: function (value) {
            this.vector = this.vector.setX((value / this.inputRange) * this.range).clone();
            this.onChange(this.vector);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorEditorComponent.prototype, "realY", {
        get: function () {
            return this.vector != null ? this.vector.y : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorEditorComponent.prototype, "visualY", {
        get: function () {
            return this.vector != null ? (this.vector.y / this.range) * this.inputRange : null;
        },
        set: function (value) {
            this.vector = this.vector.setY((value / this.inputRange) * this.range).clone();
            this.onChange(this.vector);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorEditorComponent.prototype, "realZ", {
        get: function () {
            return this.vector != null ? this.vector.z : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VectorEditorComponent.prototype, "visualZ", {
        get: function () {
            return this.vector != null ? (this.vector.z / this.range) * this.inputRange : null;
        },
        set: function (value) {
            this.vector = this.vector.setZ((value / this.inputRange) * this.range).clone();
            this.onChange(this.vector);
        },
        enumerable: true,
        configurable: true
    });
    var VectorEditorComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], VectorEditorComponent.prototype, "name", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], VectorEditorComponent.prototype, "range", void 0);
    VectorEditorComponent = VectorEditorComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vector-editor',
            template: "\n    <pre>\n<ng-container *ngIf=\"name != null\"><span class=\"has-text-weight-bold\">{{name}}</span>\n</ng-container>  X: <input type=\"range\" class=\"slider is-small is-circle is-success\" [min]=\"-inputRange\" [max]=\"inputRange\"\n                           [step]=\"inputStep\" [(ngModel)]=\"visualX\"> ({{realX|exponential}})\n  Y: <input type=\"range\" class=\"slider is-small is-circle is-success\" [min]=\"-inputRange\" [max]=\"inputRange\" [step]=\"inputStep\"\n            [(ngModel)]=\"visualY\"> ({{realY|exponential}})\n  Z: <input type=\"range\" class=\"slider is-small is-circle is-success\" [min]=\"-inputRange\" [max]=\"inputRange\" [step]=\"inputStep\"\n            [(ngModel)]=\"visualZ\"> ({{realZ|exponential}})</pre>\n  ",
            styles: ["\n    pre {\n      margin: 0;\n      padding: 0;\n    }\n\n    input.slider {\n      margin: 0;\n    }\n  "],
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return VectorEditorComponent_1; }),
                    multi: true
                }
            ]
        })
    ], VectorEditorComponent);
    return VectorEditorComponent;
}());



/***/ }),

/***/ "./src/app/vector.pipe.ts":
/*!********************************!*\
  !*** ./src/app/vector.pipe.ts ***!
  \********************************/
/*! exports provided: VectorPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VectorPipe", function() { return VectorPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VectorPipe = /** @class */ (function () {
    function VectorPipe() {
    }
    VectorPipe_1 = VectorPipe;
    VectorPipe.prototype.transform = function (v) {
        if (v == null) {
            return 'null';
        }
        return "(" + v.x.toExponential(VectorPipe_1.DIGITS) + ", " + v.y.toExponential(VectorPipe_1.DIGITS) + ", " + v.z.toExponential(VectorPipe_1.DIGITS) + ")";
    };
    var VectorPipe_1;
    VectorPipe.DIGITS = 1;
    VectorPipe = VectorPipe_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'vector'
        })
    ], VectorPipe);
    return VectorPipe;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/aagibalov/electron-model/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map