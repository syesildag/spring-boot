/// <reference path="./functions.ts"/>

import { Functions } from "./functions";

/**
 * @author Serkan YESILDAG
 */

export namespace GenericFactory {
  'use strict';

  export interface ToString {
    toString(): string;
  }

  export interface Constructor<K, T extends Functions.Supplier<K>> {
    new( ...args: Array<any> ): T;
  }

  export abstract class Base<K extends ToString, T extends Functions.Supplier<K>> {
    private readonly classMap: { [index: string]: Constructor<K, T> };

    protected constructor( ...classList: Array<Constructor<K, T>> ) {
      this.classMap = {};
      for ( let clazz of classList ) {
        let key: K = new clazz().supply();
        this.classMap[key.toString()] = clazz;
      }
    }

    public create( key: K, ...args: Array<any> ): T {
      let clazz = this.classMap[key.toString()];
      return new clazz( args );
    }
  }
}