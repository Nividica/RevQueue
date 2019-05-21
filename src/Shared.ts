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
   * Array.reverse()
   */
  Native,
  /**
   * Slice and push each item, back to front
   */
  SlicedPush,
  /**
   * Pop from X, push to Y
   */
  PushPop
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
        case ReverseMethod.Native:
          // Reverse using the native JS Array method
          this.backingArray.reverse();
          break;
        case ReverseMethod.SlicedPush:
          {
            // Start with the next-to-last item (hence -2 instead of -1)
            // tslint:disable-next-line:no-magic-numbers
            let idx = this.backingArray.length - 2;
            while (idx > -1) {
              this.backingArray.push(this.backingArray[idx]);
              this.backingArray.splice(idx--, 1);
            }
          }
          break;
        case ReverseMethod.PushPop:
          {
            // Pop from current array, set in new array
            let len = this.backingArray.length;
            // Pre allocate new array
            const newArray = new Array<ItemType>(len);
            let idx = 0;
            while (len--) { newArray[idx++] = (this.backingArray.pop() as ItemType); }
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
