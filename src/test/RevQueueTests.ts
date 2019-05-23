// tslint:disable:no-magic-numbers no-console completed-docs max-line-length

import { RevQueue } from '../RevQueue';
import { ReverseMethod } from '../Shared';
import { PriorityRevQueue } from '../PriorityRevQueue';

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
  [key: string]: string | number;
  constructor(
    method: ReverseMethod,
    passedBasicIO: boolean,
    performance?: PerfCounter
  ) {
    this[TableHeaders.Name] = ReverseMethod[method];
    this[TableHeaders.BasicIO] = (passedBasicIO ? 'Passed' : 'Failed');
    this[TableHeaders.ReversePerformance] = performance ? performance.value : -1;
  }
}

class PerformanceTestResult {
  [key: string]: string | number;
  constructor(
    method: string,
    itemCount: number,
    enqueueTime: number,
    dequeueTime: number,
    mixedTime: number
  ) {
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
  public readonly reversalTests: Array<ReversalTestResult> = [];
  public readonly performanceTests: Array<PerformanceTestResult> = [];

  public OuputResults(): void {
    console.group('Basic IO');
    console.table(this.reversalTests);
    console.groupEnd();

    console.group('Performance');
    console.table(this.performanceTests);
    console.groupEnd();
  }
}

class PerfCounter {
  public value: number = 0;
  private startTick: number = 0;

  public start(): void { this.startTick = window.performance.now(); }
  public stop(): void { this.value = window.performance.now() - this.startTick; }
}

const EnumToArray = <TEnum>(enumeration: any): Array<TEnum> => {
  return Object.keys(enumeration)
    .map((key) => enumeration[key])
    .filter((v) => typeof v === 'number');
};

class RevQueueTests {
  private readonly reverseMethods: Array<ReverseMethod> = EnumToArray<ReverseMethod>(ReverseMethod);

  private results = new TestingResults();

  public RunTests(): void {
    const fastestAlgo: { method?: ReverseMethod, perf?: PerfCounter } = {};
    this.reverseMethods.forEach((rMethod) => {
      let passed = false;
      let methodPerf: PerfCounter | undefined;
      try {
        console.log(`Testing ${ReverseMethod[rMethod]} Viability`);
        // Test basic functionality
        this.TestBasicIO(rMethod);
        // Test performance
        methodPerf = this.TestReversalMethodTime(rMethod);
        // Mark passed
        passed = true;
        // Fastest?
        if (fastestAlgo.perf === undefined || methodPerf.value < fastestAlgo.perf.value) {
          fastestAlgo.method = rMethod;
          fastestAlgo.perf = methodPerf;
        }
      } catch (ex) {
        passed = false;
        console.exception(ex);
      }
      this.results.reversalTests.push(new ReversalTestResult(rMethod, passed, methodPerf));
    });
    // Ensure at least one method passed
    if (fastestAlgo.method === undefined) { return; }

    // Use fastest mode for methodology tests
    RevQueue.reverseMethod = fastestAlgo.method;

    // Test performance
    for (let p = 15; p <= 18; p++) { this.TestMethodologies(2 ** p); }

    this.results.OuputResults();
  }

  private TestBasicIO(mode: ReverseMethod): void {
    // Set the mode
    RevQueue.reverseMethod = mode;

    // Static test
    const queue = new RevQueue<number>();
    queue
      .enqueue(1)
      .enqueue(2)
      .enqueue(3);

    if (queue.length < 3) { throw new Error('Expected size of 3'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected dequeue of 1'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected dequeue of 2'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected dequeue of 3'); }
    if (queue.length > 0) { throw new Error('Expected size of 0'); }

    // Fill and drain test
    for (let i = 0; i < 1000000; ++i) { queue.enqueue(i); }
    for (let i = 0; i < 1000000; ++i) {
      const v = queue.dequeue();
      if (v !== i) { throw new Error(`Expected dequeue of ${i}, got ${v} `); }
    }
  }

  /**
   * Populates a RevQueue with thousands of items then causes the queue
   * to reverse itself several times.
   */
  private TestReversalMethodTime(mode: ReverseMethod): PerfCounter {
    const prevMode = RevQueue.reverseMethod;
    const queue = new RevQueue<number>();
    const perf = new PerfCounter();

    // Start the clock
    perf.start();

    // Set the mode
    RevQueue.reverseMethod = mode;

    // Fill
    for (let i = 0; i < ReverseMethodPerformanceItemCount; ++i) { queue.enqueue(i); }

    // Reverse
    for (let i = 0; i < ReverseMethodPerformanceReversalCount; ++i) {
      // Move the head of the queue to the tail of the queue
      // This will cause one reversal the first time around the loop
      // and two reversals from that point on.
      queue.enqueue(queue.dequeue());
    }

    // Stop the clock
    perf.stop();

    // Reset mode
    RevQueue.reverseMethod = prevMode;

    return perf;
  }

  /**
   * Tests a RevQueue vs Shift vs Unshift
   */
  private TestMethodologies(maxItems: number): void {
    const revQueue = new RevQueue<number>();
    const shiftyArray: Array<number> = [];
    const unshiftyArray: Array<number> = [];
    const counters = {
      insertion: new PerfCounter(),
      mixed: new PerfCounter(),
      removal: new PerfCounter()
    };
    const methodoligies = [
      { name: 'RevQueue', enqueue: (v: number): any => revQueue.enqueue(v), dequeue: () => revQueue.dequeue() },
      { name: 'Shift + Push', enqueue: (v: number): any => shiftyArray.push(v), dequeue: () => shiftyArray.shift() },
      { name: 'Unshift + Pop', enqueue: (v: number): any => unshiftyArray.unshift(v), dequeue: () => unshiftyArray.pop() }
    ];

    console.log(`Testing Queue Methodoligies with ${maxItems} items...`);
    methodoligies.forEach((queue) => {
      counters.insertion.start();
      for (let i = 0; i < maxItems; ++i) { queue.enqueue(12); }
      counters.insertion.stop();

      counters.removal.start();
      for (let i = 0; i < maxItems; ++i) { queue.dequeue(); }
      counters.removal.stop();

      counters.mixed.start();
      for (let i = 0; i < maxItems; ++i) {
        let eq = 0;
        let dq = 0;
        let count = 0;
        // Enqueue 10, dequeue 4, repeat until >= 100 items, dequeue 100
        if (count >= 100) {
          while (count-- > 0) { queue.dequeue(); }
          eq = 0;
          dq = 0;
        }
        else if (eq < 10) {
          queue.enqueue(12);
          eq++;
          count++;
        } else if (dq < 4) {
          queue.dequeue();
          dq++;
          count--;
        } else {
          i--;
          eq = 0;
          dq = 0;
        }
      }
      counters.mixed.stop();

      this.results.performanceTests.push(new PerformanceTestResult(
        queue.name,
        maxItems,
        counters.insertion.value,
        counters.removal.value,
        counters.mixed.value
      ));
    });

  }
}

class PriorityQueueTests {
  public RunTests(): void {
    this.TestSamePriority();
    this.TestIncreasingPriority();
    this.TestMixedPriority();
    this.TestComplex();
    console.log('All Tests Passed');
  }

  private TestSamePriority(): void {
    console.log('Testing Same Priority');
    const queue = new PriorityRevQueue<number>();
    queue.enqueue(1, 1)
      .enqueue(2, 1)
      .enqueue(3, 1)
      .enqueue(4, 1);
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
  }

  private TestIncreasingPriority(): void {
    console.log('Testing Increasing Priority');
    const queue = new PriorityRevQueue<number>();
    queue.enqueue(1, 10)
      .enqueue(2, 20)
      .enqueue(3, 30)
      .enqueue(4, 40);
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
  }

  private TestMixedPriority(): void {
    console.log('Testing Mixed Priority');
    const queue = new PriorityRevQueue<number>();
    queue.enqueue(1, 50)
      .enqueue(2, 100)
      .enqueue(3, 49)
      .enqueue(4, 101);
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
  }

  private TestComplex(): void {
    console.log('Testing Mixed Priority + Mixed Operations');
    const queue = new PriorityRevQueue<number>();
    queue.enqueue(1, 50)
      .enqueue(2, 100)
      .enqueue(3, 49)
      .enqueue(4, 101);
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
    queue.enqueue(5, 1);
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
    queue.enqueue(6, 50);
    queue.enqueue(7, 2);
    if (queue.dequeue() !== 6) { throw new Error('Expected Dequeue of 6'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
    if (queue.dequeue() !== 7) { throw new Error('Expected Dequeue of 7'); }
    if (queue.dequeue() !== 5) { throw new Error('Expected Dequeue of 5'); }

  }

}

export function Run(testFlag: number) {

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
