export interface EventListenerHook {
    add(): void;
    remove(): void;
    isActive: boolean;
}
