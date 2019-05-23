export declare const enum QueueDirection {
    Backward = 0,
    Forward = 1
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
}
export declare class ReversableArray<ItemType> {
    private backingArray;
    private isReversed;
    clear(): void;
    length(): number;
    pop(): ItemType | undefined;
    push(item: ItemType): void;
    sort(compareFn: (a: ItemType, b: ItemType) => number): this;
    setDirection(reversed: QueueDirection, mode?: ReverseMethod): this;
}
