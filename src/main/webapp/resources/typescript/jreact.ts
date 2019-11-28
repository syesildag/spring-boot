/// <reference path="./utils.ts"/>
/// <reference path="./rslPromise.ts"/>

import { Utils } from "./utils";
import { RslPromise } from "./rslPromise";

/**
 * @author SYESILDAG
 * https://github.com/syesildag/jreact
 */

export namespace JReact {
  'use strict';

  export let DEBUG: boolean = false;
  export let TEST: boolean = false;

  // noinspection JSUnusedGlobalSymbols
  export type ComponentProps<C extends Component<any>> = C extends Component<infer X> ? X : never;
  export type Key = string | number;
  export type JReactElement<P = any> = string | number | Component<P>;
  export type ComponentArray<P = any> = Array<JReactElement<P>>;
  export type JReactNode<P = any> = JReactElement<P> | ComponentArray<P>;

  // noinspection JSUnusedGlobalSymbols
  export const INSTANCE: string = 'instance';
  export const DATA_KEY: string = 'data-key';
  export const RSL_VALID_REQUIRED: string = 'rsl-valid-required';
  export const RSL_INVALID_REQUIRED: string = 'rsl-invalid-required';
  export const RSL_VALID_PATTERN: string = 'rsl-valid-pattern';
  export const RSL_INVALID_PATTERN: string = 'rsl-invalid-pattern';
  export const DATA_FIXED_ITEM: string = 'data-fixed-item';
  export const DATA_REQUIRED: string = 'data-required';
  export const DATA_PATTERN: string = 'data-pattern';
  export const VALUE: string = '_value';

  const STYLE: string = 'style';
  const CLASS: string = 'class';

  let ATTRIBUTE_MAP: any = {
    key: DATA_KEY,
    className: CLASS
  };

  // noinspection AssignmentResultUsedJS
  [STYLE,
    VALUE,
    DATA_REQUIRED,
    DATA_PATTERN,
    'size',
    'maxlength',
    'id',
    'change',
    'checked',
    'click',
    'colspan',
    'contextmenu',
    'disabled',
    'selected',
    'mousedown',
    'mousemove',
    'mouseup',
    'touchend',
    'touchmove',
    'touchstart',
    'type',
    'value',
    'placeholder',
    'title',
    'href',
    'name'
  ].forEach( key => ATTRIBUTE_MAP[key] = key );

  /**
   * FSA-compliant action.
   * @see https://github.com/acdlite/flux-standard-action
   *
   * @param {string} type
   * @param {object} payload
   * @param {boolean} error
   * @param {object} meta
   * @return {object} Action
   */
  export class Action<A = any, L = any> {
    constructor(
      public type: A,
      public payload?: L,
      public error?: boolean,
      public meta?: any ) {
    }
  }

  export function getInstance<P extends Props, S, C extends Component<P, S, any, any>>( el: JQuery ): C {
    return el.data( INSTANCE );
  }

  function setInstance<P extends Props>( el: JQuery, comp: Component<P> ) {
    el.data( INSTANCE, comp );
  }

  export function getInstanceKey<P extends Props>( comp: Component<P> ): string {
    return getInstanceKeyFromTag( comp.getTag(), comp.props.key );
  }

  export function getInstanceKeyFromTag( tag: string, key: Key ): string {
    let componentKey = tag;

    if ( Utils.testString( key ) )
      componentKey += '[' + DATA_KEY + '=' + key + ']';

    return componentKey;
  }

  // noinspection FunctionWithMultipleReturnPointsJS
  export function isSame( myProps: any, nextProps: any ): boolean {
    // noinspection EqualityComparisonWithCoercionJS
    if ( myProps === nextProps || ( myProps == null && nextProps == null ) )
      return true;

    // noinspection EqualityComparisonWithCoercionJS
    if ( myProps == null && nextProps != null )
      return false;

    // noinspection EqualityComparisonWithCoercionJS
    if ( myProps != null && nextProps == null )
      return false;

    if ( Object.keys( myProps ).length !== Object.keys( nextProps ).length )
      return false;

    return Object.keys( myProps ).every( function( prop ) {
      return myProps[prop] === nextProps[prop];
    } );
  }

  export function NOOP() {
  }

  // noinspection JSUnusedLocalSymbols
  export function createElement<C extends Component<any>>(
    jrc: { new( props: ComponentProps<C> ): C },
    props: ComponentProps<C>, ...args: ComponentArray ): C;

  // noinspection JSUnusedLocalSymbols
  export function createElement<P extends DOMAttributes>(
    jrc: string, props: P, ...args: ComponentArray ): ComponentDOM<P>;

  // noinspection FunctionWithMultipleReturnPointsJS
  export function createElement<P extends Props, C extends Component<P>>(
    jrc: string | { new( props: P ): C },
    props: P,
    ...args: ComponentArray ): C | ComponentDOM<P> {
    let childKeys: any = {};

    if ( args.length > 1 ) {

      if ( Utils.isStringOrNumber( args[0] ) )
        throw new Error( 'multiple children with string or number' );

      // noinspection FunctionWithMultipleReturnPointsJS
      args.forEach( child => {

        if ( Utils.isStringOrNumber( child ) )
          return;

        let comp = <Component<P>>child,
          componentKey: string;

        // noinspection EqualityComparisonWithCoercionJS
        if ( comp.props.key == null )
          throw new Error( 'partially defined child prop keys: ' + jrc );

        componentKey = getInstanceKey( comp );

        if ( childKeys.hasOwnProperty( componentKey ) )
          throw new Error( 'duplicate child prop keys: ' + jrc );
        else childKeys[componentKey] = true;
      } );
    }

    if ( !props )
      // noinspection AssignmentToFunctionParameterJS
      props = <P>{};

    props.children = args;

    if ( typeof jrc === 'function' )
      return new jrc( props );
    else
      return new ComponentDOM( props, <string>jrc );
  }

  function updateProps( comp: any, el: JQuery, remove?: boolean ) {
    Object.keys( comp.props ).forEach( function( key ) {
      let keyMap: string, value = comp.props[key];
      if ( ATTRIBUTE_MAP.hasOwnProperty( key ) ) {

        keyMap = ATTRIBUTE_MAP[key];

        // noinspection IfStatementWithTooManyBranchesJS
        if ( typeof value === 'function' ) {
          if ( remove )
            // noinspection JSDeprecatedSymbols
            el.unbind( keyMap );
          else
            // noinspection JSDeprecatedSymbols
            el.bind( keyMap, value );
        }
        else if ( key === STYLE ) {
          Object.keys( value ).forEach( style => {
            el.css( style, remove ? '' : value[style] );
          } );
        }
        else if ( key === VALUE ) {
          if ( remove )
            el.val( null );
          else el.val( value );
        }
        else if ( remove ) {
          if ( Utils.isBoolean( value ) )
            el.prop( keyMap, false );
          else el.removeAttr( keyMap );
        }
        else {
          if ( Utils.isBoolean( value ) )
            el.prop( keyMap, value );
          else el.attr( keyMap, value );
        }
      }
    }, comp );
  }

  // noinspection FunctionWithMoreThanThreeNegationsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
  export function render<P extends Props>( comp: Component<P>, mount: JQuery, sibling?: JQuery ): JQuery {
    let childSibling: JQuery,
      nextSibling: JQuery,
      renderResult: JReactNode,
      oldComp: Component<any>,
      prevProps: any,
      prevState: any,
      el: JQuery,
      first = false,
      alreadyMounted: boolean,
      children: ComponentArray = [],
      childKeyElements: { [index: string]: boolean } = {},
      instanceKey: string = getInstanceKey( comp ),
      oldHTML: string;

    el = mount.children( instanceKey );
    // noinspection ReuseOfLocalVariableJS
    alreadyMounted = el.length > 0;

    // noinspection AssignmentResultUsedJS
    if ( alreadyMounted && ( oldComp = getInstance( el ) ) ) {

      if ( DEBUG )
        oldHTML = el.get( 0 ).outerHTML;

      //move component
      if ( sibling ) {
        nextSibling = sibling.next();

        // noinspection EqualityComparisonWithCoercionJS
        if ( nextSibling.length == 0 || getInstanceKey( getInstance( nextSibling ) ) !== instanceKey ) {
          el.detach();
          sibling.after( el );
        }
      }

      if ( !oldComp.shouldComponentUpdate( comp.props, comp.state ) )
        return el;

      prevState = oldComp.state;

      oldComp.componentWillReceiveProps( comp.props );

      updateProps( oldComp, el, true );
      prevProps = oldComp.props;
      oldComp.props = comp.props;
      updateProps( oldComp, el );
      // noinspection AssignmentToFunctionParameterJS
      comp = oldComp;

    } else {

      first = true;
      if ( !alreadyMounted )
        el = jQuery( '<' + comp.getTag() + '/>' );
      comp.setElement( el );
      setInstance( el, comp );

      comp.componentWillMount();

      updateProps( comp, el );
      if ( !alreadyMounted ) {
        if ( sibling )
          sibling.after( el );
        else
          mount.append( el );
      }
    }

    // noinspection SuspiciousInstanceOfGuard
    if ( comp instanceof AutoTemplate )
      comp.renderTemplate();
    else if ( comp.props.dangerouslySetInnerHTML )
      el.html( comp.props.dangerouslySetInnerHTML.__html );
    else {

      renderResult = comp.render();
      if ( renderResult ) {
        if ( Utils.isArray( renderResult ) )
          children.push( ...renderResult as Array<Component<any>> );
        else children.push( renderResult as Component<any> );
      }
      else
        // noinspection ReuseOfLocalVariableJS
        children = comp.props.children;

      //create children hash
      children.forEach( ( child ) => {
        if ( child instanceof Component )
          childKeyElements[getInstanceKey( child )] = true;
      } );

      //unmount non-existant children
      el.children().each( function() {
        let jEl = jQuery( this ), inst = getInstance( jEl );
        if ( ( !inst || !childKeyElements[getInstanceKey( inst )] ) && !jEl.is( '[' + DATA_FIXED_ITEM + ']' ) )
          unmountElement( jEl );
      } );

      //render children
      comp.refs = {};
      children.forEach( function( child ) {
        if ( child instanceof Component ) {
          childSibling = render( child, el, childSibling );
          // noinspection EqualityComparisonWithCoercionJS
          if ( child.props.ref != null ) {
            if ( Utils.isFunction( child.props.ref ) )
              child.props.ref.call( comp, JReact.getInstance( childSibling ) );
            else
              // noinspection EqualityComparisonWithCoercionJS
              if ( child.props.ref != '' )
                comp.refs[child.props.ref] = childSibling;
          }
        }
        else
          el.text( child );
      } );
    }

    if ( first )
      comp.componentDidMount();
    else
      comp.componentDidUpdate( prevProps, prevState );

    if ( DEBUG && !first && oldHTML === el.get( 0 ).outerHTML ) {
      console.log( `rendered but same:\n${( <any>comp.constructor ).name}\n${getInstanceKey( comp )}\n${oldHTML}` );
      console.dir( el.get( 0 ) );
    }

    return el;
  }

  export function renderDOM<P extends Props>( comp: Component<P>, m: JQuery ): JQuery {
    let el: JQuery = render( comp, m );

    m.children().each( function() {
      if ( this !== el[0] )
        unmountElement( jQuery( this ) );
    } );

    return el;
  }

  export function unmountElement( jc: JQuery, bDoNotRemove?: boolean ) {
    let old = getInstance( jc );
    if ( old )
      old.componentWillUnmount();

    if ( bDoNotRemove )
      jc.html( null );
    else
      jc.remove();
  }

  export type Reference<C extends JReact.Component = JReact.Component> =
    string
    | ( ( this: JReact.Component, instance: C ) => any );

  export interface Props<C extends JReact.Component = JReact.Component> {
    children?: ComponentArray;
    key?: Key;
    ref?: Reference<C>;
    className?: string;
    style?: React.CSSProperties;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
  }

  export class Component<P extends Props = any, S = any, A = any, L = any> {
    public element: JQuery;
    public props: P;
    public state: S;
    public refs: { [index: string]: JQuery } = {};

    constructor( props: P ) {
      let defaultProps = this.getDefaultProps();
      if ( defaultProps )
        // noinspection AssignmentToFunctionParameterJS
        props = jQuery.extend( true, {}, defaultProps, props );
      this.props = props;
    }

    protected getDefaultProps(): P {
      return null;
    }

    public getTag(): string {
      return 'span';
    }

    public getElement(): JQuery {
      return this.element;
    }

    public setElement( element: JQuery ) {
      this.element = element;
    }

    // noinspection JSUnusedGlobalSymbols
    protected _getState(): any {
      return this.state;
    }

    protected _setState( state: S ) {
      this.state = state;
    }

    public render(): Component | ComponentArray {
      return null;
    }

    public renderTemplate() {
      throw new Error( "must be overloaded" );
    }

    protected reduce( state: S, action: Action<A, L> ): S {
      return state;
    }

    public shouldComponentUpdate( nextProps: P, nextState: S ): boolean {
      return !isSame( this.state, nextState ) || !isSame( this.props, nextProps );
    }

    public dispatch( action: Action<A, L> ): void {
      this.setState( this.reduce( this.state, action ) );
    }

    protected setState( nextState: S ) {
      if ( this.shouldComponentUpdate( this.props, nextState ) ) {
        this._setState( nextState );
        if ( !TEST ) {
          let renderResult = this.render();
          if ( renderResult ) {
            if ( Utils.isArray( renderResult ) )
              render( JReact.createElement( this.constructor as { new( props: P ): Component<P> }, this.props, ...renderResult as Array<Component> ), this.element.parent() );
            else renderDOM( renderResult as Component, this.element );
          }
          else this.renderTemplate();
        }
      }
    }

    public componentWillReceiveProps( nextProps: P ) {
    }

    public componentWillMount() {
    }

    public componentDidMount() {
    }

    public componentWillUnmount(): void | any {
    }

    public componentDidUpdate( prevProps: P, prevState: S ) {
    }
  }

  export class ComponentDOM<P extends Props<ComponentDOM> = any> extends Component<P> {

    constructor( props: P, public tag: string ) {
      super( props );
    }

    public getTag(): string {
      return this.tag;
    }
  }

  export interface AutoTemplateProps<D, C extends AutoTemplateProps<any, any>> extends Props {
    name?: string;
    nameSpace?: string;
    templateID?: string;
    tag?: string;
    data?: D;
    components?: Array<C>;
  }

  export class AutoTemplate<P extends AutoTemplateProps<any, any>, S = any, A = any, L = any> extends Component<P, S, A, L> {

    constructor( props: P ) {
      super( props );
    }

    public getTag(): string {
      return this.props.tag;
    }

    protected getComponents(): Array<AutoTemplateProps<any, any>> {
      return this.props.components;
    }

    // noinspection JSUnusedGlobalSymbols
    protected getComponentByKey( key: Key ): AutoTemplateProps<any, any> {
      return getPropByKey( key, this.getComponents() );
    }

    protected getTemplateHTML(): string {
      return getTemplateContent( this.props.templateID );
    }

    public renderTemplate() {
      let templateHTML = this.getTemplateHTML(), el = this.getElement();
      this.preRenderTemplate();
      if ( !Utils.isUndefined( templateHTML ) && !el.html() )
        el.html( templateHTML );
      this.postRenderTemplate();
    }

    // noinspection JSUnusedGlobalSymbols
    protected preRenderTemplate() {

      this._preRenderTemplate();

      let childKeyElements: { [index: string]: boolean } = {},
        components = this.getComponents(),
        templateHTML = this.getTemplateHTML();

      //create children hash
      if ( components )
        components.forEach( component => {
          childKeyElements[getInstanceKeyFromTag( component.tag, component.key )] = true;
        } );

      //unmount non-existant children
      this.getElement().children( '[' + DATA_KEY + ']' ).each( function() {
        let jEl = jQuery( this ), inst = getInstance( jEl );
        if ( !inst || !childKeyElements[getInstanceKey( inst )] )
          unmountElement( jEl, !Utils.isUndefined( templateHTML ) );
      } );

    }

    protected _preRenderTemplate() {
    }

    protected postRenderTemplate() {

      let components = this.getComponents(), sibling: JQuery = null, templateHTML = this.getTemplateHTML();

      //render children
      this.refs = {};
      if ( components )
        components.forEach( component => {
          sibling = render( createElement( evalComponent( component ), component ), this.getElement(), Utils.isUndefined( templateHTML ) ? sibling : undefined );
          this.refs[component.key] = sibling;
        } );

      this._postRenderTemplate();
    }

    protected _postRenderTemplate() {
    }
  }

  function evalComponent( props: AutoTemplateProps<any, any> ) {
    // noinspection DynamicallyGeneratedCodeJS
    return eval( props.nameSpace + "." + props.name );
  }

  export class StatelessAutoTemplate<P extends AutoTemplateProps<any, any>> extends AutoTemplate<P> {
    constructor( props: P ) {
      super( props );
    }
  }

  export function getDynamicComponent<C extends AutoTemplateProps<any, any>, D extends DynamicComponentData<C>, P extends DynamicAutoTemplateProps<D, any>>( key: Key, dynProps: P ): C {
    return getPropByKey( key, dynProps.data.dynamicComponents )
  }

  // noinspection FunctionWithMultipleReturnPointsJS
  export function getPropByKey<P extends Props>( key: Key, props: Array<P> ): P {
    if ( props )
      for ( let component of props )
        if ( component.key == key )
          return component;
    return null;
  }

  export interface DynamicComponentData<C extends AutoTemplateProps<any, any>> {
    dynamicComponents?: Array<C>;
  }

  export interface DynamicAutoTemplateProps<D extends DynamicComponentData<any>, C extends AutoTemplateProps<any, any>> extends AutoTemplateProps<D, C> {
  }

  export class DynamicStatelessAutoTemplate<P extends DynamicAutoTemplateProps<any, any>> extends StatelessAutoTemplate<P> {
    constructor( props: P ) {
      super( props );
    }

    // noinspection JSUnusedGlobalSymbols
    protected getDynamicComponentByKey( key: Key ) {
      return getPropByKey( key, this.props.data.dynamicComponents );
    }
  }

  export class ComponentController<G = any, A = any, L = any> {

    protected state: G;
    protected converters: Array<ComponentConverter<G, any>>;

    constructor( state: G, ...converters: Array<ComponentConverter<G, any>> ) {
      this.state = state;
      this.converters = converters;
    }

    public dispatch( action: JReact.Action<A, L> ): void {
      let actionHandler = this.getActionHandler( action.type ), oldState = Utils.extend( this.state );
      this.state = actionHandler.reduce( this, action );

      if ( Utils.isFunction( actionHandler.preRenderTemplate ) ) {
        this.preRenderStart( action );
        actionHandler.preRenderTemplate( this, action ).then(
          ( newState: G ) => {
            this.state = newState;
            this.render( actionHandler, action );
            this.preRenderSuccess( action, oldState, newState );
            this.preRenderFinally( action, oldState, newState );
          },
          ( error: any ) => {
            this.state = oldState;
            this.preRenderError( action, oldState, error );
            this.preRenderFinally( action, oldState, error );
          }
        );
      }
      else this.render( actionHandler, action );
    }

    // noinspection FunctionWithMultipleReturnPointsJS
    public render( actionHandler: ComponentActionHandler<G, A, L>, action: JReact.Action<A, L> ) {

      if ( TEST )
        return;

      for ( let converter of this.converters ) {
        let component = converter.getComponent();
        let newProps = converter.convert( this.state );
        render( JReact.createElement( component.constructor as { new( props: any ): Component }, newProps ), component.getElement().parent() );
      }

      if ( Utils.isFunction( actionHandler.postRenderTemplate ) )
        actionHandler.postRenderTemplate( this, action );
    }

    public getState() {
      return this.state;
    }

    protected getActionHandler( actionType: A ): ComponentActionHandler<G, A, L> {
      throw new Error( 'getActionHandler should be overridden' );
    }

    // noinspection JSUnusedLocalSymbols
    public preRenderStart( action: JReact.Action<A, L> ) {
    }

    public preRenderSuccess( action: JReact.Action<A, L>, oldState: G, newState: G ) {
    }

    // noinspection JSUnusedLocalSymbols
    public preRenderError( action: JReact.Action<A, L>, oldState: G, error: any ) {
    }

    // noinspection JSUnusedLocalSymbols
    public preRenderFinally( action: JReact.Action<A, L>, oldState: G, newStateOrError: any ) {
    }
  }

  export class SingleComponentController<P extends JReact.Props, A = any, L = any> extends ComponentController<P, A, L> {
    constructor( component: JReact.Component<P> ) {
      super( component.props, new SingleComponentConverter( component ) );
    }
  }

  export interface ComponentActionHandler<G, A, L> {
    supply?(): A;

    reduce( controller: ComponentController<G, A, L>, action: JReact.Action<A, L> ): G;

    preRenderTemplate?( controller: ComponentController<G, A, L>, action: JReact.Action<A, L> ): RslPromise.Thenable<G>;

    postRenderTemplate?( controller: ComponentController<G, A, L>, action: JReact.Action<A, L> ): void;
  }

  export interface ComponentConverter<G, P extends JReact.Props> {
    getComponent(): JReact.Component<P>;

    convert( state: G ): P;
  }

  export class SingleComponentConverter<P extends JReact.Props> implements ComponentConverter<P, P> {
    constructor( public component: JReact.Component<P> ) {
    }

    public getComponent() {
      return this.component;
    }

    public convert( state: P ) {
      return state;
    }
  }

  export interface JQueryEventHandler {
    // noinspection JSDeprecatedSymbols
    ( e: JQueryEventObject ): any
  }

  export interface DOMAttributes<C extends JReact.Component = ComponentDOM> extends Props<C> {
    colspan?: number;
    checked?: boolean;
    disabled?: boolean;
    selected?: boolean;
    'type'?: string;
    'data-required'?: boolean;
    'data-pattern'?: Utils.FORMAT_KEY;
    placeholder?: string;
    title?: string;
    href?: string;
    name?: string;
    value?: string;
    _value?: string;
    size?: number;
    maxlength?: number;
    id?: string;
    style?: React.CSSProperties;
    change?: JQueryEventHandler;
    click?: JQueryEventHandler;
    mouseup?: JQueryEventHandler;
    mousedown?: JQueryEventHandler;
    mousemove?: JQueryEventHandler;
    touchstart?: JQueryEventHandler;
    touchend?: JQueryEventHandler;
    touchmove?: JQueryEventHandler;
    contextmenu?: JQueryEventHandler;
  }

  export interface DomFactory {
    ( props: DOMAttributes, ...args: ComponentArray ): ComponentDOM<DOMAttributes>
  }

  export function hasInvalidPattern( el: JQuery ) {
    return el.hasClass( RSL_INVALID_PATTERN )
  }

  export function hasInvalidRequired( el: JQuery ) {
    return el.hasClass( RSL_INVALID_REQUIRED )
  }

  let templateCache: { [index: string]: string } = {};

  export function getTemplateContent( id: string ) {
    return templateCache[id];
  }

  export interface JsonScript {
    json: string;
    script: string;
  }

  export function bootstrap( document: Document ) {
    let script: HTMLScriptElement, scriptType = 'text/html';
    for ( let index = 0; index < document.scripts.length; index++ ) {
      script = document.scripts[index] as HTMLScriptElement;
      if ( script.type === scriptType && script.id )
        templateCache[script.id] = script.text;
    }
  }
}