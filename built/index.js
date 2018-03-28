/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/Audio.ts":
/*!**********************!*\
  !*** ./app/Audio.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar _1 = __webpack_require__(/*! ./helper/ */ \"./app/helper/index.ts\");\nvar _2 = __webpack_require__(/*! ./template/ */ \"./app/template/index.ts\");\nvar LiesAudio = (function () {\n    function LiesAudio() {\n        this._audio = document.createElement('audio');\n    }\n    LiesAudio.prototype.listen = function (event, handle) {\n        var _this = this;\n        this._audio.addEventListener(event, function (e) {\n            handle.call(_this, e);\n        });\n    };\n    LiesAudio.prototype.buffered = function () {\n        return this._audio.buffered.end(0);\n    };\n    LiesAudio.prototype.currentTime = function () {\n        return this._audio.currentTime;\n    };\n    LiesAudio.prototype.duration = function () {\n        return this._audio.duration;\n    };\n    LiesAudio.prototype.setVolume = function (volume) {\n        this._audio.volume = volume;\n    };\n    LiesAudio.prototype.setSong = function (url) {\n        this._audio.src = url;\n    };\n    LiesAudio.prototype.play = function () {\n        this._audio.play();\n    };\n    LiesAudio.prototype.pause = function () {\n        this._audio.pause();\n    };\n    return LiesAudio;\n}());\nexports.LiesAudio = LiesAudio;\nvar LiesAudioTemplate = (function () {\n    function LiesAudioTemplate() {\n    }\n    LiesAudioTemplate.prototype.play = function () {\n        return _2.play(function (_a, props) {\n            var el = _a.el;\n            var play = el.querySelector('[ref=play]');\n            play.removeAttribute('ref');\n            _1.Animator(play, el, 'transform, 0.3s, from scale(1) to scale(1.1)');\n            return { el: el, play: play };\n        });\n    };\n    LiesAudioTemplate.prototype.pause = function () {\n        return _2.pause(function (_a, props) {\n            var el = _a.el;\n            var pause = el.querySelector('[ref=pause]');\n            pause.removeAttribute('ref');\n            _1.Animator(pause, el, 'transform, 0.3s, from scale(1) to scale(1.1)');\n            return { el: el, pause: pause };\n        });\n    };\n    LiesAudioTemplate.prototype.progress = function () {\n        return _2.progress(function (_a, props) {\n            var el = _a.el;\n            var buffer = el.querySelector('[ref=buffer]');\n            var progress = el.querySelector('[ref=progress]');\n            buffer.removeAttribute('ref');\n            progress.removeAttribute('ref');\n            return { el: el, buffer: buffer, progress: progress };\n        });\n    };\n    LiesAudioTemplate.prototype.cover = function () {\n        return _2.cover(function (_a, props) {\n            var el = _a.el;\n            return { el: el };\n        });\n    };\n    return LiesAudioTemplate;\n}());\nexports.LiesAudioTemplate = LiesAudioTemplate;\n\n\n//# sourceURL=webpack:///./app/Audio.ts?");

/***/ }),

/***/ "./app/helper/index.ts":
/*!*****************************!*\
  !*** ./app/helper/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar Animator = function (tar, ref, comment) {\n    var options = comment.split(',');\n    var refId;\n    var style = options[0].trim();\n    var frame = parseFloat(options[1].replace('s', '').trim()) * 60;\n    var begin = options[2].match(/from([a-z()0-9. ]+)to/)[1].replace('to', '').trim();\n    var final = options[2].match(/to([a-z()0-9. ]+)/)[1].trim();\n    var sub = parseFloat(begin.match(/[0-9.]+/)[0]);\n    var inf = parseFloat(final.match(/[0-9.]+/)[0]);\n    var delta = (inf - sub) / frame;\n    var hover;\n    var current = sub;\n    var render = function () {\n        if (hover) {\n            current += delta;\n            if (current >= inf) {\n                current = inf;\n                ref.style[style] = begin.replace(/[0-9.]+/, current.toString());\n                cancelAnimationFrame(refId);\n            }\n            else {\n                ref.style[style] = begin.replace(/[0-9.]+/, current.toString());\n            }\n        }\n        else {\n            current -= delta;\n            if (current <= sub) {\n                current = sub;\n                ref.style[style] = begin.replace(/[0-9.]+/, current.toString());\n                cancelAnimationFrame(refId);\n            }\n            else {\n                ref.style[style] = begin.replace(/[0-9.]+/, current.toString());\n            }\n        }\n        refId = requestAnimationFrame(render);\n    };\n    tar.addEventListener('mouseenter', function () {\n        hover = true;\n        cancelAnimationFrame(refId);\n        refId = requestAnimationFrame(render);\n    });\n    tar.addEventListener('mouseleave', function () {\n        hover = false;\n        cancelAnimationFrame(refId);\n        refId = requestAnimationFrame(render);\n    });\n};\nexports.Animator = Animator;\nvar Transition = function (tar, state) {\n    var refId;\n    var recover = function (recState) {\n        if (recState.current >= recState._inf) {\n            recState.current = recState._inf;\n            cancelAnimationFrame(refId);\n        }\n        else {\n            recState.current += 1;\n            refId = requestAnimationFrame(function () {\n                tar.setAttribute('width', recState.current + \"%\");\n                recover(recState);\n            });\n        }\n    };\n    Object.defineProperty(state, 'inf', {\n        set: function (val) {\n            state._inf = val;\n            cancelAnimationFrame(refId);\n            refId = requestAnimationFrame(function () {\n                recover(state);\n            });\n        }\n    });\n};\nexports.Transition = Transition;\n\n\n//# sourceURL=webpack:///./app/helper/index.ts?");

/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar Audio_1 = __webpack_require__(/*! ./Audio */ \"./app/Audio.ts\");\nexports.LiesAudio = Audio_1.LiesAudio;\nexports.LiesAudioTemplate = Audio_1.LiesAudioTemplate;\n\n\n//# sourceURL=webpack:///./app/index.ts?");

/***/ }),

/***/ "./app/template/cover.tp":
/*!*******************************!*\
  !*** ./app/template/cover.tp ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (func) {var parent = document.createElement(`div`);parent.innerHTML = `<svg width=\"180\" height=\"180\" viewBox=\"0 0 180 180\">\n  <defs>\n    <pattern id=\"raduisImage\" patternUnits=\"userSpaceOnUse\" width=\"180\" height=\"180\">\n      <image x=\"-20\" height=\"180\" xlink:href=\"./cover.jpg\"></image>\n    </pattern>\n  </defs>\n  <rect rx=\"90\" width=\"180\" height=\"180\" fill=\"url(#raduisImage)\">\n    <animateTransform attributeName=\"transform\" begin=\"0s\" dur=\"10s\" type=\"rotate\" from=\"0 90 90\" to=\"360 90 90\" repeatCount=\"indefinite\" />\n  </rect>\n</svg>`;if (typeof func == 'function') {return func({el: parent.childNodes[0]}, parent.childNodes[0].attributes)} else {return parent.childNodes[0]}});\n\n//# sourceURL=webpack:///./app/template/cover.tp?");

/***/ }),

/***/ "./app/template/index.ts":
/*!*******************************!*\
  !*** ./app/template/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar play_tp_1 = __webpack_require__(/*! ./play.tp */ \"./app/template/play.tp\");\nexports.play = play_tp_1[\"default\"];\nvar pause_tp_1 = __webpack_require__(/*! ./pause.tp */ \"./app/template/pause.tp\");\nexports.pause = pause_tp_1[\"default\"];\nvar progress_tp_1 = __webpack_require__(/*! ./progress.tp */ \"./app/template/progress.tp\");\nexports.progress = progress_tp_1[\"default\"];\nvar cover_tp_1 = __webpack_require__(/*! ./cover.tp */ \"./app/template/cover.tp\");\nexports.cover = cover_tp_1[\"default\"];\n\n\n//# sourceURL=webpack:///./app/template/index.ts?");

/***/ }),

/***/ "./app/template/pause.tp":
/*!*******************************!*\
  !*** ./app/template/pause.tp ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (func) {var parent = document.createElement(`div`);parent.innerHTML = `<svg width=\"140\" height=\"140\" viewBox=\"0 0 140 140\">\n  <path\n    fill=\"#e9e9e9\"\n    d=\"M 0 0 L 40 0 L 40 120 L 0 120 L 0 0 M 64 0 L 104 0 L 104 120 L 64 120\"></path>\n  <linearGradient id=\"StartShadow\" x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\">\n    <stop offset=\"5%\" stop-color=\"#f7f7f7\"></stop>\n    <stop offset=\"75%\" stop-color=\"#fafafa\"></stop>\n  </linearGradient>\n  <polygon points=\"40,120 55,120 55,10 40,0\" fill=\"url(#StartShadow)\"></polygon>\n  <polygon points=\"104,120 134,120 134,10 104,0\" fill=\"url(#StartShadow)\"></polygon>\n  <path\n    ref=\"pause\"\n    fill=\"#e9e9e9\"\n    d=\"M 0 0 L 104 0 L 104 120 L 0 120 L 0 0\"\n    style=\"opacity: 0; cursor: pointer;\"></path>\n</svg>`;if (typeof func == 'function') {return func({el: parent.childNodes[0]}, parent.childNodes[0].attributes)} else {return parent.childNodes[0]}});\n\n//# sourceURL=webpack:///./app/template/pause.tp?");

/***/ }),

/***/ "./app/template/play.tp":
/*!******************************!*\
  !*** ./app/template/play.tp ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (func) {var parent = document.createElement(`div`);parent.innerHTML = `<svg width=\"140\" height=\"140\" viewBox=\"0 0 140 140\">\n  <linearGradient id=\"StartShadow\" x1=\"0\" y1=\"0\" x2=\"100%\" y2=\"100%\">\n    <stop offset=\"5%\" stop-color=\"#eee\"></stop>\n    <stop offset=\"65%\" stop-color=\"#fcfcfc\"></stop>\n  </linearGradient>\n  <polygon ref=\"play\" points=\"0,0 0,120 104,60\" fill=\"#e9e9e9\" style=\"cursor: pointer;\"></polygon>\n  <polygon points=\"0,120 45,140 140,85 104,60\" fill=\"url(#StartShadow)\"></polygon>\n</svg>`;if (typeof func == 'function') {return func({el: parent.childNodes[0]}, parent.childNodes[0].attributes)} else {return parent.childNodes[0]}});\n\n//# sourceURL=webpack:///./app/template/play.tp?");

/***/ }),

/***/ "./app/template/progress.tp":
/*!**********************************!*\
  !*** ./app/template/progress.tp ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (func) {var parent = document.createElement(`div`);parent.innerHTML = `<svg width=\"100%\" height=\"16\" style=\"opacity: 0.8; position: absolute; cursor: ew-resize; top: 0px; left: 0px;\">\n  <rect width=\"100%\" height=\"6\" fill=\"none\"></rect>\n  <rect ref=\"buffer\" width=\"20\" height=\"6\" fill=\"#eee\"></rect>\n  <rect ref=\"progress\" width=\"20\" height=\"6\" fill=\"red\"></rect>\n</svg>`;if (typeof func == 'function') {return func({el: parent.childNodes[0]}, parent.childNodes[0].attributes)} else {return parent.childNodes[0]}});\n\n//# sourceURL=webpack:///./app/template/progress.tp?");

/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar _1 = __webpack_require__(/*! ./app/helper/ */ \"./app/helper/index.ts\");\nvar index_1 = __webpack_require__(/*! ./app/index */ \"./app/index.ts\");\nvar demo = new index_1.LiesAudioTemplate;\nvar _a = demo.play(), demoPlayEl = _a.el, demoPlay = _a.play;\nvar _b = demo.pause(), demoPauseEl = _b.el, demoPause = _b.pause;\nvar demoCoverEl = demo.cover().el;\nvar _c = demo.progress(), demoProgressEl = _c.el, demoBuffer = _c.buffer, demoProgress = _c.progress;\nvar demoAudio = new index_1.LiesAudio;\ndemoAudio.setSong('./demo.mp3');\nvar demoState = { inf: 12, current: 2 };\n_1.Transition(demoBuffer, demoState);\ndemoAudio.listen('timeupdate', function (e) {\n    demoState.inf = demoAudio.buffered();\n    var duration = demoAudio.currentTime() * 100 / demoAudio.duration();\n    demoProgress.setAttribute('width', duration + \"%\");\n});\ndemoPlay.addEventListener('click', function () {\n    demoAudio.play();\n});\ndemoPause.addEventListener('click', function () {\n    demoAudio.pause();\n});\nvar progressId = document.querySelector('#progress');\nvar playId = document.querySelector('#start');\nvar pauseId = document.querySelector('#pause');\nvar coverId = document.querySelector('#cover');\nplayId.appendChild(demoPlayEl);\npauseId.appendChild(demoPauseEl);\nprogressId.parentNode.replaceChild(demoProgressEl, progressId);\ncoverId.parentNode.replaceChild(demoCoverEl, coverId);\ndemoCoverEl.setAttribute('width', 150);\ndemoCoverEl.setAttribute('height', 150);\ndemoPlayEl.setAttribute('width', 100);\ndemoPlayEl.setAttribute('height', 100);\ndemoPauseEl.setAttribute('width', 100);\ndemoPauseEl.setAttribute('height', 100);\n\n\n//# sourceURL=webpack:///./main.ts?");

/***/ })

/******/ });