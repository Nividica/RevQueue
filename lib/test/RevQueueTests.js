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
            this.items.setDirection(0);
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
            this.items.setDirection(1);
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
            .setDirection(0, RevQueue.reverseMethod)
            .push(item);
        return this;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Invalid Operation: Can not dequeue from an empty queue.');
        }
        return this.items
            .setDirection(1, RevQueue.reverseMethod)
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
    ReverseMethod[ReverseMethod["PushPop"] = 1] = "PushPop";
    ReverseMethod[ReverseMethod["MirrorSwap"] = 2] = "MirrorSwap";
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
    peek() {
        return this.items.peek();
    }
}
class ReversableArray {
    constructor() {
        this.backingArray = [];
        this.isReversed = 0;
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
    peek() {
        return (this.backingArray.length === 0)
            ? undefined
            : this.backingArray[(this.isReversed === 0 ? 0 : this.backingArray.length - 1)];
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
                    let right = this.backingArray.length - 1;
                    let left = 0;
                    let tmp;
                    while (left < right) {
                        tmp = this.backingArray[left];
                        this.backingArray[left] = this.backingArray[right];
                        this.backingArray[right] = tmp;
                        ++left;
                        --right;
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
/* harmony import */ var _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PriorityRevQueue */ "./src/PriorityRevQueue.ts");



const ReverseMethodPerformanceItemCount = 1000000;
const ReverseMethodPerformanceReversalCount = 100;
const TableHeaders = {
    BasicIO: 'Basic IO',
    DequeueTime: 'Dequeue Time(ms)',
    DequeueTimePerItem: 'Dequeue Time Per Item(µs)',
    EnqueueTime: 'Enqueue Time(ms)',
    EnqueueTimePerItem: 'Enqueue Time Per Item(µs)',
    ItemCount: 'Item Count',
    MixedTime: 'Mixed Time(ms)',
    MixedTimePerItem: 'Mixed Time Per Item(µs)',
    Name: 'Reversal Method',
    QueueImplementation: 'Queue Implementation',
    ReversePerformance: `Time to reverse ${ReverseMethodPerformanceItemCount.toLocaleString()} items ${ReverseMethodPerformanceReversalCount.toLocaleString()} times(ms)`,
    TotalTime: 'Total Time(ms)',
    TotalTimePerItem: 'Total Time Per Item(µs)'
};
class ReversalTestResult {
    constructor(method, passedBasicIO, performance) {
        this[TableHeaders.Name] = _Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"][method];
        this[TableHeaders.BasicIO] = (passedBasicIO ? 'Passed' : 'Failed');
        this[TableHeaders.ReversePerformance] = performance ? performance.value : -1;
    }
}
class PerformanceTestResult {
    constructor(method, itemCount, enqueueTime, dequeueTime, mixedTime) {
        this[TableHeaders.QueueImplementation] = method;
        this[TableHeaders.ItemCount] = itemCount;
        this[TableHeaders.EnqueueTime] = enqueueTime;
        this[TableHeaders.EnqueueTimePerItem] = (enqueueTime / itemCount) * 1000;
        this[TableHeaders.DequeueTime] = dequeueTime;
        this[TableHeaders.DequeueTimePerItem] = (dequeueTime / itemCount) * 1000;
        this[TableHeaders.MixedTime] = mixedTime;
        this[TableHeaders.MixedTimePerItem] = (mixedTime / itemCount) * 1000;
        this[TableHeaders.TotalTime] = (enqueueTime + dequeueTime + mixedTime);
        this[TableHeaders.TotalTimePerItem] = ((enqueueTime + dequeueTime + mixedTime) / itemCount) * 1000;
    }
}
class TestingResults {
    constructor() {
        this.reversalTests = [];
        this.performanceTests = [];
    }
    OuputResults() {
        console.group('Basic IO');
        console.table(this.reversalTests);
        console.groupEnd();
        console.group('Performance');
        console.table(this.performanceTests);
        console.groupEnd();
    }
}
class PerfCounter {
    constructor() {
        this.value = 0;
        this.startTick = 0;
    }
    start() { this.startTick = window.performance.now(); }
    stop() { this.value = window.performance.now() - this.startTick; }
}
const EnumToArray = (enumeration) => {
    return Object.keys(enumeration)
        .map((key) => enumeration[key])
        .filter((v) => typeof v === 'number');
};
class RevQueueTests {
    constructor() {
        this.reverseMethods = EnumToArray(_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"]);
        this.results = new TestingResults();
    }
    RunTests() {
        const fastestAlgo = {};
        this.reverseMethods.forEach((rMethod) => {
            let passed = false;
            let methodPerf;
            try {
                console.log(`Testing ${_Shared__WEBPACK_IMPORTED_MODULE_1__["ReverseMethod"][rMethod]} Viability`);
                this.TestBasicIO(rMethod);
                methodPerf = this.TestReversalMethodTime(rMethod);
                passed = true;
                if (fastestAlgo.perf === undefined || methodPerf.value < fastestAlgo.perf.value) {
                    fastestAlgo.method = rMethod;
                    fastestAlgo.perf = methodPerf;
                }
            }
            catch (ex) {
                passed = false;
                console.exception(ex);
            }
            this.results.reversalTests.push(new ReversalTestResult(rMethod, passed, methodPerf));
        });
        if (fastestAlgo.method === undefined) {
            return;
        }
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = fastestAlgo.method;
        for (let p = 15; p <= 18; p++) {
            this.TestMethodologies(Math.pow(2, p));
        }
        this.results.OuputResults();
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
        for (let i = 0; i < 1000000; ++i) {
            queue.enqueue(i);
        }
        for (let i = 0; i < 1000000; ++i) {
            const v = queue.dequeue();
            if (v !== i) {
                throw new Error(`Expected dequeue of ${i}, got ${v} `);
            }
        }
    }
    TestReversalMethodTime(mode) {
        const prevMode = _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod;
        const queue = new _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]();
        const perf = new PerfCounter();
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = mode;
        for (let i = 0; i < ReverseMethodPerformanceItemCount; ++i) {
            queue.enqueue(i);
        }
        perf.start();
        for (let i = 0; i < ReverseMethodPerformanceReversalCount; ++i) {
            queue.enqueue(queue.dequeue());
        }
        perf.stop();
        _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"].reverseMethod = prevMode;
        return perf;
    }
    TestMethodologies(maxItems) {
        const revQueue = new _RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]();
        const shiftyArray = [];
        const unshiftyArray = [];
        const counters = {
            insertion: new PerfCounter(),
            mixed: new PerfCounter(),
            removal: new PerfCounter()
        };
        const methodoligies = [
            { name: 'RevQueue', enqueue: (v) => revQueue.enqueue(v), dequeue: () => revQueue.dequeue() },
            { name: 'Shift + Push', enqueue: (v) => shiftyArray.push(v), dequeue: () => shiftyArray.shift() },
            { name: 'Unshift + Pop', enqueue: (v) => unshiftyArray.unshift(v), dequeue: () => unshiftyArray.pop() }
        ];
        console.log(`Testing Queue Methodoligies with ${maxItems} items...`);
        methodoligies.forEach((queue) => {
            counters.insertion.start();
            for (let i = 0; i < maxItems; ++i) {
                queue.enqueue(12);
            }
            counters.insertion.stop();
            counters.removal.start();
            for (let i = 0; i < maxItems; ++i) {
                queue.dequeue();
            }
            counters.removal.stop();
            counters.mixed.start();
            for (let i = 0; i < maxItems; ++i) {
                let eq = 0;
                let dq = 0;
                let count = 0;
                if (count >= 100) {
                    while (count-- > 0) {
                        queue.dequeue();
                    }
                    eq = 0;
                    dq = 0;
                }
                else if (eq < 10) {
                    queue.enqueue(12);
                    eq++;
                    count++;
                }
                else if (dq < 4) {
                    queue.dequeue();
                    dq++;
                    count--;
                }
                else {
                    i--;
                    eq = 0;
                    dq = 0;
                }
            }
            counters.mixed.stop();
            this.results.performanceTests.push(new PerformanceTestResult(queue.name, maxItems, counters.insertion.value, counters.removal.value, counters.mixed.value));
        });
    }
}
class PriorityQueueTests {
    RunTests() {
        this.TestSamePriority();
        this.TestIncreasingPriority();
        this.TestMixedPriority();
        this.TestComplex();
        console.log('All Tests Passed');
    }
    TestSamePriority() {
        console.log('Testing Same Priority');
        const queue = new _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityRevQueue"]();
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
    }
    TestIncreasingPriority() {
        console.log('Testing Increasing Priority');
        const queue = new _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityRevQueue"]();
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
    }
    TestMixedPriority() {
        console.log('Testing Mixed Priority');
        const queue = new _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityRevQueue"]();
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
    }
    TestComplex() {
        console.log('Testing Mixed Priority + Mixed Operations');
        const queue = new _PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityRevQueue"]();
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
function Run(testFlag) {
    if (testFlag & 1) {
        console.group('RevQueue Tests');
        (new RevQueueTests()).RunTests();
        console.groupEnd();
    }
    if (testFlag & 2) {
        console.group('PriorityRevQueue Tests');
        (new PriorityQueueTests()).RunTests();
        console.groupEnd();
    }
}
console.info(_RevQueue__WEBPACK_IMPORTED_MODULE_0__["RevQueue"]);
console.info(_PriorityRevQueue__WEBPACK_IMPORTED_MODULE_2__["PriorityRevQueue"]);


/***/ })

/******/ });
});
//# sourceMappingURL=RevQueueTests.js.map