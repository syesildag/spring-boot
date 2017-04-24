/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
module JReactComponents {

  const ITEMS_CONTAINER = 'items_container';
  const ITEMS_TRANSLATE = 'items_translate';
  const ITEMS_REFERENCE = 'items_reference';

  function getClientStartKey(axis: Axis): string {
    return axis === Axis.x ? 'clientTop' : 'clientLeft';
  }

  function getClientSizeKey(axis: Axis): string {
    return axis === Axis.x ? 'clientWidth' : 'clientHeight';
  }

  function getInnerSizeKey(axis: Axis): string {
    return axis === Axis.x ? 'innerWidth' : 'innerHeight';
  }

  function getScrollSizeKey(axis: Axis): string {
    return axis === Axis.x ? 'scrollWidth' : 'scrollHeight';
  }

  function getScrollStartKey(axis: Axis): string {
    return axis === Axis.x ? 'scrollLeft' : 'scrollTop';
  }

  function getOffsetSizeKey(axis: Axis): string {
    return axis === Axis.x ? 'offsetWidth' : 'offsetHeight';
  }

  function getOffsetStartKey(axis: Axis): string {
    return axis === Axis.x ? 'offsetLeft' : 'offsetTop';
  }

  function getOverflowKey(axis: Axis): string {
    return axis === Axis.x ? 'overflowX' : 'overflowY';
  }

  function getSizeKey(axis: Axis): string {
    return axis === Axis.x ? 'width' : 'height';
  }

  export enum Axis { x, y }
  export enum ListType { uniform, variable }

  export interface ItemRenderer extends Function {
    (index: number, key: JReact.Key, first?: boolean, offset?: number, scroll?: number): JReact.Component<any, any, any, any>
  }

  export interface ItemsRenderer extends Function {
    (items: JReact.ComponentArray, ref: string|ItemsRendererSetter): JReact.Component<any, any, any, any>
  }

  interface ItemsRendererSetter extends Function {
    (items: JReact.ComponentArray): void
  }

  export interface ItemSizeEstimator extends Function {
    (index: number, cache: any): any
  }

  export interface ItemSizeGetter extends Function {
    (index: number): number
  }

  export interface ScrollParentGetter extends Function {
    (): HTMLElement
  }

  interface Cache {
    [index: number]: number;
  }

  export interface ListProps extends JReact.Props {
    state?: ListState,
    axis?: Axis,
    initialIndex?: number,
    itemRenderer: ItemRenderer,
    itemSizeEstimator?: ItemSizeEstimator,
    itemSizeGetter?: ItemSizeGetter,
    itemsRenderer: ItemsRenderer,
    length: number,
    pageSize: number,
    scrollParentGetter?: ScrollParentGetter,
    threshold: number,
    listType: ListType,
    useStaticSize?: boolean,
    useTranslate3d?: boolean,
    fixedHeader?: boolean
  }

  export interface ListState {
    itemsPerRow?: number,
    fromIndex?: number,
    itemSize?: number,
    size?: number
  }

  enum ListActionType {
    UPDATE
  }

  export class List extends JReact.Component<ListProps, ListState, ListActionType, ListState> {

    private cache: Cache;
    private scrollParent: HTMLElement;
    private scroll = 0;
    private items: JReact.ComponentArray = [];

    constructor(props: ListProps) {
      super(props);

      const {initialIndex, pageSize} = this.props;
      const itemsPerRow = 1;
      const {fromIndex, size} = this.constrain(initialIndex, pageSize, itemsPerRow, this.props);
      this.state = { fromIndex, size, itemsPerRow };
      this.cache = {};
    }

    public getTag(): string {
      return 'div';
    }

    private update(field: number = 1, action: JReact.Action<ListActionType, ListState>, actionField: number): number {
      switch (action.type) {
        case ListActionType.UPDATE:
          if (typeof actionField === 'undefined')
            return field;
          else
            return actionField;
        default:
          return field;
      }
    }

    public reduce(state: ListState = {}, action: JReact.Action<ListActionType, any>): ListState {
      return {
        itemsPerRow: this.update(state.itemsPerRow, action, action.payload.itemsPerRow),
        fromIndex: this.update(state.fromIndex, action, action.payload.fromIndex),
        itemSize: this.update(state.itemSize, action, action.payload.itemSize),
        size: this.update(state.size, action, action.payload.size)
      };
    }

    public componentWillReceiveProps(nextProps: ListProps) {
      let {fromIndex, size, itemsPerRow} = this.state;
      this.setState(this.constrain(fromIndex, size, itemsPerRow, nextProps));
    }

    public componentDidMount() {
      //this.updateFrame = Utils.debounce(this.updateFrame.bind(this), 100, false);
      this.updateFrame = this.updateFrame.bind(this);
      jQuery(window).bind('resize', this.updateFrame);
      this.updateFrame();
    }

    public componentDidUpdate() {
      this.updateFrame();
    }

    public componentWillUnmount() {
      jQuery(window).unbind('resize', this.updateFrame);
      jQuery(this.scrollParent).unbind('scroll', this.updateFrame);
    }

    private updateFrame() {
      if (!this.getElement())
        return;

      this.updateScrollParent();
      switch (this.props.listType) {
        case ListType.variable: return this.updateVariableFrame();
        case ListType.uniform: return this.updateUniformFrame();
      }
    }

    private updateScrollParent() {
      const prev = this.scrollParent;
      this.scrollParent = this.getScrollParent();
      if (prev === this.scrollParent) return;
      if (prev)
        jQuery(prev).unbind('scroll', this.updateFrame);

      jQuery(this.scrollParent).bind('scroll', this.updateFrame);
    }

    private getScrollParent(): HTMLElement {
      const {axis, scrollParentGetter} = this.props;
      if (scrollParentGetter) return scrollParentGetter();
      let el = this.getElement().get(0);
      const overflowKey = getOverflowKey(axis);
      while (el = el.parentElement) {
        switch ((<any>window.getComputedStyle(el))[overflowKey]) {
          case 'auto':
          case 'scroll':
          case 'overlay':
            return el;
        }
      }
      return <any>window;
    }

    private getOffset(el: HTMLElement) {
      const {axis} = this.props;

      let offset: number = (<any>el)[getClientStartKey(axis)] || 0;
      const offsetKey: string = getOffsetStartKey(axis);
      do
        offset += (<any>el)[offsetKey] || 0;
      while (el = <HTMLElement>el.offsetParent);
      return offset;
    }

    private getScroll() {
      const {scrollParent} = this;
      const {axis} = this.props;
      const scrollKey = getScrollStartKey(axis);
      const actual = <any>scrollParent === window ?
        // Firefox always returns document.body[scrollKey] as 0 and Chrome/Safari
        // always return document.documentElement[scrollKey] as 0, so take
        // whichever has a value.
        (<any>document.body)[scrollKey] || (<any>document.documentElement)[scrollKey] :
        (<any>scrollParent)[scrollKey];
      const max = this.getScrollSize() - this.getViewportSize();
      const scroll = Math.max(0, Math.min(actual, max));
      const el = this.getElement().get(0);
      this.scroll = this.getOffset(scrollParent) + scroll - this.getOffset(el);
      return this.scroll;
    }

    private setScroll(offset: number) {
      const {scrollParent} = this;
      const {axis} = this.props;
      offset += this.getOffset(this.getElement().get(0));
      if (<any>scrollParent === window)
        return window.scrollTo(0, offset);

      offset -= this.getOffset(this.scrollParent);
      (<any>scrollParent)[getScrollStartKey(axis)] = offset;
    }

    private getViewportSize() {
      const {scrollParent} = this;
      const {axis} = this.props;
      return (<any>scrollParent) === window ?
        (<any>window)[getInnerSizeKey(axis)] :
        (<any>scrollParent)[getClientSizeKey(axis)];
    }

    private getScrollSize() {
      return this.getFromScrollParent(getScrollSizeKey(this.props.axis));
    }

    private getScrollStart() {
      return this.getFromScrollParent(getScrollStartKey(this.props.axis));
    }

    private getFromScrollParent(key: string) {
      const {scrollParent} = this;
      return <any>scrollParent === window ?
        Math.max((<any>document.body)[key], (<any>document.documentElement)[key]) :
        (<any>scrollParent)[key];
    }

    private getStartAndEnd(threshold = this.props.threshold) {
      const {itemSizeGetter, listType, length} = this.props;
      const scroll = this.getScroll();
      const start = Math.max(0, scroll - threshold);
      let end = scroll + this.getViewportSize() + threshold;
      if (listType === ListType.uniform || itemSizeGetter)
        end = Math.min(end, this.getSpaceBefore(length));
      return { start, end };
    }

    private updateVariableFrame() {
      if (!this.props.itemSizeGetter)
        this.cacheSizes();

      const {start, end} = this.getStartAndEnd();
      const {length, pageSize} = this.props;
      let space = 0;
      let fromIndex = 0;
      let size = 0;
      const maxFrom = length - 1;

      while (fromIndex < maxFrom) {
        const itemSize = this.getSizeOf(fromIndex);
        if (itemSize == null || space + itemSize > start) break;
        space += itemSize;
        ++fromIndex;
      }

      const maxSize = length - fromIndex;

      while (size < maxSize && space < end) {
        const itemSize = this.getSizeOf(fromIndex + size);
        if (itemSize == null) {
          size = Math.min(size + pageSize, maxSize);
          break;
        }
        space += itemSize;
        ++size;
      }

      this.dispatch(new JReact.Action(ListActionType.UPDATE, { fromIndex, size }));
    }

    private getChildrenFromContainer() {
      return JReact.getInstance(JReact.getInstance(this.refs[ITEMS_CONTAINER]).refs[ITEMS_TRANSLATE]).refs[ITEMS_REFERENCE][0].children;;
    }

    private cacheSizes() {
      const {cache} = this;
      const {fromIndex} = this.state;

      const itemEls = this.getChildrenFromContainer();

      const sizeKey = getOffsetSizeKey(this.props.axis);
      for (let i = 0, l = itemEls.length; i < l; ++i) {
        cache[fromIndex + i] = (<any>itemEls[i])[sizeKey];
      }
    }

    private updateUniformFrame() {
      let {itemSize, itemsPerRow} = this.getItemSizeAndItemsPerRow();
      const {start, end} = this.getStartAndEnd();
      const {fromIndex, size} = this.constrain(
        Math.floor(start / itemSize) * itemsPerRow,
        (Math.ceil((end - start) / itemSize) + 1) * itemsPerRow,
        itemsPerRow,
        this.props
        );

      this.dispatch(new JReact.Action(ListActionType.UPDATE, { itemsPerRow, fromIndex, itemSize, size }));
    }

    private getItemSizeAndItemsPerRow(): { itemSize?: number, itemsPerRow?: number } {
      const {axis, useStaticSize} = this.props;
      let {itemSize, itemsPerRow} = this.state;
      if (useStaticSize && itemSize && itemsPerRow) {
        return { itemSize, itemsPerRow };
      }

      const itemEls = this.getChildrenFromContainer();

      if (!itemEls.length) return {};

      const firstEl = itemEls[0];
      
      // Firefox has a problem where it will return a *slightly* (less than
      // thousandths of a pixel) different size for the same element between
      // renders. This can cause an infinite render loop, so only change the
      // itemSize when it is significantly different.
      const firstElSize = (<any>firstEl)[getOffsetSizeKey(axis)];
      const delta = Math.abs(firstElSize - itemSize);
      if (isNaN(delta) || delta >= 1) itemSize = firstElSize;
      if (!itemSize) return {};
      const startKey = getOffsetStartKey(axis);
      const firstStart = (<any>firstEl)[startKey];
      itemsPerRow = 1;
      for (
        let item = itemEls[itemsPerRow];
        item && (<any>item)[startKey] === firstStart;
        item = itemEls[itemsPerRow]
        )++itemsPerRow;

      return { itemSize, itemsPerRow };
    }

    private getSpaceBefore(index: number, cache: Cache = {}) {
      if (cache[index] != null)
        return cache[index];
      
      // Try the static itemSize.
      const {itemSize, itemsPerRow} = this.state;
      if (itemSize)
        return cache[index] = Math.floor(index / itemsPerRow) * itemSize;
      
      // Find the closest space to index there is a cached value for.
      let fromIndex = index;
      while (fromIndex > 0 && cache[--fromIndex] == null);
      
      // Finally, accumulate sizes of items fromIndex - index.
      let space = cache[fromIndex] || 0;
      for (let i = fromIndex; i < index; ++i) {
        cache[i] = space;
        const itemSize = this.getSizeOf(i);
        if (itemSize == null)
          return null;
        space += itemSize;
      }

      return cache[index] = space;
    }

    private getSizeOf(index: number) {
      const {cache} = this;
      const {axis, itemSizeGetter, itemSizeEstimator, listType} = this.props;
      const {fromIndex, itemSize, size} = this.state;
      
      // Try the static itemSize.
      if (itemSize) return itemSize;
      
      // Try the itemSizeGetter.
      if (itemSizeGetter) return itemSizeGetter(index);
      
      // Try the cache.
      if (index in cache) return cache[index];
      
      // Try the itemSizeEstimator.
      if (itemSizeEstimator) return itemSizeEstimator(index, cache);
    }

    private constrain(fromIndex: number, size: number, itemsPerRow: number, {length, pageSize, listType}) {
      size = Math.max(size, pageSize);
      let mod = size % itemsPerRow;
      if (mod) size += itemsPerRow - mod;
      if (size > length) size = length;
      fromIndex = !fromIndex ? 0 : Math.max(Math.min(fromIndex, length - size), 0);

      if (mod = fromIndex % itemsPerRow) {
        fromIndex -= mod;
        size += mod;
      }

      return { fromIndex, size };
    }

    private scrollTo(index: number) {
      if (index != null)
        this.setScroll(this.getSpaceBefore(index));
    }

    private renderItems(offset: number): JReact.Component<any, any, any, any> {
      const {itemRenderer, itemsRenderer} = this.props;
      const {fromIndex, size} = this.state;
      const items: JReact.ComponentArray = [];

      for (let i = 0; i < size; ++i)
        items.push(itemRenderer(fromIndex + i, i, i === 0, offset, Math.max(0, this.scroll)));

      this.items = items;
      return itemsRenderer(items, ITEMS_REFERENCE);
    }

    public shouldComponentUpdate(nextProps: ListProps, nextState: ListState): boolean {
      if (this.props.fixedHeader)
        return true;
      return super.shouldComponentUpdate(nextProps, nextState);
    }

    public render() {

      const {axis, length, listType, useTranslate3d} = this.props;
      const {fromIndex, itemsPerRow} = this.state;

      const cache: Cache = {};
      const offset = this.getSpaceBefore(fromIndex, cache);

      const items = this.renderItems(offset);

      const style: React.CSSProperties = { position: 'relative' };
      const bottom = Math.ceil(length / itemsPerRow) * itemsPerRow;
      const size = this.getSpaceBefore(bottom, cache);
      if (size) {
        (<any>style)[getSizeKey(axis)] = size;
        if (axis === Axis.x)
          style.overflowX = 'hidden';
      }
      const x = axis === Axis.x ? offset : 0;
      const y = axis === Axis.y ? offset : 0;
      const transform = useTranslate3d ?
        `translate3d(${x}px, ${y}px, 0)` :
        `translate(${x}px, ${y}px)`;

      const listStyle = {
        msTransform: transform,
        WebkitTransform: transform,
        transform
      };

      return JReact.createElement(
        'div',
        { style: style, ref: ITEMS_CONTAINER },
        JReact.createElement(
          'div',
          { style: listStyle, ref: ITEMS_TRANSLATE },
          items
          )
        );
    }
  }
}
