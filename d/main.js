(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\reinforce\ng\my-app\src\main.ts */"zUnb");


/***/ }),

/***/ "0y4Z":
/*!*******************************!*\
  !*** ./src/app/rf.service.ts ***!
  \*******************************/
/*! exports provided: RF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RF", function() { return RF; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "b6Qw");





class RF {
    constructor(http, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.apiUrl = 'https://reinforce.moe/api/v2';
        this.token = '';
        this.loggedIn = false;
        this.isLoggedIn = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        if (cookie.check('token')) {
            // token exist
            this._post('/user/token', { token: this.cookie.get('token') })
                .then(res => {
                if (res.code === 200) {
                    console.log("Init check, request success", res);
                    this.setToken(res.data);
                    this.isLoggedIn.next(true);
                }
                else {
                    this.isLoggedIn.next(false);
                    return Promise.reject(res);
                }
            })
                .catch(err => {
                console.log("Init check failed, delete cookie");
                this.deleteToken();
                this.isLoggedIn.next(false);
            });
        }
        else {
            this.isLoggedIn.next(false);
        }
    }
    test() {
        return this._get('');
    }
    login(username, password, keepLogin) {
        return this._post('/user/login', { username: username, password: password, keeplogin: keepLogin })
            .then((resp) => {
            if (resp.code === 200) {
                this.setToken(resp.data);
                return resp;
            }
            else {
                return Promise.reject(resp);
            }
        });
    }
    logout() {
        if (this.loggedIn) {
            return this._post('/user/logout', { token: this.token })
                .then(res => {
                this.cookie.delete('token');
                this.token = '';
                this.tokenInfo = {};
                this.loggedIn = false;
                this.isLoggedIn.next(false);
                return res;
            });
        }
        else {
            return Promise.reject();
        }
    }
    diaryGetToday() {
        return this._get('/diary/get/today', true);
    }
    diaryWrite(content) {
        return this._post('/diary/write', { content: content });
    }
    setToken(tokenInfo) {
        this.cookie.set('token', tokenInfo.token, { expires: new Date(tokenInfo.expire * 1000), secure: false, path: '/', sameSite: 'Lax' });
        this.tokenInfo = tokenInfo;
        this.token = tokenInfo.token;
        this.loggedIn = true;
    }
    updateTokenExpire() {
        this.tokenInfo.expire = Number(this.tokenInfo.valid_time) + (Date.now() / 1000 | 0);
        this.setToken(this.tokenInfo);
    }
    /**
     * Delete token cookie
     */
    deleteToken() {
        this.cookie.set('token', '', { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), secure: false, path: '/', sameSite: 'Lax' });
    }
    _get(path, authorizeRequired = false) {
        if (this.loggedIn) {
            this.updateTokenExpire();
            return this.http.get(this.apiUrl + path, { headers: { token: this.token } }).toPromise();
        }
        else if (authorizeRequired) {
            return new Promise((resolve, reject) => {
                this.isLoggedIn.subscribe(result => {
                    this.http.get(this.apiUrl + path, { headers: { token: this.token } }).toPromise()
                        .then(resolve)
                        .catch(reject);
                });
            });
        }
        else
            return this.http.get(this.apiUrl + path).toPromise();
    }
    _post(path, data, authorizeRequired = false) {
        if (this.loggedIn) {
            this.updateTokenExpire();
            return this.http.post(this.apiUrl + path, data, { headers: { token: this.token } }).toPromise();
        }
        else if (authorizeRequired) {
            return new Promise((resolve, reject) => {
                this.isLoggedIn.subscribe(result => {
                    this.http.post(this.apiUrl + path, data, { headers: { token: this.token } }).toPromise()
                        .then(resolve)
                        .catch(reject);
                });
            });
        }
        else
            return this.http.post(this.apiUrl + path, data).toPromise();
    }
}
RF.ɵfac = function RF_Factory(t) { return new (t || RF)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"])); };
RF.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RF, factory: RF.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RF, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"] }]; }, null); })();


/***/ }),

/***/ "5BdY":
/*!******************************************!*\
  !*** ./src/app/diary/diary.component.ts ***!
  \******************************************/
/*! exports provided: DiaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiaryComponent", function() { return DiaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rf_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rf.service */ "0y4Z");
/* harmony import */ var _ui_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui.service */ "T1jZ");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");














const _c0 = ["input"];
function DiaryComponent_mat_spinner_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner", 10);
} }
class DiaryComponent {
    constructor(rf, ui) {
        this.rf = rf;
        this.ui = ui;
        /**Content input debounce */
        this.debounce = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.content = '';
        this.date = '';
        /**Used to compare each save is same or not */
        this.finalContent = '';
        this.contentSaved = true;
    }
    ngOnInit() {
        this.ui.setViewingPage('diary');
        this.debounce.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(4000))
            .subscribe(result => {
            this.saveDiary(result);
        });
        this.subscription = this.rf.isLoggedIn.subscribe(result => {
            if (result) { // user logged in
                this.rf.diaryGetToday()
                    .then(res => {
                    console.log(res);
                    this.date = res.data.date;
                    this.content = res.data.content;
                    this.finalContent = res.data.content;
                })
                    .catch(err => {
                    console.log(err);
                    this.ui.openInfoBar(err.error.msg, 'Got it');
                });
            }
            else {
            }
        });
    }
    ngOnDestroy() {
        this.debounce.unsubscribe();
        this.subscription.unsubscribe();
    }
    onInput(e) {
        this.content = e;
        this.contentSaved = false;
        this.debounce.next(e);
    }
    saveDiary(content) {
        if (this.finalContent != content) {
            this.rf.diaryWrite(content)
                .then(res => {
                this.contentSaved = true;
                this.ui.openInfoBar("Diary saved", 'Got it');
            })
                .catch(err => {
                this.ui.openInfoBar(err.error.msg, 'Got it');
            });
        }
        else {
            // Inform user content is saved
            this.contentSaved = true;
            this.ui.openInfoBar("Diary saved", 'Got it');
        }
    }
}
DiaryComponent.ɵfac = function DiaryComponent_Factory(t) { return new (t || DiaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rf_service__WEBPACK_IMPORTED_MODULE_3__["RF"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ui_service__WEBPACK_IMPORTED_MODULE_4__["UIService"])); };
DiaryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DiaryComponent, selectors: [["app-diary"]], viewQuery: function DiaryComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.contentInput = _t.first);
    } }, decls: 17, vars: 6, consts: [[1, "header-container"], ["diameter", "25", 4, "ngIf"], [1, "spacer"], [1, "mat-h1", "date"], [1, "input-container"], [1, "content-input"], ["input", ""], ["matInput", "", 3, "ngModel", "ngModelChange", "focus", "focusout"], [1, "bottom"], ["mat-raised-button", "", "color", "accent", "matTooltip", "View old diary", "matTooltipPosition", "above", "matTooltipShowDelay", "1000"], ["diameter", "25"]], template: function DiaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DiaryComponent_mat_spinner_3_Template, 1, 0, "mat-spinner", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Do you feel happy today?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "textarea", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DiaryComponent_Template_textarea_ngModelChange_13_listener($event) { return ctx.onInput($event); })("focus", function DiaryComponent_Template_textarea_focus_13_listener() { return ctx.ui.isInputting = true; })("focusout", function DiaryComponent_Template_textarea_focusout_13_listener() { return ctx.ui.isInputting = false; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Time Machine");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.contentSaved ? "green" : "red");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contentSaved ? "cloud_done" : "cloud_upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.contentSaved == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.date ? ctx.date : ":(");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.content);
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgModel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatAnchor"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__["MatSpinner"]], styles: [".content-input[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n}\r\n\r\n.input-container[_ngcontent-%COMP%] {\r\n    margin: 0 auto;\r\n    width: 85%;\r\n}\r\n\r\n.content-input[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\r\n    height: 65vh;\r\n    resize: none;\r\n}\r\n\r\n.header-container[_ngcontent-%COMP%] {\r\n    margin-top: 5px;\r\n    margin-left: 20px;\r\n    margin-right: 20px;\r\n    display: flex;\r\n}\r\n\r\n.header-container[_ngcontent-%COMP%]   .save-status[_ngcontent-%COMP%] {\r\n    color: gray;\r\n    text-decoration: underline;\r\n    font-style: italic;\r\n}\r\n\r\n.header-container[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\r\n    padding-left: 5px;\r\n    padding-right: 10px;\r\n}\r\n\r\n.header-container[_ngcontent-%COMP%]   .green[_ngcontent-%COMP%] {\r\n    color: green;\r\n}\r\n\r\n.header-container[_ngcontent-%COMP%]   .red[_ngcontent-%COMP%] {\r\n    color: red;\r\n}\r\n\r\n.bottom[_ngcontent-%COMP%] {\r\n    text-align: right;\r\n}\r\n\r\n.spacer[_ngcontent-%COMP%] {\r\n    flex: 1 1 auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhcnkvZGlhcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsMEJBQTBCO0lBQzFCLGtCQUFrQjtBQUN0Qjs7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxZQUFZO0FBQ2hCOztBQUNBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2RpYXJ5L2RpYXJ5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC1pbnB1dCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmlucHV0LWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIHdpZHRoOiA4NSU7XHJcbn1cclxuXHJcbi5jb250ZW50LWlucHV0IHRleHRhcmVhIHtcclxuICAgIGhlaWdodDogNjV2aDtcclxuICAgIHJlc2l6ZTogbm9uZTtcclxufVxyXG5cclxuLmhlYWRlci1jb250YWluZXIge1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5oZWFkZXItY29udGFpbmVyIC5zYXZlLXN0YXR1cyB7XHJcbiAgICBjb2xvcjogZ3JheTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG59XHJcbi5oZWFkZXItY29udGFpbmVyIC5kYXRlIHtcclxuICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxufVxyXG4uaGVhZGVyLWNvbnRhaW5lciAuZ3JlZW4ge1xyXG4gICAgY29sb3I6IGdyZWVuO1xyXG59XHJcbi5oZWFkZXItY29udGFpbmVyIC5yZWQge1xyXG4gICAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuLmJvdHRvbSB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5cclxuLnNwYWNlciB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DiaryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-diary',
                templateUrl: './diary.component.html',
                styleUrls: ['./diary.component.css']
            }]
    }], function () { return [{ type: _rf_service__WEBPACK_IMPORTED_MODULE_3__["RF"] }, { type: _ui_service__WEBPACK_IMPORTED_MODULE_4__["UIService"] }]; }, { contentInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["input"]
        }] }); })();


/***/ }),

/***/ "8hpU":
/*!****************************************!*\
  !*** ./src/app/note/note.component.ts ***!
  \****************************************/
/*! exports provided: NoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteComponent", function() { return NoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class NoteComponent {
    constructor() { }
    ngOnInit() {
    }
}
NoteComponent.ɵfac = function NoteComponent_Factory(t) { return new (t || NoteComponent)(); };
NoteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NoteComponent, selectors: [["app-note"]], decls: 2, vars: 0, template: function NoteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "note works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vdGUvbm90ZS5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NoteComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-note',
                templateUrl: './note.component.html',
                styleUrls: ['./note.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Nuu6":
/*!***************************************!*\
  !*** ./src/app/login/login-dialog.ts ***!
  \***************************************/
/*! exports provided: LoginDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDialogComponent", function() { return LoginDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");









class LoginDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        data.username = '';
        data.password = '';
        data.keepLogin = false;
    }
    onNoClick() {
        this.dialogRef.close({});
    }
}
LoginDialogComponent.ɵfac = function LoginDialogComponent_Factory(t) { return new (t || LoginDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
LoginDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginDialogComponent, selectors: [["login-dialog"]], decls: 22, vars: 4, consts: [[1, "login-dialog"], ["mat-dialog-title", ""], ["mat-dialog-content", ""], ["matInput", "", "cdkFocusInitial", "", 3, "ngModel", "ngModelChange"], ["type", "password", "matInput", "", 3, "ngModel", "ngModelChange"], ["color", "primary", 3, "ngModel", "ngModelChange"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-button", "", 3, "mat-dialog-close"]], template: function LoginDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginDialogComponent_Template_input_ngModelChange_8_listener($event) { return ctx.data.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginDialogComponent_Template_input_ngModelChange_13_listener($event) { return ctx.data.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-checkbox", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginDialogComponent_Template_mat_checkbox_ngModelChange_15_listener($event) { return ctx.data.keepLogin = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Remember me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginDialogComponent_Template_button_click_18_listener() { return ctx.onNoClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Ok");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.data.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.data.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.data.keepLogin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", ctx.data);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckbox"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: [".login-dialog[_ngcontent-%COMP%]   .mat-dialog-content[_ngcontent-%COMP%] {\r\n    overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4tZGlhbG9nLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLWRpYWxvZy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tZGlhbG9nIC5tYXQtZGlhbG9nLWNvbnRlbnQge1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'login-dialog',
                templateUrl: 'login-dialog.html',
                styleUrls: ['login-dialog.css']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _ui_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.service */ "T1jZ");
/* harmony import */ var _rf_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rf.service */ "0y4Z");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");















const _c0 = ["sidenav"];
function AppComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_a_14_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.openLoginDialog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_a_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Register ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "portrait");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_a_16_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "exit_to_app");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_button_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "portrait");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Register ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_32_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.openLoginDialog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Q:\u9019\u500B\u7DB2\u7AD9\u6709\u4EC0\u9EBC\u7528\uFF1F");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " A:\u672C\u7DB2\u7AD9\u63D0\u4F9B\u7DDA\u4E0A\u65E5\u8A18\u672C\u548C\u7B46\u8A18\u672C\uFF0C\u4F7F\u7528\u8005\u53EF\u4EE5\u5F9E\u4EFB\u4F55\u806F\u7DB2\u88DD\u7F6E\u64B0\u5BEB\u65E5\u8A18/\u7B46\u8A18 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Q:\u8981\u9322\u9EBD\uFF1F");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " A:\u5B8C\u5168\u514D\u8CBB+\u96F6\u5EE3\u544A\uFF0C\u53EA\u70BA\u4F7F\u7528\u8005\u53EF\u4EE5\u5C08\u6CE8\u8A18\u9304\u6BCF\u5929\u73CD\u8CB4\u7684\u4E00\u9EDE\u4E00\u6EF4\u3002\u4F46\u5982\u679C\u4F60\u60F3\u8ACB\u958B\u767C\u8005\u5403\u500B\u65E9\u9910\u4E5F\u662F\u53EF\u4EE5\u7684 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Q:\u628A\u65E5\u8A18\u653E\u5728\u4F60\u7684\u4F3A\u670D\u5668\u5B89\u5168\u55CE\uFF1F");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " A:\u4F3A\u670D\u5668\u8CC7\u6599\u6BCF\u5929\u81EA\u52D5\u5099\u4EFD\u5230\u9060\u7AEF\u4F3A\u670D\u5668\uFF0C\u4E0D\u6015\u73CD\u8CB4\u7684\u56DE\u61B6\u4E1F\u5931 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Q:\u8981\u600E\u9EBC\u958B\u59CB\u4F7F\u7528\uFF1F");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " A:\u5728\u767B\u5165\u9801\u9762\u6253\u958B\u5074\u6B04\u627E\u5230\u8A3B\u518A\u9078\u9805\uFF0C\u8F38\u5165\u5E33\u865F\u540D\u7A31\u548C\u5BC6\u78BC\u8A3B\u518A\u5F8C\uFF0C\u5373\u53EF\u767B\u5165\u4F7F\u7528 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Q:\u6211\u5FD8\u8A18\u5BC6\u78BC\uFF0C\u8A72\u600E\u9EBC\u8FA6\uFF1F");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " A:\u7531\u65BC\u5BC6\u78BC\u662F\u52A0\u5BC6\u5F8C\u5132\u5B58\u5728\u4F3A\u670D\u5668\uFF0C\u56E0\u6B64\u7121\u7B2C\u4E09\u8005\u77E5\u9053\u4F60\u7684\u5BC6\u78BC\u3002\u8ACB\u806F\u7D61\u958B\u767C\u8005\u91CD\u8A2D\u5BC6\u78BC ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " \u5176\u4ED6\u4F7F\u7528\u9808\u77E5\uFF1A \u672C\u670D\u52D9\u70BA\u5148\u884C\u7248\uFF0C\u4E0D\u6392\u9664\u6703\u51FA\u73FE\u67D0\u4E9B\u4E0D\u53EF\u9810\u671F\u7684\u554F\u984C\u3002\u4F7F\u7528\u524D\u8ACB\u8B39\u614E\u8003\u616E ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(changeDetectorRef, media, ui, rf, router) {
        this.ui = ui;
        this.rf = rf;
        this.router = router;
        this.loggedIn = true; // assume logged in so that the content wont show until result is confirmed to prevent screen flash
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        this.ui.toggleTheme();
        this.subscription = this.rf.isLoggedIn.subscribe(result => {
            if (result) {
                console.log("You are logged in");
                this.loggedIn = true;
                switch (this.ui.getViewingPage()) {
                    case 'diary':
                        this.router.navigate(['/diary']);
                        break;
                    case 'note':
                        this.router.navigate(['/note']);
                        break;
                }
            }
            else {
                console.log("Please login");
                this.loggedIn = false;
                this.router.navigate(['/']);
                this.openLoginDialog();
            }
        });
    }
    openLoginDialog() {
        this.ui.openLoginDialog()
            .afterClosed()
            .subscribe(data => {
            if (data.username && data.password) {
                this.rf.login(data.username, data.password, data.keepLogin)
                    .then(res => {
                    console.log("App Component: Login success", res);
                    this.rf.isLoggedIn.next(true);
                })
                    .catch(err => {
                    console.log(err);
                    this.ui.openInfoBar(err.error.msg, 'Got it');
                    this.rf.isLoggedIn.next(false);
                });
            }
            else {
                console.log("LoginDialog: Login canceled");
            }
        });
    }
    logout() {
        this.rf.logout()
            .then(res => {
            this.ui.openInfoBar("Successfully logged out", 'Got it');
            this.router.navigate(['/']);
        })
            .catch(err => {
            // Not logged in
            this.ui.openInfoBar("You are not logged in", 'Got it');
        });
    }
    swipe(e, when) {
        if (this.ui.isInputting)
            return;
        let coord = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        let time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            let direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            let duration = time - this.swipeTime;
            if (duration < 1000 //
                && Math.abs(direction[0]) > 100 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                let swipe = direction[0] < 0 ? 'left' : 'right';
                // Do whatever you want with swipe
                if (swipe == 'right') {
                    this.sidenav.open();
                }
            }
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ui_service__WEBPACK_IMPORTED_MODULE_2__["UIService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rf_service__WEBPACK_IMPORTED_MODULE_3__["RF"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.sidenav = _t.first);
    } }, decls: 34, vars: 10, consts: [[3, "mode"], ["sidenav", ""], [1, "nav-header"], [1, "nav-image-container"], ["src", "https://note.reinforce.moe/css/data/round-icon.png"], ["mat-list-item", "", 3, "click"], ["matListIcon", ""], ["mat-list-item", "", 3, "click", 4, "ngIf"], ["mat-list-item", "", 4, "ngIf"], [3, "touchstart", "touchend"], ["color", "primary"], ["mat-icon-button", "", 3, "click"], [1, "spacer"], ["mat-icon-button", "", "routerLink", "/login", "routerLinkActive", "mat-button-disabled", "matTooltip", "Login", "matTooltipPosition", "below", "matTooltipShowDelay", "1000", 4, "ngIf"], ["mat-icon-button", "", "routerLink", "/note", "routerLinkActive", "mat-button-disabled", "matTooltip", "Notebook", "matTooltipPosition", "below", "matTooltipShowDelay", "1000", 3, "disabled"], ["mat-icon-button", "", "routerLink", "/diary", "routerLinkActive", "mat-button-disabled", "matTooltip", "Diary book", "matTooltipPosition", "below", "matTooltipShowDelay", "1000", 3, "disabled"], ["class", "alt-content", 4, "ngIf"], ["mat-list-item", ""], ["mat-icon-button", "", "routerLink", "/login", "routerLinkActive", "mat-button-disabled", "matTooltip", "Login", "matTooltipPosition", "below", "matTooltipShowDelay", "1000"], [1, "alt-content"], ["mat-raised-button", "", "color", "accent"], ["mat-raised-button", "", "color", "accent", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-sidenav-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-sidenav", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-hint");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Powered by Magic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_10_listener() { return ctx.ui.toggleTheme(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, AppComponent_a_14_Template, 4, 0, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, AppComponent_a_15_Template, 4, 0, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, AppComponent_a_16_Template, 4, 0, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-sidenav-content", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("touchstart", function AppComponent_Template_mat_sidenav_content_touchstart_17_listener($event) { return ctx.swipe($event, "start"); })("touchend", function AppComponent_Template_mat_sidenav_content_touchend_17_listener($event) { return ctx.swipe($event, "end"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-toolbar", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return _r0.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Reinforce.moe");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, AppComponent_button_25_Template, 3, 0, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "sticky_note_2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "book");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, AppComponent_div_32_Template, 31, 0, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.mobileQuery.matches ? "over" : "side");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Toggle ", ctx.ui.darkMode ? "Light" : "Dark", " Mode ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.ui.darkMode ? "toggle_on" : "toggle_off");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loggedIn == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loggedIn == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.loggedIn == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.loggedIn == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loggedIn == false);
    } }, directives: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatNavList"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatHint"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__["MatDivider"], _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListItem"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListIconCssMatStyler"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_5__["MatSidenavContent"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkActive"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__["MatTooltip"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\r\n    height: 100%;\r\n    display: block;\r\n}\r\n.spacer[_ngcontent-%COMP%] {\r\n    flex: 1 1 auto;\r\n}\r\n.active[_ngcontent-%COMP%] {\r\n    color: rgb(129, 0, 146);\r\n}\r\n.mat-sidenav-container[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n}\r\nmat-sidenav[_ngcontent-%COMP%] {\r\n    width: 230px;\r\n}\r\n.nav-header[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n}\r\n.nav-image-container[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n    height: 180px;\r\n}\r\n.nav-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n}\r\n.alt-content[_ngcontent-%COMP%] {\r\n    margin: 10px;\r\n}\r\n.alt-content[_ngcontent-%COMP%]   .mat-button-base[_ngcontent-%COMP%] {\r\n    margin: 0 8px 0 8px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjtBQUVBO0lBQ0ksWUFBWTtBQUNoQjtBQUVBO0lBQ0ksWUFBWTtBQUNoQjtBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtBQUNqQjtBQUVBO0lBQ0ksWUFBWTtBQUNoQjtBQUVBO0lBQ0ksWUFBWTtBQUNoQjtBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuOmhvc3Qge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuLnNwYWNlciB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG4uYWN0aXZlIHtcclxuICAgIGNvbG9yOiByZ2IoMTI5LCAwLCAxNDYpO1xyXG59XHJcblxyXG4ubWF0LXNpZGVuYXYtY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxubWF0LXNpZGVuYXYge1xyXG4gICAgd2lkdGg6IDIzMHB4O1xyXG59XHJcblxyXG4ubmF2LWhlYWRlciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5uYXYtaW1hZ2UtY29udGFpbmVyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGhlaWdodDogMTgwcHg7XHJcbn1cclxuXHJcbi5uYXYtaW1hZ2UtY29udGFpbmVyIGltZyB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5hbHQtY29udGVudCB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5hbHQtY29udGVudCAubWF0LWJ1dHRvbi1iYXNlIHtcclxuICAgIG1hcmdpbjogMCA4cHggMCA4cHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"] }, { type: _ui_service__WEBPACK_IMPORTED_MODULE_2__["UIService"] }, { type: _rf_service__WEBPACK_IMPORTED_MODULE_3__["RF"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, { sidenav: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['sidenav']
        }] }); })();


/***/ }),

/***/ "T1jZ":
/*!*******************************!*\
  !*** ./src/app/ui.service.ts ***!
  \*******************************/
/*! exports provided: UIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIService", function() { return UIService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _login_login_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login-dialog */ "Nuu6");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");






class UIService {
    constructor(_snackBar, dialog, overlay) {
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.overlay = overlay;
        this.isInputting = false;
        this.darkMode = false;
        // init viewing page in case first time start up
        if (localStorage.getItem('viewing_page') === null) {
            this.setViewingPage('diary');
        }
        if (localStorage.getItem('dark_mode') === null) {
            localStorage.setItem('dark_mode', '0');
        }
    }
    openInfoBar(msg, action) {
        return this._snackBar.open(msg, action, {
            duration: 5000,
        });
    }
    openLoginDialog() {
        let dialogRef = this.dialog.open(_login_login_dialog__WEBPACK_IMPORTED_MODULE_1__["LoginDialogComponent"], {
            data: { username: '', password: '' },
            disableClose: true
        });
        return dialogRef;
    }
    /**Set the current using page so that in next start up we can show the last used page */
    setViewingPage(pageName) {
        localStorage.setItem('viewing_page', pageName);
    }
    getViewingPage() {
        return localStorage.getItem('viewing_page');
    }
    toggleTheme() {
        if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
            this.overlay.getContainerElement().classList.remove("dark-theme");
            this.overlay.getContainerElement().classList.add("light-theme");
            this.darkMode = false;
        }
        else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
            this.overlay.getContainerElement().classList.remove("light-theme");
            this.overlay.getContainerElement().classList.add("dark-theme");
            this.darkMode = true;
        }
        else { // first load
            this.darkMode = localStorage.getItem('dark_mode') == '0' ? false : true;
            this.overlay.getContainerElement().classList.add(this.darkMode ? "dark-theme" : "light-theme");
        }
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        }
        else if (document.body.classList.contains("light-theme")) {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        }
        else {
            document.body.classList.add(this.darkMode ? "dark-theme" : "light-theme");
        }
        localStorage.setItem('dark_mode', this.darkMode ? '1' : '0');
    }
}
UIService.ɵfac = function UIService_Factory(t) { return new (t || UIService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__["OverlayContainer"])); };
UIService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UIService, factory: UIService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UIService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__["OverlayContainer"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _note_note_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./note/note.component */ "8hpU");
/* harmony import */ var _login_login_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login-dialog */ "Nuu6");
/* harmony import */ var _diary_diary_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./diary/diary.component */ "5BdY");
/* harmony import */ var _materials_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./materials.module */ "fSyj");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/service-worker */ "Jho9");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../environments/environment */ "AytR");















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _materials_module__WEBPACK_IMPORTED_MODULE_10__["MatMaterialModule"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_11__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_12__["environment"].production }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        _note_note_component__WEBPACK_IMPORTED_MODULE_7__["NoteComponent"],
        _login_login_dialog__WEBPACK_IMPORTED_MODULE_8__["LoginDialogComponent"],
        _diary_diary_component__WEBPACK_IMPORTED_MODULE_9__["DiaryComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _materials_module__WEBPACK_IMPORTED_MODULE_10__["MatMaterialModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_11__["ServiceWorkerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                    _note_note_component__WEBPACK_IMPORTED_MODULE_7__["NoteComponent"],
                    _login_login_dialog__WEBPACK_IMPORTED_MODULE_8__["LoginDialogComponent"],
                    _diary_diary_component__WEBPACK_IMPORTED_MODULE_9__["DiaryComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _materials_module__WEBPACK_IMPORTED_MODULE_10__["MatMaterialModule"],
                    _angular_service_worker__WEBPACK_IMPORTED_MODULE_11__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_12__["environment"].production }),
                ],
                entryComponents: [
                    _login_login_dialog__WEBPACK_IMPORTED_MODULE_8__["LoginDialogComponent"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "fSyj":
/*!*************************************!*\
  !*** ./src/app/materials.module.ts ***!
  \*************************************/
/*! exports provided: MatMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatMaterialModule", function() { return MatMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/clipboard */ "UXJo");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/stepper */ "B/XX");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/table */ "f6nW");
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/tree */ "FvrZ");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "2ChS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/slider */ "5RNC");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/slide-toggle */ "1jcm");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/sort */ "Dh3D");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");














































class MatMaterialModule {
}
MatMaterialModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MatMaterialModule });
MatMaterialModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MatMaterialModule_Factory(t) { return new (t || MatMaterialModule)(); }, imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
        _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_2__["ClipboardModule"],
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_6__["CdkStepperModule"],
        _angular_cdk_table__WEBPACK_IMPORTED_MODULE_7__["CdkTableModule"],
        _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_8__["CdkTreeModule"],
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__["DragDropModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"],
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheetModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__["MatButtonToggleModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__["MatCheckboxModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__["MatChipsModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__["MatStepperModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__["MatExpansionModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__["MatGridListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__["MatMenuModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatNativeDateModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginatorModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__["MatProgressBarModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__["MatProgressSpinnerModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__["MatRadioModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatRippleModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__["MatSidenavModule"],
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__["MatSliderModule"],
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__["MatSlideToggleModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__["MatSnackBarModule"],
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__["MatSortModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_38__["MatTableModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__["MatTabsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__["MatToolbarModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__["MatTooltipModule"],
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__["MatTreeModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__["OverlayModule"],
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__["PortalModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_44__["BrowserAnimationsModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MatMaterialModule, { exports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
        _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_2__["ClipboardModule"],
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_6__["CdkStepperModule"],
        _angular_cdk_table__WEBPACK_IMPORTED_MODULE_7__["CdkTableModule"],
        _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_8__["CdkTreeModule"],
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__["DragDropModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"],
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheetModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__["MatButtonToggleModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__["MatCheckboxModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__["MatChipsModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__["MatStepperModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__["MatExpansionModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__["MatGridListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__["MatMenuModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatNativeDateModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginatorModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__["MatProgressBarModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__["MatProgressSpinnerModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__["MatRadioModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatRippleModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__["MatSidenavModule"],
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__["MatSliderModule"],
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__["MatSlideToggleModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__["MatSnackBarModule"],
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__["MatSortModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_38__["MatTableModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__["MatTabsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__["MatToolbarModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__["MatTooltipModule"],
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__["MatTreeModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__["OverlayModule"],
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__["PortalModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_44__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatMaterialModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                exports: [
                    _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
                    _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_2__["ClipboardModule"],
                    _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_6__["CdkStepperModule"],
                    _angular_cdk_table__WEBPACK_IMPORTED_MODULE_7__["CdkTableModule"],
                    _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_8__["CdkTreeModule"],
                    _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__["DragDropModule"],
                    _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"],
                    _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__["MatBadgeModule"],
                    _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheetModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
                    _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__["MatButtonToggleModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__["MatCheckboxModule"],
                    _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__["MatChipsModule"],
                    _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__["MatStepperModule"],
                    _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
                    _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
                    _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__["MatExpansionModule"],
                    _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__["MatGridListModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__["MatIconModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__["MatMenuModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatNativeDateModule"],
                    _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__["MatPaginatorModule"],
                    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__["MatProgressBarModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__["MatProgressSpinnerModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__["MatRadioModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_27__["MatRippleModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_32__["MatSelectModule"],
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__["MatSidenavModule"],
                    _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__["MatSliderModule"],
                    _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__["MatSlideToggleModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__["MatSnackBarModule"],
                    _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__["MatSortModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_38__["MatTableModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__["MatTabsModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__["MatToolbarModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__["MatTooltipModule"],
                    _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__["MatTreeModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__["OverlayModule"],
                    _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_4__["PortalModule"],
                    _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_44__["BrowserAnimationsModule"],
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _note_note_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./note/note.component */ "8hpU");
/* harmony import */ var _diary_diary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diary/diary.component */ "5BdY");







const routes = [
    //{ path: '', pathMatch: 'full', redirectTo: '/note' },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'note', component: _note_note_component__WEBPACK_IMPORTED_MODULE_3__["NoteComponent"] },
    { path: 'diary', component: _diary_diary_component__WEBPACK_IMPORTED_MODULE_4__["DiaryComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vtpD":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rf_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rf.service */ "0y4Z");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class LoginComponent {
    constructor(rf) {
        this.rf = rf;
        this.username = '';
        this.password = '';
        this.keepLogin = false;
    }
    ngOnInit() {
    }
    login() {
        //alert(`Login: ${this.username}\n${this.password}\n${this.keepLogin}`);
        //console.log(this.rf.test());
        this.rf.login(this.username, this.password, this.keepLogin)
            .catch(err => {
            console.log("FKFKFKFKKF");
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rf_service__WEBPACK_IMPORTED_MODULE_1__["RF"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 9, vars: 3, consts: [[1, "container"], [1, "title"], ["id", "username", "placeholder", "Username", 3, "ngModel", "ngModelChange"], ["id", "password", "type", "password", "placeholder", "Password", 3, "ngModel", "ngModelChange"], ["id", "keepLogin", "type", "checkbox", 2, "display", "initial", 3, "ngModel", "ngModelChange"], ["type", "button", "value", "login", 1, "loginBtn", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "JUST DO IT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_3_listener($event) { return ctx.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_4_listener($event) { return ctx.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_6_listener($event) { return ctx.keepLogin = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Keep login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_input_click_8_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.keepLogin);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"]], styles: [".container[_ngcontent-%COMP%] {\r\n    margin: auto auto;\r\n    width: -webkit-min-content;\r\n    width: min-content;\r\n    margin-top: 10px;\r\n    border: 1px black solid;\r\n    border-radius: 3px;\r\n    padding: 3px;\r\n    background-color: white;\r\n    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2);\r\n}\r\n.loginBtn[_ngcontent-%COMP%] {\r\n    margin: 0 auto;\r\n}\r\n.title[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n    font-size: 1.2em;\r\n}\r\nbody[_ngcontent-%COMP%] {\r\n    background-color: pink;\r\n    height: initial !important;\r\n}\r\ninput[_ngcontent-%COMP%] {\r\n    display: block;\r\n    border: 1px #464646 ridge;\r\n    margin: 5px;\r\n    font-size: 1.2em;\r\n    background-color: lavenderblush;\r\n    border-radius: 3px;\r\n    padding: 3px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQiwwQkFBa0I7SUFBbEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsd0dBQXdHO0FBQzVHO0FBQ0E7SUFDSSxjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxzQkFBc0I7SUFDdEIsMEJBQTBCO0FBQzlCO0FBQ0E7SUFDSSxjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiBhdXRvIGF1dG87XHJcbiAgICB3aWR0aDogbWluLWNvbnRlbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBwYWRkaW5nOiAzcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEwcHggMCByZ2JhKDAsMCwwLDAuMTQpLCAwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwwLjEyKSwgMCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwwLjIpO1xyXG59XHJcbi5sb2dpbkJ0biB7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxufVxyXG4udGl0bGV7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEuMmVtO1xyXG59XHJcbmJvZHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcGluaztcclxuICAgIGhlaWdodDogaW5pdGlhbCAhaW1wb3J0YW50O1xyXG59XHJcbmlucHV0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYm9yZGVyOiAxcHggIzQ2NDY0NiByaWRnZTtcclxuICAgIG1hcmdpbjogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxLjJlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGxhdmVuZGVyYmx1c2g7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBwYWRkaW5nOiAzcHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            }]
    }], function () { return [{ type: _rf_service__WEBPACK_IMPORTED_MODULE_1__["RF"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
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
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map