export declare const enum QueueDirection {
    Forward = 0,
    Backward = 1
}
export declare enum ReverseMethod {
    Native = 0,
    PushPop = 1,
    MirrorSwap = 2
}
export declare class QueueBase<ItemType> {
    protected items: ReversableArray<ItemType>;
    readonly length: number;
    clear(): void;
    isEmpty(): boolean;
    peek(): ItemType | undefined;
}
export declare class ReversableArray<ItemType> {
    private backingArray;
    private isReversed;
    clear(): void;
    length(): number;
    pop(): ItemType | undefined;
    push(item: ItemType): void;
    peek(): ItemType | undefined;
    sort(compareFn: (a: ItemType, b: ItemType) => number): this;
    setDirection(reversed: QueueDirection, mode?: ReverseMethod): this;
}
