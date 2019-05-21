import { QueueBase, QueueDirection } from './Shared';

/***
 * Author: Chris McGhee
 * Email: Nividica@gmail.com
 * Description: Implements a priority queue
 */

interface PriorityNode<ItemType> {
  item: ItemType;
  priority: number;
}

export class PriorityQueue<ItemType> extends QueueBase<PriorityNode<ItemType>> {

  /**
   * Compares the priority of two nodes
   */
  private static compareNodePriority = (a: PriorityNode<any>, b: PriorityNode<any>) => a.priority - b.priority;

  /**
   * True when the array is reversed
   */
  private isReversed: boolean = false;

  public enqueue(item: ItemType, priority: number): this {
    if (this.isReversed) {
      this.items.setDirection(QueueDirection.Forward);
      this.isReversed = false;
    }
    this.items.push({ item, priority });

    return this;
  }

  public dequeue(): ItemType {
    if (this.isEmpty()) { throw new Error('Invalid Operation: Can not dequeue from empty queue'); }
    if (!this.isReversed) {
      this.items.setDirection(QueueDirection.Backward);
      this.items.sort(PriorityQueue.compareNodePriority);
      this.isReversed = true;
    }

    // tslint:disable-next-line:no-non-null-assertion
    return this.items.pop()!.item;
  }

}
