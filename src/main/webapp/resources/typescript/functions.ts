/**
 * @author Serkan YESILDAG
 */
namespace Functions {
  'use strict';

  export interface Supplier<T> {
    supply(): T;
  }
}