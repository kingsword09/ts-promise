/// <reference path="../typings/promise.d.ts" />

enum PromiseStatus {
  PENDING = "pending",
  SUCCESS = "fulfilled",
  FAILED = "rejected",
}

export default class Promise<T> {
  private resolve!: ResolveType<T>;
  private reject?: RejectType;
  private status!: PromiseStatus;
  private resolve_value!: T;
  private reject_reason?: any;

  constructor(executor: Executor<T>) {
    this.status = PromiseStatus.PENDING;

    this.resolve = (value: T) => {
      if (this.status === PromiseStatus.PENDING) {
        this.status = PromiseStatus.SUCCESS;
        this.resolve_value = value;
      }
    };

    this.reject = (reason?: any) => {
      if (this.status === PromiseStatus.PENDING) {
        this.status = PromiseStatus.FAILED;
        this.reject_reason = reason;
      }
    };

    executor(this.resolve, this.reject);
  }

  then(onfulfilled: ResolveType<T>, onrejected?: RejectType) {
    if (this.status === PromiseStatus.SUCCESS) {
      this.status = PromiseStatus.PENDING;

      return onfulfilled(this.resolve_value)!;
    }

    if (this.status === PromiseStatus.FAILED) {
      this.catch(onrejected);
    }
  }

  catch(onrejected?: RejectType) {
    onrejected && onrejected(this.reject_reason);
  }
}
