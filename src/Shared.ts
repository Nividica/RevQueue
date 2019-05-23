/***
 * Author: Chris McGhee
 * Email: Nividica@gmail.com
 */

/**
 * Is the queue forwards or backwards
 *
 * This is relative to a `.push()` operation, the queue is
 * forward if no reversal is needed to push, the queue is
 * backwards if a reversal is needed before a push.
 */
export const enum QueueDirection {
  Forward = 0,
  Backward = 1
}

export enum ReverseMethod {
  /**
   * `Array.reverse()`
   */
  Native,
  /**
   * Copy items from a source array to a new array via
   * `new.push(source.pop())` then set `source = new`
   */
  PushPop,
  /**
   * Swaps each item in the array, starting with swapping the first
   * with the last, then the second with last -1, etc, until the middle
   * elements are swapped.
   */
  MirrorSwap
}

export class QueueBase<ItemType>{
  /**
   * Items in the queue
   */
  protected items = new ReversableArray<ItemType>();

  /**
   * Returns the number of items in the queue.
   */
  public get length(): number {
    return this.items.length();
  }

  /**
   * Remove all items from the queue.
   */
  public clear(): void {
    this.items.clear();
  }

  /**
   * True if the queue is empty
   */
  public isEmpty(): boolean {
    return this.items.length() === 0;
  }

  /**
   * Returns the next item that will be dequeued, or `undefined`
   * if the queue is empty.
   */
  public peek(): ItemType | undefined {
    return this.items.peek();
  }
}

/**
 * Tracks and mutates array reversal state.
 */
export class ReversableArray<ItemType>{
  /**
   * Holds the items
   */
  private backingArray: Array<ItemType> = [];

  /**
   * Last direction set via setDirection
   */
  private isReversed: QueueDirection = QueueDirection.Forward;

  /**
   * Remove all items
   */
  public clear(): void {
    this.backingArray.length = 0;
  }

  /**
   * Length of the array
   */
  public length(): number {
    return this.backingArray.length;
  }

  /**
   * Removes and returns the last element
   */
  public pop(): ItemType | undefined {
    return this.backingArray.pop();
  }

  /**
   * Adds item to end of array
   */
  public push(item: ItemType): void {
    this.backingArray.push(item);
  }

  /**
   * Returns the oldest(first added) item in the array.
   */
  public peek(): ItemType | undefined {
    return (this.backingArray.length === 0)
      ? undefined
      : this.backingArray[(this.isReversed === QueueDirection.Forward ? 0 : this.backingArray.length - 1)];
  }

  /**
   * Sorts the array
   */
  public sort(compareFn: (a: ItemType, b: ItemType) => number): this {
    this.backingArray.sort(compareFn);

    return this;
  }

  /**
   * Reverses the direction of the backing array if requied, and returns it.
   */
  public setDirection(reversed: QueueDirection, mode: ReverseMethod = ReverseMethod.Native): this {
    if (reversed !== this.isReversed) {
      this.isReversed = reversed;
      switch (mode) {
        // Reverse using the native JS Array method
        case ReverseMethod.Native:
          this.backingArray.reverse();
          break;

        // Pop from current array, set in new array
        case ReverseMethod.PushPop:
          {
            let len = this.backingArray.length;
            // Pre allocate new array
            const newArray = new Array<ItemType>(len);
            let idx = 0;
            while (len--) { newArray[idx++] = (this.backingArray.pop() as ItemType); }
            this.backingArray = newArray;
          }
          break;

        // Swap first <-> last inward to the middle element(s)
        case ReverseMethod.MirrorSwap:
          // Index of the element on the right to swap
          let right = this.backingArray.length - 1;
          // Index of the element on the left to swap
          let left = 0;
          let tmp: ItemType;
          while (left < right) {
            // Store left
            tmp = this.backingArray[left];
            // Swap right into left
            this.backingArray[left] = this.backingArray[right];
            // Swap left into right
            this.backingArray[right] = tmp;
            // Move inward
            ++left; --right;
          }
          break;

        default:
          throw new Error('Unsupported Reverse Mode');
      }
    }

    return this;
  }
}
