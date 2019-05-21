// tslint:disable:no-magic-numbers no-console completed-docs

import { RevQueue } from '../RevQueue';
import { ReverseMethod } from '../Shared';
import { PriorityQueue } from '../PriorityQueue';

class PerfCounter {
  public value: number = 0;
  private startTick: number = 0;

  constructor(public readonly name: string) { }

  public start(): void { this.startTick = window.performance.now(); }
  public stop(): void { this.value = window.performance.now() - this.startTick; }
  public addValues(other: PerfCounter): number {
    return this.value + other.value;
  }
}

class ReverseModeMetric {
  public time: number = 0;
  constructor(public readonly mode: ReverseMethod) { }
}

class MethodologyCounterSet {
  public revQueue = new PerfCounter('RevQueue');
  public shifty = new PerfCounter('Shifting');
  public unshifty = new PerfCounter('Unshifting');

  public addTo(other: MethodologyCounterSet): MethodologyCounterSet {
    const added = new MethodologyCounterSet();
    added.revQueue.value = this.revQueue.addValues(other.revQueue);
    added.shifty.value = this.shifty.addValues(other.shifty);
    added.unshifty.value = this.unshifty.addValues(other.unshifty);

    return added;
  }
}

const EnumToArray = <TEnum>(enumeration: any): Array<TEnum> => {
  return Object.keys(enumeration)
    .map((key) => enumeration[key])
    .filter((v) => typeof v === 'number');
};

class RevQueueTests {
  private verdicts: Array<string> = [];
  private reverseModes: Array<ReverseMethod> = EnumToArray<ReverseMethod>(ReverseMethod);
  private fastestMode: ReverseMethod = ReverseMethod.Native;

  public RunTests(): void {
    // Test basic functionality
    console.log('Testing basic operations');
    this.reverseModes.forEach((mode) => this.TestBasicIO(mode));

    // Test reversing mode performance
    this.TestReverseModePerformance();

    // Timeout to give time back the environment
    setTimeout(() => {
      // Use fastest mode for methodology tests
      RevQueue.reverseMethod = this.fastestMode;
      for (let p = 4; p <= 17; p++) {
        this.TestMethodology(2 ** p);
      }

      console.log(this.verdicts);
    }, 500);
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
    for (let i = 0; i < 100; ++i) { queue.enqueue(i); }
    for (let i = 0; i < 100; ++i) {
      const v = queue.dequeue();
      if (v !== i) { throw new Error(`Expected dequeue of ${i}, got ${v}`); }
    }

    this.verdicts.push(`Basic IO(${ReverseMethod[mode]}) passed`);
  }

  private TestReverseModePerformance(): void {
    const metrics: Array<ReverseModeMetric>
      = this.reverseModes.map((mode) => new ReverseModeMetric(mode));

    // Run tests
    metrics.forEach((m) => m.time = this.DetermineReversalTime(m.mode).value);

    // Set mode to fastest
    this.fastestMode = metrics.reduce((p, c) => (p.time < c.time) ? p : c).mode;

    // Build verdict
    this.verdicts.push(`Fastest reversing mode: ${ReverseMethod[this.fastestMode]}`);
  }

  /**
   * Populates a RevQueue with thousands of items then causes the queue
   * to reverse itself several times.
   */
  private DetermineReversalTime(mode: ReverseMethod): PerfCounter {
    console.groupCollapsed(`Reverse Mode: ${ReverseMethod[mode]}`);
    const prevMode = RevQueue.reverseMethod;
    const queue = new RevQueue<number>();
    const itemCount = 10000;
    const reverseCount = 25;
    const perf = new PerfCounter('');

    // Start the clock
    perf.start();

    // Set the mode
    RevQueue.reverseMethod = mode;

    // Fill
    for (let i = 0; i < itemCount; ++i) { queue.enqueue(i); }

    // Reverse
    for (let i = 0; i < reverseCount; ++i) {
      // Move the head of the queue to the tail of the queue
      queue.enqueue(queue.dequeue());
    }

    // Stop the clock
    perf.stop();

    // Log the time
    console.log(`Time: ${perf.value} ms`);
    console.groupEnd();

    // Reset mode
    RevQueue.reverseMethod = prevMode;

    return perf;
  }

  /**
   * Tests a RevQueue vs Shift vs Unshift
   */
  private TestMethodology(maxItems: number): void {
    const revQueue = new RevQueue<number>();
    const shiftyArray: Array<number> = [];
    const unshiftyArray: Array<number> = [];
    const counters = {
      Insertion: new MethodologyCounterSet(),
      Random: new MethodologyCounterSet(),
      Removal: new MethodologyCounterSet()
    };

    console.groupCollapsed(`Performance::${maxItems}`);

    counters.Insertion.revQueue.start();
    for (let i = 0; i < maxItems; ++i) { revQueue.enqueue(12); }
    counters.Insertion.revQueue.stop();

    counters.Insertion.shifty.start();
    for (let i = 0; i < maxItems; ++i) { shiftyArray.push(12); }
    counters.Insertion.shifty.stop();

    counters.Insertion.unshifty.start();
    for (let i = 0; i < maxItems; ++i) { unshiftyArray.unshift(12); }
    counters.Insertion.unshifty.stop();

    this.DumpCounters(`Insertion(${maxItems})`, counters.Insertion);

    counters.Removal.revQueue.start();
    for (let i = 0; i < maxItems; ++i) { revQueue.dequeue(); }
    counters.Removal.revQueue.stop();

    counters.Removal.shifty.start();
    for (let i = 0; i < maxItems; ++i) { shiftyArray.shift(); }
    counters.Removal.shifty.stop();

    counters.Removal.unshifty.start();
    for (let i = 0; i < maxItems; ++i) { unshiftyArray.pop(); }
    counters.Removal.unshifty.stop();

    this.DumpCounters(`Removal(${maxItems})`, counters.Removal);

    counters.Random.revQueue.start();
    for (let i = 0; i < maxItems; ++i) {
      if ((revQueue.length > 0) && (Math.random() > 0.5)) {
        revQueue.dequeue();
      } else {
        revQueue.enqueue(12);
      }
    }
    counters.Random.revQueue.stop();

    counters.Random.shifty.start();
    for (let i = 0; i < maxItems; ++i) {
      if ((shiftyArray.length > 0) && (Math.random() > 0.5)) {
        shiftyArray.shift();
      } else {
        shiftyArray.push(12);
      }
    }
    counters.Random.shifty.stop();

    counters.Random.unshifty.start();
    for (let i = 0; i < maxItems; ++i) {
      if ((unshiftyArray.length > 0) && (Math.random() > 0.5)) {
        unshiftyArray.pop();
      } else {
        unshiftyArray.unshift(12);
      }
    }
    counters.Random.unshifty.stop();

    this.DumpCounters(`Random(${maxItems})`, counters.Random);

    // Add up all
    const totals = counters.Insertion
      .addTo(counters.Removal)
      .addTo(counters.Random);

    this.DumpCounters(`All(${maxItems})`, totals);

    // Build verdict (whole ms)
    const rqSpeed = Math.floor(totals.revQueue.value);
    const otherFastest = Math.floor(
      [totals.shifty, totals.unshifty]
        .reduce((p, c) => (p.value < c.value) ? p : c).value
    );
    const diff = Math.abs(rqSpeed - otherFastest);
    // tslint:disable-next-line:max-line-length
    this.verdicts.push(`RevQueue Performance, ${maxItems} items, ${rqSpeed} ms: ${otherFastest !== rqSpeed ? `${otherFastest < rqSpeed ? 'Slower' : 'Faster'} by ${diff} ms` : 'Even'}`);

    console.groupEnd();
  }

  private DumpCounters(name: string, counters: MethodologyCounterSet): void {
    console.groupCollapsed(name);
    console.log(`RevQueue ${counters.revQueue.value.toFixed(2)} ms`);
    console.log(`Shifty ${counters.shifty.value.toFixed(2)} ms`);
    console.log(`Unshifty ${counters.unshifty.value.toFixed(2)} ms`);
    console.groupEnd();
  }
}

class PriorityQueueTests {
  public RunTests(): void {
    const queue = new PriorityQueue<number>();

    // Same priority
    queue.enqueue(1, 1)
      .enqueue(2, 1)
      .enqueue(3, 1)
      .enqueue(4, 1);
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }

    // Growing priority
    queue.enqueue(1, 10)
      .enqueue(2, 20)
      .enqueue(3, 30)
      .enqueue(4, 40);
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }

    // Mixed priority
    queue.enqueue(1, 50)
      .enqueue(2, 100)
      .enqueue(3, 49)
      .enqueue(4, 101);
    if (queue.dequeue() !== 4) { throw new Error('Expected Dequeue of 4'); }
    if (queue.dequeue() !== 2) { throw new Error('Expected Dequeue of 2'); }
    if (queue.dequeue() !== 1) { throw new Error('Expected Dequeue of 1'); }
    if (queue.dequeue() !== 3) { throw new Error('Expected Dequeue of 3'); }

    // Mixed priority + ops
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

    // const items: Array<{ item: number; priority: number }> = [];
    // for (let i = 0; i < 1000000; i++) {
    //   items.push({ item: i, priority: Math.floor(Math.random() * 10.0) });
    // }
    // items.sort((a, b) => a.priority - b.priority);
    // console.log(items);

  }
}

export function Run() {
  if (false) { (new RevQueueTests()).RunTests(); }
  (new PriorityQueueTests()).RunTests();
}
