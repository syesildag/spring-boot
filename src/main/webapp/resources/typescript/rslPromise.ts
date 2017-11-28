/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./genericFactory.ts"/>
/**
 * @author Serkan YESILDAG
 */
namespace RslPromise {
  'use strict';

  export interface Executor<T> extends Function {
    (resolve: (value?: T | Thenable<T>) => void, reject: (error?: any) => void): void;
  }

  export interface Thenable<T> {
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
  }

  export interface Promise<T> {
    create<T>(func: Executor<T>, context: any): Thenable<T>;
    resolve<T>(value?: T | Thenable<T>): Thenable<T>;
    reject<T>(error: T): Thenable<T>;
    all<T>(promises: (T | Thenable<T>)[]): Thenable<T[]>;
  }

  export interface KeyPromise<K, T> extends Promise<T> {
    supply(): K;
  }

  enum Type { NATIVE, JQUERY };

  class NativePromise<T> implements KeyPromise<Type, T> {

    constructor() {
    }

    public supply(): Type {
      return Type.NATIVE;
    }

    public create<T>(func: Executor<T>, context: any): Thenable<T> {
      return new Promise(func.bind(context));
    }

    public resolve<T>(value?: T | Thenable<T>): Thenable<T> {
      return Promise.resolve(<T>value);
    }

    public reject<T>(error: T): Thenable<T> {
      return Promise.reject(error);
    }

    public all<T>(promises: (T | Thenable<T>)[]): Thenable<T[]> {
      return Promise.all(promises as T[]);
    }
  }

  class JQueryPromise<T> implements KeyPromise<Type, T> {
    constructor() {
    }

    public supply(): Type {
      return Type.JQUERY;
    }

    public create<T>(func: Executor<T>, context: any): Thenable<T> {
      var deferred = jQuery.Deferred();
      func.call(context, deferred.resolve, deferred.reject);
      return deferred.promise();
    }

    public resolve<T>(value?: T | Thenable<T>): Thenable<T> {
      var deferred = jQuery.Deferred();
      deferred.resolve(value);
      return deferred.promise();
    }

    public reject<T>(error: T): Thenable<T> {
      var deferred = jQuery.Deferred();
      deferred.reject(error);
      return deferred.promise();
    }

    public all<T>(promises: (T | Thenable<T>)[]): Thenable<T[]> {
      return new Wrapper(jQuery.when(...(<any>promises)));
    }
  }

  class Wrapper<T> implements Thenable<T[]> {
    constructor(private thenable: Thenable<T[]>) {
    }

    public then<U>(onFulfilled?: (value: T[]) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>) {
      function onFulfilledWrapper(...args: T[]) {
        return onFulfilled.call(this, args);
      }
      return this.thenable.then(<any>onFulfilledWrapper, onRejected);
    }
  }

  class PromiseFactory<T> extends GenericFactory.Base<Type, KeyPromise<Type, T>> {
    protected getClassList(): Array<GenericFactory.Constructor<Type, KeyPromise<Type, T>>> {
      return [NativePromise, JQueryPromise];
    }
  }

  export function isNative() {
    return typeof Promise === 'function';
  }

  let promise: Promise<any>;
  let promiseFactory = new PromiseFactory();

  export function forceJQuery(forceJQuery: boolean) {
    promise = !forceJQuery && isNative() ? promiseFactory.create(Type.NATIVE) : promiseFactory.create(Type.JQUERY);
  }

  forceJQuery(false);

  export function create<T>(func: Executor<T>, context: any): Thenable<T> {
    return promise.create(func, context);
  }

  export function resolve<T>(value?: T | Thenable<T>): Thenable<T> {
    return promise.resolve(value);
  }

  export function reject<T>(error?: T): Thenable<T> {
    return promise.reject(error);
  }

  export function all<T>(promises: (T | Thenable<T>)[]): Thenable<T[]> {
    return promise.all(promises);
  }
}
