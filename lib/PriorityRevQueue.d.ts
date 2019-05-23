import { QueueBase } from './Shared';
interface PriorityNode<ItemType> {
    item: ItemType;
    priority: number;
}
export declare class PriorityRevQueue<ItemType> extends QueueBase<PriorityNode<ItemType>> {
    private static compareNodePriority;
    private isReversed;
    enqueue(item: ItemType, priority: number): this;
    dequeue(): ItemType;
}
export {};
