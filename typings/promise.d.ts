type ResolveType<T> = (value: T) => void | import("../src/promise").default<T>;
type RejectType = (reason?: any) => void;
type Executor<T> = (resolve: ResolveType<T>, reject: RejectType) => void;
