/***
 * Author: Chris McGhee
 * Email: Nividica@gmail.com
 * Description: Queue implementation
 */

import { ReverseMethod, QueueDirection, QueueBase } from './Shared';

export class RevQueue<ItemType> extends QueueBase<ItemType> {

  public static reverseMethod: ReverseMethod = ReverseMethod.Native;

  /**
   * Adds an item to the queue.
   */
  public enqueue(item: ItemType): this {
    this.items
      .setDirection(QueueDirection.Forward, RevQueue.reverseMethod)
      .push(item);

    return this;
  }

  /**
   * Removes an item from the queue.
   */
  public dequeue(): ItemType {
    // Ensure the queue is not empty
    if (this.isEmpty()) {
      throw new Error('Invalid Operation: Can not dequeue from an empty queue.');
    }

    // Set direction to reversed
    // Return the first item in the queue.
    return this.items
      .setDirection(QueueDirection.Backward, RevQueue.reverseMethod)
      .pop() as ItemType;
  }

  /*
  public Debug_GetBacking(): Array<ItemType> {
    return this.BackingArray;
  }
  */
}
