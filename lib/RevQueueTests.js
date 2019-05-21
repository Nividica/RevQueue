(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RevQueueTests"] = factory();
	else
		root["RevQueueTests"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/test/RevQueueTests.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/PriorityQueue.ts":
/*!******************************!*\
  !*** ./src/PriorityQueue.ts ***!
  \******************************/
/*! exports provided: PriorityQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriorityQueue", function() { return PriorityQueue; });
/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shared */ "./src/Shared.ts");

class PriorityQueue extends _Shared__WEBPACK_IMPORTED_MODULE_0__["QueueBase"] {
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
            this.items.sort(PriorityQueue.compareNodePriority);
            this.isReversed = true;
        }
        return this.items.pop().item;
    }
}
PriorityQueue.compareNodePriority = (a, b) => a.priority - b.priority;


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
                default:
                    throw new Error('Unsupported Reverse Mode');
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./src/test/RevQueueTests.ts":
/*!***********************************!*\
  !*** ./src/test/RevQueueTests.ts ***!
  \***********************************/
/*! exports provided: Run */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Run", function() { return Run; });
/* harmony import */ var _RevQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RevQueue */ "./src/RevQueue.ts");
/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Shared */ "./src/Shared.ts");
/* harmony import */ var _PriorityQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PriorityQueue */ "./src/PriorityQueue.ts");



class PerfCounter {
    constructor(name) {
        this.name = name;
        this.value = 0;
        this.startTick = 0;
    }
    start() { this.startTick = window.performance.now(); }
    stop() { this.value = window.performance.now() - this.startTick; }
    addValues(other) {
        return this.value + other.value;
    }
}
class ReverseModeMetric {
    constructor(mode) {
        this.mode = mode;
        this.time = 0;
    }
}
class MethodologyCounterSet {
    constructor() {
        this.revQueue = new PerfCounter('RevQueue');
        this.shifty = new PerfCounter('Shifting');
        this.unshifty = new PerfCounter('Unshifting');
    }
    addTo(other) {
        const added = new MethodologyCounterSet();
        added.revQueue.value = this.revQueue.addValues(other.revQueue);
        added.shifty.value = this.shifty.addValues(other.shifty);
        added.unshifty.value = this.unshifty.addValues(other.unshifty);
        return added;
    }
}
const EnumToArray = (enumeration) => {
    return Object.keys(enumeration)
        .map((key) => enumeration[key])
        .filter((v) => typeof v === 'number');
};
class RevQueueTests {
    constructor() {
        this.verdicts = [];
        this.reverseModes = EnumToArray(_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"]);
        this.fastestMode = _Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"].Native;
    }
    RunTests() {
        console.log('Testing basic operations');
        this.reverseModes.forEach((mode) => this.TestBasicIO(mode));
        this.TestReverseModePerformance();
        setTimeout(() => {
            _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = this.fastestMode;
            for (let p = 4; p <= 17; p++) {
                this.TestMethodology(Math.pow(2, p));
            }
            console.log(this.verdicts);
        }, 500);
    }
    TestBasicIO(mode) {
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = mode;
        const queue = new _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]();
        queue
            .enqueue(1)
            .enqueue(2)
            .enqueue(3);
        if (queue.length < 3) {
            throw new Error('Expected size of 3');
        }
        if (queue.dequeue() !== 1) {
            throw new Error('Expected dequeue of 1');
        }
        if (queue.dequeue() !== 2) {
            throw new Error('Expected dequeue of 2');
        }
        if (queue.dequeue() !== 3) {
            throw new Error('Expected dequeue of 3');
        }
        if (queue.length > 0) {
            throw new Error('Expected size of 0');
        }
        for (let i = 0; i < 100; ++i) {
            queue.enqueue(i);
        }
        for (let i = 0; i < 100; ++i) {
            const v = queue.dequeue();
            if (v !== i) {
                throw new Error(`Expected dequeue of ${i}, got ${v}`);
            }
        }
        this.verdicts.push(`Basic IO(${_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"][mode]}) passed`);
    }
    TestReverseModePerformance() {
        const metrics = this.reverseModes.map((mode) => new ReverseModeMetric(mode));
        metrics.forEach((m) => m.time = this.DetermineReversalTime(m.mode).value);
        this.fastestMode = metrics.reduce((p, c) => (p.time < c.time) ? p : c).mode;
        this.verdicts.push(`Fastest reversing mode: ${_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"][this.fastestMode]}`);
    }
    DetermineReversalTime(mode) {
        console.groupCollapsed(`Reverse Mode: ${_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"][mode]}`);
        const prevMode = _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod;
        const queue = new _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]();
        const itemCount = 10000;
        const reverseCount = 25;
        const perf = new PerfCounter('');
        perf.start();
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = mode;
        for (let i = 0; i < itemCount; ++i) {
            queue.enqueue(i);
        }
        for (let i = 0; i < reverseCount; ++i) {
            queue.enqueue(queue.dequeue());
        }
        perf.stop();
        console.log(`Time: ${perf.value} ms`);
        console.groupEnd();
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = prevMode;
        return perf;
    }
    TestMethodology(maxItems) {
        const revQueue = new _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]();
        const shiftyArray = [];
        const unshiftyArray = [];
        const counters = {
            Insertion: new MethodologyCounterSet(),
            Random: new MethodologyCounterSet(),
            Removal: new MethodologyCounterSet()
        };
        console.groupCollapsed(`Performance::${maxItems}`);
        counters.Insertion.revQueue.start();
        for (let i = 0; i < maxItems; ++i) {
            revQueue.enqueue(12);
        }
        counters.Insertion.revQueue.stop();
        counters.Insertion.shifty.start();
        for (let i = 0; i < maxItems; ++i) {
            shiftyArray.push(12);
        }
        counters.Insertion.shifty.stop();
        counters.Insertion.unshifty.start();
        for (let i = 0; i < maxItems; ++i) {
            unshiftyArray.unshift(12);
        }
        counters.Insertion.unshifty.stop();
        this.DumpCounters(`Insertion(${maxItems})`, counters.Insertion);
        counters.Removal.revQueue.start();
        for (let i = 0; i < maxItems; ++i) {
            revQueue.dequeue();
        }
        counters.Removal.revQueue.stop();
        counters.Removal.shifty.start();
        for (let i = 0; i < maxItems; ++i) {
            shiftyArray.shift();
        }
        counters.Removal.shifty.stop();
        counters.Removal.unshifty.start();
        for (let i = 0; i < maxItems; ++i) {
            unshiftyArray.pop();
        }
        counters.Removal.unshifty.stop();
        this.DumpCounters(`Removal(${maxItems})`, counters.Removal);
        counters.Random.revQueue.start();
        for (let i = 0; i < maxItems; ++i) {
            if ((revQueue.length > 0) && (Math.random() > 0.5)) {
                revQueue.dequeue();
            }
            else {
                revQueue.enqueue(12);
            }
        }
        counters.Random.revQueue.stop();
        counters.Random.shifty.start();
        for (let i = 0; i < maxItems; ++i) {
            if ((shiftyArray.length > 0) && (Math.random() > 0.5)) {
                shiftyArray.shift();
            }
            else {
                shiftyArray.push(12);
            }
        }
        counters.Random.shifty.stop();
        counters.Random.unshifty.start();
        for (let i = 0; i < maxItems; ++i) {
            if ((unshiftyArray.length > 0) && (Math.random() > 0.5)) {
                unshiftyArray.pop();
            }
            else {
                unshiftyArray.unshift(12);
            }
        }
        counters.Random.unshifty.stop();
        this.DumpCounters(`Random(${maxItems})`, counters.Random);
        const totals = counters.Insertion
            .addTo(counters.Removal)
            .addTo(counters.Random);
        this.DumpCounters(`All(${maxItems})`, totals);
        const rqSpeed = Math.floor(totals.revQueue.value);
        const otherFastest = Math.floor([totals.shifty, totals.unshifty]
            .reduce((p, c) => (p.value < c.value) ? p : c).value);
        const diff = Math.abs(rqSpeed - otherFastest);
        this.verdicts.push(`RevQueue Performance, ${maxItems} items, ${rqSpeed} ms: ${otherFastest !== rqSpeed ? `${otherFastest < rqSpeed ? 'Slower' : 'Faster'} by ${diff} ms` : 'Even'}`);
        console.groupEnd();
    }
    DumpCounters(name, counters) {
        console.groupCollapsed(name);
        console.log(`RevQueue ${counters.revQueue.value.toFixed(2)} ms`);
        console.log(`Shifty ${counters.shifty.value.toFixed(2)} ms`);
        console.log(`Unshifty ${counters.unshifty.value.toFixed(2)} ms`);
        console.groupEnd();
    }
}
class PriorityQueueTests {
    RunTests() {
        const queue = new _PriorityQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityQueue"]();
        queue.enqueue(1, 1)
            .enqueue(2, 1)
            .enqueue(3, 1)
            .enqueue(4, 1);
        if (queue.dequeue() !== 1) {
            throw new Error('Expected Dequeue of 1');
        }
        if (queue.dequeue() !== 2) {
            throw new Error('Expected Dequeue of 2');
        }
        if (queue.dequeue() !== 3) {
            throw new Error('Expected Dequeue of 3');
        }
        if (queue.dequeue() !== 4) {
            throw new Error('Expected Dequeue of 4');
        }
        queue.enqueue(1, 10)
            .enqueue(2, 20)
            .enqueue(3, 30)
            .enqueue(4, 40);
        if (queue.dequeue() !== 4) {
            throw new Error('Expected Dequeue of 4');
        }
        if (queue.dequeue() !== 3) {
            throw new Error('Expected Dequeue of 3');
        }
        if (queue.dequeue() !== 2) {
            throw new Error('Expected Dequeue of 2');
        }
        if (queue.dequeue() !== 1) {
            throw new Error('Expected Dequeue of 1');
        }
        queue.enqueue(1, 50)
            .enqueue(2, 100)
            .enqueue(3, 49)
            .enqueue(4, 101);
        if (queue.dequeue() !== 4) {
            throw new Error('Expected Dequeue of 4');
        }
        if (queue.dequeue() !== 2) {
            throw new Error('Expected Dequeue of 2');
        }
        if (queue.dequeue() !== 1) {
            throw new Error('Expected Dequeue of 1');
        }
        if (queue.dequeue() !== 3) {
            throw new Error('Expected Dequeue of 3');
        }
        queue.enqueue(1, 50)
            .enqueue(2, 100)
            .enqueue(3, 49)
            .enqueue(4, 101);
        if (queue.dequeue() !== 4) {
            throw new Error('Expected Dequeue of 4');
        }
        queue.enqueue(5, 1);
        if (queue.dequeue() !== 2) {
            throw new Error('Expected Dequeue of 2');
        }
        if (queue.dequeue() !== 1) {
            throw new Error('Expected Dequeue of 1');
        }
        queue.enqueue(6, 50);
        queue.enqueue(7, 2);
        if (queue.dequeue() !== 6) {
            throw new Error('Expected Dequeue of 6');
        }
        if (queue.dequeue() !== 3) {
            throw new Error('Expected Dequeue of 3');
        }
        if (queue.dequeue() !== 7) {
            throw new Error('Expected Dequeue of 7');
        }
        if (queue.dequeue() !== 5) {
            throw new Error('Expected Dequeue of 5');
        }
    }
}
function Run() {
    if (false) {}
    (new PriorityQueueTests()).RunTests();
}


/***/ })

/******/ });
});
//# sourceMappingURL=RevQueueTests.js.map