(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RevQueue"] = factory();
	else
		root["RevQueue"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/PriorityRevQueue.ts":
/*!*********************************!*\
  !*** ./src/PriorityRevQueue.ts ***!
  \*********************************/
/*! exports provided: PriorityRevQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityRevQueue", function() { return PriorityRevQueue; });
/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");

class PriorityRevQueue extends _Shared__WEBPACK_IMPORTED_MODULE_0__["QueueBase"] {
    constructor() {
        super(...arguments);
        this.isReversed = false;
    }
    enqueue(item, priority) {
        if (this.isReversed) {
            this.items.setDirection(1);
            this.isReversed = false;
        }
        this.items.push({ item, priority });
        return this;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Invalid Operation: Can not dequeue from empty queue');
        }
        if (!this.isReversed) {
            this.items.setDirection(0);
            this.items.sort(PriorityRevQueue.compareNodePriority);
            this.isReversed = true;
        }
        return this.items.pop().item;
    }
}
PriorityRevQueue.compareNodePriority = (a, b) => a.priority - b.priority;


/***/ }),

/***/ "./src/RevQueue.ts":
/*!*************************!*\
  !*** ./src/RevQueue.ts ***!
  \*************************/
/*! exports provided: RevQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevQueue", function() { return RevQueue; });
/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");

class RevQueue extends _Shared__WEBPACK_IMPORTED_MODULE_0__["QueueBase"] {
    enqueue(item) {
        this.items
            .setDirection(1, RevQueue.reverseMethod)
            .push(item);
        return this;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Invalid Operation: Can not dequeue from an empty queue.');
        }
        return this.items
            .setDirection(0, RevQueue.reverseMethod)
            .pop();
    }
}
RevQueue.reverseMethod = _Shared__WEBPACK_IMPORTED_MODULE_0__["ReverseMethod"].Native;


/***/ }),

/***/ "./src/Shared.ts":
/*!***********************!*\
  !*** ./src/Shared.ts ***!
  \***********************/
/*! exports provided: ReverseMethod, QueueBase, ReversableArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReverseMethod", function() { return ReverseMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueBase", function() { return QueueBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversableArray", function() { return ReversableArray; });
var ReverseMethod;
(function (ReverseMethod) {
    ReverseMethod[ReverseMethod["Native"] = 0] = "Native";
    ReverseMethod[ReverseMethod["SlicedPush"] = 1] = "SlicedPush";
    ReverseMethod[ReverseMethod["PushPop"] = 2] = "PushPop";
    ReverseMethod[ReverseMethod["MirrorSwap"] = 3] = "MirrorSwap";
})(ReverseMethod || (ReverseMethod = {}));
class QueueBase {
    constructor() {
        this.items = new ReversableArray();
    }
    get length() {
        return this.items.length();
    }
    clear() {
        this.items.clear();
    }
    isEmpty() {
        return this.items.length() === 0;
    }
}
class ReversableArray {
    constructor() {
        this.backingArray = [];
        this.isReversed = 1;
    }
    clear() {
        this.backingArray.length = 0;
    }
    length() {
        return this.backingArray.length;
    }
    pop() {
        return this.backingArray.pop();
    }
    push(item) {
        this.backingArray.push(item);
    }
    sort(compareFn) {
        this.backingArray.sort(compareFn);
        return this;
    }
    setDirection(reversed, mode = ReverseMethod.Native) {
        if (reversed !== this.isReversed) {
            this.isReversed = reversed;
            switch (mode) {
                case ReverseMethod.Native:
                    this.backingArray.reverse();
                    break;
                case ReverseMethod.SlicedPush:
                    {
                        let idx = this.backingArray.length - 2;
                        while (idx > -1) {
                            this.backingArray.push(this.backingArray[idx]);
                            this.backingArray.splice(idx--, 1);
                        }
                    }
                    break;
                case ReverseMethod.PushPop:
                    {
                        let len = this.backingArray.length;
                        const newArray = new Array(len);
                        let idx = 0;
                        while (len--) {
                            newArray[idx++] = this.backingArray.pop();
                        }
                        this.backingArray = newArray;
                    }
                    break;
                case ReverseMethod.MirrorSwap:
                    const last = this.backingArray.length - 1;
                    const halfLen = last / 2;
                    let tmp;
                    for (let idx = 0; idx <= halfLen; idx++) {
                        tmp = this.backingArray[idx];
                        this.backingArray[idx] = this.backingArray[last - idx];
                        this.backingArray[last - idx] = tmp;
                    }
                    break;
                default:
                    throw new Error('Unsupported Reverse Mode');
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: RevQueue, PriorityQueue, ReverseMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RevQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RevQueue */ "./src/RevQueue.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RevQueue", function() { return _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]; });

/* harmony import */ var _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PriorityRevQueue */ "./src/PriorityRevQueue.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PriorityQueue", function() { return _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_1__["PriorityRevQueue"]; });

/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReverseMethod", function() { return _Shared__WEBPACK_IMPORTED_MODULE_2__["ReverseMethod"]; });






/***/ })

/******/ });
});
//# sourceMappingURL=RevQueue.js.map