/**
 * @author Serkan YESILDAG
 */
module Functions {
  'use strict';

  export interface Supplier<T> {
    supply(): T;
  }
}