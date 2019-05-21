import { ReverseMethod, QueueBase } from './Shared';
export declare class RevQueue<ItemType> extends QueueBase<ItemType> {
    static reverseMethod: ReverseMethod;
    enqueue(item: ItemType): this;
    dequeue(): ItemType;
}
