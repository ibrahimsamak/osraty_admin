(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["editors-editors-module"],{

/***/ "./src/app/pages/editors/ckeditor/ckeditor.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/editors/ckeditor/ckeditor.component.ts ***!
  \**************************************************************/
/*! exports provided: CKEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CKEditorComponent", function() { return CKEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ckeditor_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ckeditor.loader */ "./src/app/pages/editors/ckeditor/ckeditor.loader.ts");
/* harmony import */ var _ckeditor_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ckeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor */ "./node_modules/ckeditor/ckeditor.js");
/* harmony import */ var ckeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ckeditor__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CKEditorComponent = /** @class */ (function () {
    function CKEditorComponent() {
        this.text = "test test ";
    }
    CKEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-ckeditor',
            template: "\n    <nb-card>\n      <nb-card-header>\n        CKEditor\n      </nb-card-header>\n      <nb-card-body>\n        <ckeditor [(ngModel)]=\"text\" [config]=\"{ extraPlugins: 'divarea', height: '320' }\"></ckeditor>\n      </nb-card-body>\n    </nb-card>\n  ",
        })
    ], CKEditorComponent);
    return CKEditorComponent;
}());



/***/ }),

/***/ "./src/app/pages/editors/ckeditor/ckeditor.loader.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/editors/ckeditor/ckeditor.loader.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.2/full-all/';


/***/ }),

/***/ "./src/app/pages/editors/editors-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/editors/editors-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: EditorsRoutingModule, routedComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorsRoutingModule", function() { return EditorsRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routedComponents", function() { return routedComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _editors_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editors.component */ "./src/app/pages/editors/editors.component.ts");
/* harmony import */ var _tiny_mce_tiny_mce_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tiny-mce/tiny-mce.component */ "./src/app/pages/editors/tiny-mce/tiny-mce.component.ts");
/* harmony import */ var _ckeditor_ckeditor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ckeditor/ckeditor.component */ "./src/app/pages/editors/ckeditor/ckeditor.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [{
        path: '',
        component: _editors_component__WEBPACK_IMPORTED_MODULE_2__["EditorsComponent"],
        children: [{
                path: 'tinymce',
                component: _tiny_mce_tiny_mce_component__WEBPACK_IMPORTED_MODULE_3__["TinyMCEComponent"],
            }, {
                path: 'ckeditor',
                component: _ckeditor_ckeditor_component__WEBPACK_IMPORTED_MODULE_4__["CKEditorComponent"],
            }],
    }];
var EditorsRoutingModule = /** @class */ (function () {
    function EditorsRoutingModule() {
    }
    EditorsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], EditorsRoutingModule);
    return EditorsRoutingModule;
}());

var routedComponents = [
    _editors_component__WEBPACK_IMPORTED_MODULE_2__["EditorsComponent"],
    _tiny_mce_tiny_mce_component__WEBPACK_IMPORTED_MODULE_3__["TinyMCEComponent"],
    _ckeditor_ckeditor_component__WEBPACK_IMPORTED_MODULE_4__["CKEditorComponent"],
];


/***/ }),

/***/ "./src/app/pages/editors/editors.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/editors/editors.component.ts ***!
  \****************************************************/
/*! exports provided: EditorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorsComponent", function() { return EditorsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EditorsComponent = /** @class */ (function () {
    function EditorsComponent() {
    }
    EditorsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-editors',
            template: "\n    <router-outlet></router-outlet>\n  ",
        })
    ], EditorsComponent);
    return EditorsComponent;
}());



/***/ }),

/***/ "./src/app/pages/editors/editors.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/editors/editors.module.ts ***!
  \*************************************************/
/*! exports provided: EditorsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorsModule", function() { return EditorsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/lib/ng2-ckeditor.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_ckeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _editors_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editors-routing.module */ "./src/app/pages/editors/editors-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EditorsModule = /** @class */ (function () {
    function EditorsModule() {
    }
    EditorsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__["ThemeModule"],
                _editors_routing_module__WEBPACK_IMPORTED_MODULE_3__["EditorsRoutingModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_1__["CKEditorModule"],
            ],
            declarations: _editors_routing_module__WEBPACK_IMPORTED_MODULE_3__["routedComponents"].slice(),
        })
    ], EditorsModule);
    return EditorsModule;
}());



/***/ }),

/***/ "./src/app/pages/editors/tiny-mce/tiny-mce.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/editors/tiny-mce/tiny-mce.component.ts ***!
  \**************************************************************/
/*! exports provided: TinyMCEComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TinyMCEComponent", function() { return TinyMCEComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TinyMCEComponent = /** @class */ (function () {
    function TinyMCEComponent() {
    }
    TinyMCEComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-tiny-mce-page',
            template: "\n    <nb-card>\n      <nb-card-header>\n        Tiny MCE\n      </nb-card-header>\n      <nb-card-body>\n        <ngx-tiny-mce></ngx-tiny-mce>\n      </nb-card-body>\n    </nb-card>\n  ",
        })
    ], TinyMCEComponent);
    return TinyMCEComponent;
}());



/***/ })

}]);
//# sourceMappingURL=editors-editors-module.js.map