/***
 * Author: Chris McGhee
 * Email: Nividica@gmail.com
 */

export const enum QueueDirection {
  Backward,
  Forward
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
