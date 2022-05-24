export declare type QueueRunner<T> = () => Promise<T>;
export declare type QueueTaskPriority = number | 'HIGHEST' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOWEST';
export declare type QueueTask<T> = {
    runner: QueueRunner<T>;
    priority?: QueueTaskPriority | null;
};
export declare type QueueItem<T> = QueueTask<T> & {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason: any) => void;
};
export declare type QueueOptions = {
    auto?: boolean;
};