///<reference path="./utils.ts"/>

/**
 * @author Serkan YESILDAG
 * react component controller
 */

import * as React from "react";
import Supplier = Functions.Supplier;
import { Functions } from "./functions";
import { GenericFactory } from "./genericFactory";
import { Utils } from "./utils";

export class Action<A = any, L = any> {
  constructor(
    public type: A,
    public payload?: L,
    public error?: boolean,
    public meta?: any ) {
  }
}

export abstract class AbstractController<G = any, A = any, L = any> {

  protected state: G;
  protected converters: Array<Converter<G, any>>;

  protected constructor( state: G, ...converters: Array<Converter<G, any>> ) {
    this.state = state;
    this.converters = converters;
  }

  public dispatch( action: Action<A, L> ): void {
    let actionHandler = this.getActionHandler( action.type );
    this.state = actionHandler.reduce( this, action );
    for ( let converter of this.converters )
      converter.getComponent().setState( converter.convert( this.state ) )
  }

  public getState() {
    return this.state;
  }

  protected abstract getActionHandler( actionType: A ): ActionHandler<G, A, L>;

  // noinspection JSUnusedLocalSymbols
  public preRenderStart( action: Action<A, L> ) {
  }

  // noinspection JSUnusedLocalSymbols
  public preRenderSuccess( action: Action<A, L>, oldState: G, newState: G ) {
  }

  // noinspection JSUnusedLocalSymbols
  public preRenderError( action: Action<A, L>, oldState: G, error: any ) {
  }

  // noinspection JSUnusedLocalSymbols
  public preRenderFinally( action: Action<A, L>, oldState: G, newStateOrError: any ) {
  }
}

// noinspection JSUnusedGlobalSymbols
export class SingleController<P = any, S = any, A = any, L = any> extends AbstractController<S, A, L> {

  private factory: Factory<S, A, L>;

  constructor( component: StatefulComponent<P, S, A, L> ) {
    super( component.state, new SingleConverter( component ) );
    this.factory = new Factory<S, A, L>( ...component.getActionHandlers() );
  }

  protected getActionHandler( actionType: A ): ActionHandler<S, A, L> {
    return this.factory.create( actionType );
  }
}

export interface ActionHandler<G, A, L> extends Supplier<A> {
  reduce( controller: AbstractController<G, A, L>, action: Action<A, L> ): G;
}

export abstract class ImmutableActionHandler<G, A, L> implements ActionHandler<G, A, L> {

  abstract supply(): A;

  reduce( controller: AbstractController<G, A, L>, action: Action<A, L> ): G {
    return Utils.extend( controller.getState() );
  }
}

export interface Converter<G = any, P = any, S = any> {
  getComponent(): StatefulComponent<P, S>;

  convert( state: G ): S;
}

export class SingleConverter<P = any, S = any> implements Converter<S, P, S> {

  constructor( public component: StatefulComponent<P, S> ) {
  }

  public getComponent() {
    return this.component;
  }

  public convert( state: S ) {
    return state;
  }
}

export class Factory<G = any, A = any, L = any> extends GenericFactory.Base<A, ActionHandler<G, A, L>> {

  public classList: Array<GenericFactory.Constructor<A, ActionHandler<G, A, L>>>;

  constructor( ...classList: Array<GenericFactory.Constructor<A, ActionHandler<G, A, L>>> ) {
    super( ...classList );
  }
}

interface Dispatcher<A = any, L = any> {
  dispatch( action: Action<A, L> ): void;
}

interface StatefulComponent<P = any, S = any, A = any, L = any> extends React.Component<P, S>, Dispatcher<A, L> {
  getActionHandlers(): Array<GenericFactory.Constructor<A, ActionHandler<S, A, L>>>;
}

export abstract class Component<P, S, A, L> extends React.PureComponent<P, S> implements StatefulComponent<P, S, A, L> {

  protected readonly actionHandlers: Array<GenericFactory.Constructor<A, ActionHandler<S, A, L>>>;

  protected constructor( props: P, ...actionHandlers: Array<GenericFactory.Constructor<A, ActionHandler<S, A, L>>> ) {
    super( props );
    this.actionHandlers = actionHandlers;
  }

  public getActionHandlers() {
    return this.actionHandlers;
  }

  public dispatch( action: Action<A, L> ): void {
  }
}

// noinspection JSUnusedGlobalSymbols
export default function Controller<P, S, A, L, C extends Functions.Constructor<StatefulComponent<P, S, A, L>>>( BaseComponent: C ) {
  return class extends BaseComponent implements Dispatcher<A, L> {

    private controller: AbstractController;

    constructor( ...args: any[] ) {
      super( ...args );
      this.controller = new SingleController( this );
    }

    public dispatch( action: Action<A, L> ): void {
      this.controller.dispatch( action );
    }
  }
}
