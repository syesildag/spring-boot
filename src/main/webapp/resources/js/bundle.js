var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/tsd.d.ts"/>
var Serkan;
(function (Serkan) {
    'use strict';
    Serkan.ENTER_KEY = 13;
    Serkan.ESCAPE_KEY = 27;
    Serkan.KEY_CODE = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40
    };
    Serkan.FREEZER_TODOS = 'freezerTodos';
    Serkan.LAG = 500;
    (function (Status) {
        Status[Status["EDITING"] = 0] = "EDITING";
        Status[Status["READY"] = 1] = "READY";
        Status[Status["LOADING"] = 2] = "LOADING";
        Status[Status["DELETING"] = 3] = "DELETING";
        Status[Status["UPDATING"] = 4] = "UPDATING";
    })(Serkan.Status || (Serkan.Status = {}));
    var Status = Serkan.Status;
    ;
    (function (Filter) {
        Filter[Filter["ALL"] = 0] = "ALL";
        Filter[Filter["COMPLETED"] = 1] = "COMPLETED";
        Filter[Filter["ACTIVE"] = 2] = "ACTIVE";
    })(Serkan.Filter || (Serkan.Filter = {}));
    var Filter = Serkan.Filter;
    ;
    var Counter = (function (_super) {
        __extends(Counter, _super);
        function Counter(props, context) {
            _super.call(this, props, context);
            debugger;
            this.state = { clickCount: props && props.initialClickCount ? props.initialClickCount : 0 };
        }
        Counter.prototype.handleClick = function () {
            var _this = this;
            var p = new Promise(function (resolve, reject) {
                setTimeout(function (cc) {
                    this.setState({ clickCount: cc + 1 });
                    resolve('finished handleClick...');
                }.bind(_this), 500, _this.state.clickCount);
            });
            console.log('clicked...');
            p.then(function (s) { console.log("resolve: " + s); })
                .catch(function (e) { console.log("reject: " + JSON.stringify(e)); });
        };
        Counter.prototype.componentWillMount = function () {
            //Invoked once, both on the client and server, immediately before the initial rendering occurs.
            //If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
            debugger;
            console.log('componentWillMount');
        };
        Counter.prototype.componentDidMount = function () {
            //Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
            //At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation).
            //The componentDidMount() method of child components is invoked before that of parent components.
            //If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.
            debugger;
            console.log('componentDidMount');
        };
        Counter.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            //Invoked when a component is receiving new props.
            //This method is not called for the initial render.
            //Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState().
            //The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
            debugger;
            console.log('componentWillReceiveProps ' + JSON.stringify(nextProps) + '-' + JSON.stringify(nextContext));
        };
        Counter.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
            //Invoked before rendering when new props or state are being received.This method is not called for the initial render or when forceUpdate is used.
            //Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.
            //If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change.In addition, componentWillUpdate and componentDidUpdate will not be called.
            //By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place, but if you are careful to always treat state as immutable and to read only from props and state in render() then you can override shouldComponentUpdate with an implementation that compares the old props and state to their replacements.
            //If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to speed up your app.
            debugger;
            console.log('shouldComponentUpdate ' + JSON.stringify(nextProps) + '-' + JSON.stringify(nextState) + '-' + JSON.stringify(nextContext));
            return nextState.clickCount < 11;
        };
        Counter.prototype.componentWillUpdate = function (nextProps, nextState, nextContext) {
            //Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.
            //Use this as an opportunity to perform preparation before an update occurs.
            debugger;
            console.log('componentWillUpdate ' + JSON.stringify(nextProps) + '-' + JSON.stringify(nextState) + '-' + JSON.stringify(nextContext));
        };
        Counter.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
            //Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.
            //Use this as an opportunity to operate on the DOM when the component has been updated.
            debugger;
            console.log('componentDidUpdate ' + JSON.stringify(prevProps) + '-' + JSON.stringify(prevState) + '-' + JSON.stringify(prevContext));
        };
        Counter.prototype.componentWillUnmount = function () {
            //Invoked immediately before a component is unmounted from the DOM.
            //Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
            debugger;
            console.log('componentWillUnmount');
        };
        Counter.prototype.render = function () {
            //      return (
            //        <h2 className="xxx" onClick={this.handleClick.bind(this)}>
            //          <span>
            //            Click me! Number of clicks: {this.state.clickCount}
            //          </span>
            //          <svg width="30" height="30">
            //            <circle r={10 + this.state.clickCount} cx="15" cy = "15" />
            //          </svg>
            //        </h2>
            //      );
            debugger;
            return React.DOM.h2({ className: 'xxx', onClick: this.handleClick.bind(this) }, React.DOM.span({}, 'Click me! Number of clicks: ' + this.state.clickCount), React.DOM.svg({ width: 30, height: 30 }, React.DOM.circle({ r: 10 + this.state.clickCount, cx: 15, cy: 15 })));
            //React.DOM.span({ dangerouslySetInnerHTML: { __html: React.renderToString(React.DOM.svg({ width: 30, height: 30 }, React.DOM.circle({ r: 10 + this.state.clickCount, cx: 15, cy: 15 }))) } }));
        };
        return Counter;
    }(React.Component));
    Serkan.Counter = Counter;
})(Serkan || (Serkan = {}));
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
var Serkan;
(function (Serkan) {
    var TodoFooter = (function (_super) {
        __extends(TodoFooter, _super);
        function TodoFooter(props, context) {
            _super.call(this, props, context);
            //this.state = { clickCount: props && props.initialClickCount ? props.initialClickCount : 0 };
        }
        TodoFooter.prototype.handleClearCompleted = function () {
            State.trigger('todo:clearCompleted');
        };
        TodoFooter.prototype.handleFilter = function (filter) {
            return function (e) {
                e.preventDefault();
                State.trigger('todo:filter', filter);
            };
        };
        TodoFooter.prototype.render = function () {
            var activeTodoWord = Utils.pluralize(this.props.count, 'item'), nowShowing = this.props.nowShowing, clearButton = null, allClass = nowShowing == Serkan.Filter.ALL ? 'selected' : '', activeClass = nowShowing == Serkan.Filter.ACTIVE ? 'selected' : '', completedClass = nowShowing == Serkan.Filter.COMPLETED ? 'selected' : '';
            if (this.props.completedCount > 0) {
                clearButton = React.DOM.button({
                    className: 'clear-completed',
                    onClick: this.handleClearCompleted.bind(this)
                }, 'Clear completed');
            }
            return React.DOM.footer({
                className: 'footer'
            }, React.DOM.span({ className: 'todo-count' }, this.props.count + ' ' + activeTodoWord + ' left'), React.DOM.ul({ className: 'filters' }, React.DOM.li(null, React.DOM.a({
                href: "#",
                className: 'allClass',
                onClick: this.handleFilter('all').bind(this)
            }, 'All')), React.DOM.li(null, React.DOM.a({
                href: "#",
                className: 'activeClass',
                onClick: this.handleFilter('active').bind(this)
            }, 'Active')), React.DOM.li(null, React.DOM.a({
                href: "#",
                className: 'completedClass',
                onClick: this.handleFilter('completed').bind(this)
            }, 'Completed'))), clearButton);
        };
        return TodoFooter;
    }(React.Component));
    Serkan.TodoFooter = TodoFooter;
})(Serkan || (Serkan = {}));
/// <reference path="../typings/tsd.d.ts"/>
var JReact;
(function (JReact) {
    'use strict';
    JReact.DEBUG = false;
    var INSTANCE = 'instance';
    var KEY = 'data-key';
    var STYLE = 'style';
    var CLASS = 'class';
    var ATTRIBUTE_MAP = {
        key: KEY,
        style: STYLE,
        className: CLASS,
        change: 'change',
        click: 'click',
        mouseup: 'mouseup',
        mousedown: 'mousedown',
        mousemove: 'mousemove',
        touchstart: 'touchstart',
        touchend: 'touchend',
        touchmove: 'touchmove',
        contextMenu: 'contextmenu'
    };
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
    var Action = (function () {
        function Action(type, payload, error, meta) {
            this.type = type;
            this.payload = payload;
            this.error = error;
            this.meta = meta;
        }
        return Action;
    }());
    JReact.Action = Action;
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    function camelCase(name) {
        return name
            .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }
    JReact.camelCase = camelCase;
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        if (separator === void 0) { separator = '_'; }
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }
    JReact.snake_case = snake_case;
    /**
     * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
     * characters such as '012ABC'. The reason why we are not using simply a number counter is that
     * the number string gets longer over time, and it can also overflow, where as the nextId
     * will grow much slower, it is a string, and it will never overflow.
     *
     * @returns {string} an unique alpha-numeric string
     */
    var uid = ['0', '0', '0'];
    function nextUid() {
        var index = uid.length, digit;
        while (index--) {
            digit = uid[index].charCodeAt(0);
            if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90 /*'Z'*/) {
                uid[index] = '0';
            }
            else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    }
    JReact.nextUid = nextUid;
    function getInstance(el) {
        return el.data(INSTANCE);
    }
    JReact.getInstance = getInstance;
    function setInstance(el, comp) {
        el.data(INSTANCE, comp);
    }
    function getInstanceKey(comp) {
        var componentKey = comp.getTag(), key = comp.props.key;
        if (testString(key))
            componentKey += '[' + KEY + '=' + key + ']';
        return componentKey;
    }
    function isSame(myProps, nextProps) {
        if (myProps === nextProps)
            return true;
        if (Object.keys(myProps).length === Object.keys(nextProps).length)
            return Object.keys(myProps).every(function (prop) {
                return myProps[prop] === nextProps[prop];
            });
        return false;
    }
    JReact.isSame = isSame;
    function NOOP() { }
    JReact.NOOP = NOOP;
    function testString(value) {
        return value != null && value !== '';
    }
    JReact.testString = testString;
    function isString(value) {
        return typeof value === "string";
    }
    JReact.isString = isString;
    function isNumber(value) {
        return typeof value === "number";
    }
    JReact.isNumber = isNumber;
    function isStringOrNumber(value) {
        return isString(value) || isNumber(value);
    }
    JReact.isStringOrNumber = isStringOrNumber;
    function createElement(jrc, props) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var childKeys = {};
        if (args.length > 1) {
            if (isStringOrNumber(args[0]))
                throw new Error('multiple children with string or number');
            args.forEach(function (child) {
                if (isStringOrNumber(child))
                    return;
                var comp = child, componentKey;
                if (!testString(comp.props.key))
                    throw new Error('partially defined child prop keys: ' + jrc);
                componentKey = getInstanceKey(comp);
                if (childKeys.hasOwnProperty(componentKey))
                    throw new Error('duplicate child prop keys: ' + jrc);
                else
                    childKeys[componentKey] = true;
            });
        }
        if (!props)
            props = {};
        props.children = args.length ? args : undefined;
        if (typeof jrc === 'function')
            return new jrc(props);
        else
            return new ComponentDOM(props, jrc);
    }
    JReact.createElement = createElement;
    function updateProps(comp, el, remove) {
        Object.keys(comp.props).forEach(function (key) {
            var keyMap, value = comp.props[key];
            if (ATTRIBUTE_MAP.hasOwnProperty(key)) {
                keyMap = ATTRIBUTE_MAP[key];
                if (typeof value === 'function') {
                    if (remove)
                        el.unbind(keyMap);
                    else
                        el.bind(keyMap, value);
                }
                else if (key === STYLE) {
                    Object.keys(value).forEach(function (style) {
                        el.css(style, remove ? '' : value[style]);
                    });
                }
                else if (remove)
                    el.removeAttr(keyMap);
                else
                    el.attr(keyMap, value);
            }
        }, comp);
    }
    function render(comp, mount, sibling) {
        var childSibling, nextSibling, renderResult, oldComp, el, first = false, children = [], childKeyElements = {}, instanceKey = getInstanceKey(comp), oldHTML;
        el = mount.children(instanceKey);
        if (el.length) {
            if (JReact.DEBUG)
                oldHTML = el.get(0).outerHTML;
            //move component
            if (sibling) {
                nextSibling = sibling.next();
                if (!nextSibling || getInstanceKey(getInstance(nextSibling)) !== instanceKey) {
                    el.detach();
                    sibling.after(el);
                }
            }
            oldComp = getInstance(el);
            if (!oldComp.shouldComponentUpdate(comp.props, comp.state))
                return el;
            oldComp.componentWillReceiveProps(comp.props);
            updateProps(oldComp, el, true);
            oldComp.props = comp.props;
            updateProps(oldComp, el);
            comp = oldComp;
        }
        else {
            first = true;
            el = jQuery('<' + comp.getTag() + '/>');
            comp.setElement(el);
            setInstance(el, comp);
            comp.componentWillMount();
            updateProps(comp, el);
            if (sibling)
                sibling.after(el);
            else
                mount.prepend(el);
        }
        if (comp.props.templateID)
            el.html(JReact.getTemplateContent(comp.props.templateID));
        else if (comp.props.dangerouslySetInnerHTML)
            el.html(comp.props.dangerouslySetInnerHTML.__html);
        else {
            renderResult = comp.render();
            if (renderResult)
                children.push(renderResult);
            else if (comp.props.children)
                children = comp.props.children;
            //create children hash
            children.forEach(function (child) {
                if (child instanceof Component)
                    childKeyElements[getInstanceKey(child)] = true;
            });
            //unmount non-existant children
            el.children().each(function () {
                var jc = jQuery(this);
                if (!childKeyElements[getInstanceKey(getInstance(jc))])
                    unmountElement(jc);
            });
            //render children
            children.forEach(function (child) {
                if (child instanceof Component) {
                    childSibling = render(child, el, childSibling);
                    if (testString(child.props.ref))
                        comp.refs[child.props.ref] = childSibling;
                }
                else
                    el.text(child);
            });
        }
        if (first)
            comp.componentDidMount();
        else
            comp.componentDidUpdate();
        if (JReact.DEBUG && !first && oldHTML === el.get(0).outerHTML) {
            console.log("rendered but same:\n" + comp.constructor.name + "\n" + getInstanceKey(comp) + "\n" + oldHTML);
            console.dir(el.get(0));
        }
        return el;
    }
    function renderDOM(comp, m) {
        var el = render(comp, m);
        m.children().each(function () {
            if (this !== el[0])
                unmountElement(jQuery(this));
        });
    }
    JReact.renderDOM = renderDOM;
    function unmountElement(jc) {
        var old = getInstance(jc), promise;
        if (old) {
            promise = old.componentWillUnmount();
            old.element = null;
            old.state = null;
            old.refs = {};
        }
        if (promise)
            jQuery.when(promise).done(function (promise) { jc.remove; });
        else
            jc.remove();
    }
    var Component = (function () {
        function Component(props) {
            this.refs = {};
            var defaultProps = this.getDefaultProps();
            if (defaultProps)
                props = jQuery.extend(true, {}, defaultProps, props);
            this.props = props;
        }
        Component.prototype.getDefaultProps = function () {
            return null;
        };
        Component.prototype.getTag = function () {
            return 'span';
        };
        Component.prototype.getElement = function () {
            return this.element;
        };
        Component.prototype.setElement = function (element) {
            this.element = element;
        };
        Component.prototype.getState = function () {
            return this.state;
        };
        Component.prototype.setState = function (state) {
            this.state = state;
        };
        Component.prototype.render = function () {
            return null;
        };
        Component.prototype.reduce = function (state, action) {
            return state;
        };
        Component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            return (typeof nextState !== 'undefined' && !isSame(this.state, nextState)) || !isSame(this.props, nextProps);
        };
        Component.prototype.dispatch = function (action) {
            var nextState = this.reduce(this.state, action);
            if (this.shouldComponentUpdate(this.props, nextState)) {
                this.setState(nextState);
                JReact.renderDOM(this.render(), this.element);
            }
        };
        Component.prototype.componentWillReceiveProps = function (nextProps) { };
        Component.prototype.componentWillMount = function () { };
        Component.prototype.componentDidMount = function () { };
        Component.prototype.componentWillUnmount = function () { };
        Component.prototype.componentDidUpdate = function () { };
        return Component;
    }());
    JReact.Component = Component;
    var ComponentDOM = (function (_super) {
        __extends(ComponentDOM, _super);
        function ComponentDOM(props, tag) {
            _super.call(this, props);
            this.tag = tag;
        }
        ComponentDOM.prototype.getTag = function () {
            return this.tag;
        };
        ComponentDOM.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            if (!this.props.children && !nextProps.children)
                return false;
            if (this.props.children
                && this.props.children.length === 1
                && isStringOrNumber(this.props.children[0])
                && nextProps
                && nextProps.children.length === 1
                && isStringOrNumber(nextProps.children[0])
                && this.props.children[0] == nextProps.children[0])
                return false;
            return _super.prototype.shouldComponentUpdate.call(this, nextProps, nextState);
        };
        return ComponentDOM;
    }(Component));
    var templateCache = {};
    function getTemplateContent(id) {
        return templateCache[id];
    }
    JReact.getTemplateContent = getTemplateContent;
    function bootstrap(document) {
        var script, scriptType = 'text/html';
        for (var index = 0; index < document.scripts.length; index++) {
            script = document.scripts[index];
            if (script.type === scriptType && script.id)
                templateCache[script.id] = script.text;
        }
    }
    JReact.bootstrap = bootstrap;
})(JReact || (JReact = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var CounterActionType;
    (function (CounterActionType) {
        CounterActionType[CounterActionType["INCREMENT"] = 0] = "INCREMENT";
        CounterActionType[CounterActionType["DECREMENT"] = 1] = "DECREMENT";
        CounterActionType[CounterActionType["INCREMENT_ASYNC"] = 2] = "INCREMENT_ASYNC";
        CounterActionType[CounterActionType["DECREMENT_ASYNC"] = 3] = "DECREMENT_ASYNC";
    })(CounterActionType || (CounterActionType = {}));
    var Counter = (function (_super) {
        __extends(Counter, _super);
        function Counter(props) {
            _super.call(this, props);
            this.state = props.state;
        }
        //public shouldComponentUpdate(nextProps: any, nextState: any) {
        //  return !nextState || (nextState.times >= 0 && nextState.times <= 10);
        //}
        Counter.prototype.loading = function (loading, action) {
            if (loading === void 0) { loading = false; }
            switch (action.type) {
                case CounterActionType.INCREMENT_ASYNC:
                    return true;
                case CounterActionType.DECREMENT_ASYNC:
                    return true;
                default:
                    return false;
            }
        };
        Counter.prototype.times = function (times, action) {
            var _this = this;
            if (times === void 0) { times = 0; }
            switch (action.type) {
                case CounterActionType.INCREMENT:
                    return times >= 10 ? times : times + 1;
                case CounterActionType.DECREMENT:
                    return times <= 0 ? times : times - 1;
                case CounterActionType.INCREMENT_ASYNC:
                    setTimeout(function () {
                        _this.dispatch(new JReact.Action(CounterActionType.INCREMENT));
                    }, 1000);
                    return times;
                case CounterActionType.DECREMENT_ASYNC:
                    setTimeout(function () {
                        _this.dispatch(new JReact.Action(CounterActionType.DECREMENT));
                    }, 1000);
                default:
                    return times;
            }
        };
        Counter.prototype.reduce = function (state, action) {
            if (state === void 0) { state = {}; }
            return {
                times: this.times(state.times, action),
                loading: this.loading(state.loading, action)
            };
        };
        Counter.prototype.render = function () {
            var _this = this;
            return JReact.createElement('div', { className: 'counter-div' }, JReact.createElement('h2', { key: 1, className: 'counter-span' }, this.state.times + (this.state.loading ? '...' : '')), JReact.createElement('button', {
                key: 2,
                className: 'btn btn-primary',
                click: function () {
                    _this.dispatch(new JReact.Action(CounterActionType.DECREMENT_ASYNC));
                }
            }, 'DEC'), JReact.createElement('button', {
                key: 3,
                className: 'btn btn-primary',
                click: function () {
                    _this.dispatch(new JReact.Action(CounterActionType.INCREMENT_ASYNC));
                }
            }, 'INC'));
        };
        return Counter;
    }(JReact.Component));
    JReactComponents.Counter = Counter;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var MyListActionType;
    (function (MyListActionType) {
    })(MyListActionType || (MyListActionType = {}));
    var MyList = (function (_super) {
        __extends(MyList, _super);
        function MyList(props) {
            _super.call(this, props);
        }
        MyList.prototype.itemRenderer = function (index, key) {
            return JReact.createElement('div', { key: key }, 'x' + index + 'x');
        };
        MyList.prototype.itemsRenderer = function (items, ref) {
            return JReact.createElement.apply(JReact, ['div', { ref: ref }].concat(items));
        };
        MyList.prototype.render = function () {
            return JReact.createElement('div', { style: { overflow: 'auto', maxHeight: 100 } }, JReact.createElement(JReactComponents.List, {
                axis: JReactComponents.Axis.y,
                listType: JReactComponents.ListType.uniform,
                useStaticSize: false,
                useTranslate3d: true,
                pageSize: 10,
                threshold: 20,
                itemRenderer: this.itemRenderer,
                itemsRenderer: this.itemsRenderer,
                length: 100
            }));
        };
        return MyList;
    }(JReact.Component));
    JReactComponents.MyList = MyList;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
var Serkan;
(function (Serkan) {
    var TodoItem = (function (_super) {
        __extends(TodoItem, _super);
        function TodoItem(props, context) {
            _super.call(this, props, context);
            this.state = { editText: this.props.todo.title };
        }
        TodoItem.prototype.handleUpdate = function () {
            var todo = this.props.todo;
            State.trigger('todo:update', todo, todo.ui.input);
        };
        TodoItem.prototype.handleEdit = function () {
            this.props.todo.ui.set({ status: Serkan.Status.EDITING });
        };
        TodoItem.prototype.handleKeyDown = function (event) {
            if (event.which === Serkan.ESCAPE_KEY) {
                this.props.todo.ui.set({ status: Serkan.Status.READY });
            }
            else if (event.which === Serkan.ENTER_KEY) {
                this.handleUpdate();
            }
        };
        TodoItem.prototype.handleChange = function (event) {
            this.props.todo.ui.set({ input: event.target.value }).now();
        };
        TodoItem.prototype.handleToggle = function () {
            State.trigger('todo:toggle', this.props.todo);
        };
        TodoItem.prototype.handleDelete = function () {
            State.trigger('todo:delete', this.props.todo);
        };
        /**
         * Safely manipulate the DOM after updating the state when invoking
         * `this.props.onEdit()` in the `handleEdit` method above.
         * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
         * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
         */
        TodoItem.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
            var status = this.props.todo.ui.status;
            if (prevProps.todo.ui.status != status && status == Serkan.Status.EDITING) {
                this.editField.focus();
                this.editField.setSelectionRange(this.editField.value.length, this.editField.value.length);
            }
        };
        TodoItem.prototype.render = function () {
            var _this = this;
            var todo = this.props.todo, className = Serkan.Status[todo.ui.status].toLowerCase(), content = null;
            if (todo.model.completed)
                className += ' completed';
            if ([Serkan.Status.EDITING, Serkan.Status.UPDATING].indexOf(todo.ui.status) != -1) {
                content = React.DOM.div({ className: 'editingTodo' }, React.DOM.input({
                    ref: function (c) { return _this.editField = c; },
                    className: 'edit',
                    value: todo.ui.input,
                    onBlur: this.handleUpdate.bind(this),
                    onChange: this.handleChange.bind(this),
                    onKeyDown: this.handleKeyDown.bind(this)
                }), React.DOM.span({ className: 'loadingMessage' }, 'Saving...'));
            }
            else {
                content = React.DOM.div({ className: 'view' }, React.DOM.input({
                    type: 'checkbox',
                    className: 'toggle',
                    checked: todo.model.completed,
                    onChange: this.handleToggle.bind(this)
                }), React.DOM.label({ onDoubleClick: this.handleEdit.bind(this) }, todo.model.title), React.DOM.button({ className: 'destroy', onClick: this.handleDelete.bind(this) }), React.DOM.span({ className: 'loadingMessage' }, 'Deleting...'));
            }
            return React.DOM.li({ className: className }, content);
        };
        return TodoItem;
    }(React.Component));
    Serkan.TodoItem = TodoItem;
})(Serkan || (Serkan = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var Template = (function (_super) {
        __extends(Template, _super);
        function Template(props) {
            _super.call(this, props);
        }
        Template.prototype.onClick = function (e) {
            alert(this.props.label);
        };
        Template.prototype.componentDidMount = function () {
            this.getElement().find('[name=' + this.props.name + ']').click(this.onClick.bind(this));
        };
        return Template;
    }(JReact.Component));
    JReactComponents.Template = Template;
})(JReactComponents || (JReactComponents = {}));
var Utils;
(function (Utils) {
    'use strict';
    function uuid() {
        /*jshint bitwise:false */
        var i, random;
        var uuid = '';
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }
        return uuid;
    }
    Utils.uuid = uuid;
    function pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }
    Utils.pluralize = pluralize;
    function store(namespace, data) {
        if (data)
            return localStorage.setItem(namespace, JSON.stringify(data));
        var store = localStorage.getItem(namespace);
        return store ? JSON.parse(store) : null;
    }
    Utils.store = store;
    function extend() {
        var newObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
    Utils.extend = extend;
    /**
    * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
    * characters such as '012ABC'. The reason why we are not using simply a number counter is that
    * the number string gets longer over time, and it can also overflow, where as the nextId
    * will grow much slower, it is a string, and it will never overflow.
    *
    * @returns {string} an unique alpha-numeric string
    */
    var uid = ['0', '0', '0'];
    function nextUid() {
        var index = uid.length, digit;
        while (index--) {
            digit = uid[index].charCodeAt(0);
            if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90 /*'Z'*/) {
                uid[index] = '0';
            }
            else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    }
    Utils.nextUid = nextUid;
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    function camelCase(name) {
        return name
            .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }
    Utils.camelCase = camelCase;
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        separator = separator || '_';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }
    Utils.snake_case = snake_case;
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function debounced() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            }, wait);
            if (immediate && !timeout)
                func.apply(context, args);
        };
    }
    Utils.debounce = debounce;
    // Returns a function that can only be triggered every `delay` milliseconds.
    // In other words, the function will not be called unless it has been more
    // than `delay` milliseconds since the last call.
    function throttle(func, delay) {
        var recent;
        return function throttled() {
            var context = this;
            var args = arguments;
            var now = Utils.now();
            if (!recent || recent - now > delay) {
                func.apply(context, args);
                recent = now;
            }
        };
    }
    Utils.throttle = throttle;
    Utils.now = typeof window !== 'undefined' && window && window.performance ? window.performance.now.bind(window.performance) : Date.now;
    /**
     * @ngdoc function
     * @name angular.isUndefined
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is undefined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is undefined.
     */
    function isUndefined(value) { return typeof value === 'undefined'; }
    Utils.isUndefined = isUndefined;
    /**
     * @ngdoc function
     * @name angular.isDefined
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is defined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is defined.
     */
    function isDefined(value) { return typeof value !== 'undefined'; }
    Utils.isDefined = isDefined;
    /**
     * @ngdoc function
     * @name angular.isObject
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
     * considered to be objects. Note that JavaScript arrays are objects.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is an `Object` but not `null`.
     */
    function isObject(value) { return value != null && typeof value === 'object'; }
    Utils.isObject = isObject;
    /**
     * @ngdoc function
     * @name angular.isString
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `String`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `String`.
     */
    function isString(value) { return typeof value === 'string'; }
    Utils.isString = isString;
    /**
     * @ngdoc function
     * @name angular.isNumber
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `Number`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Number`.
     */
    function isNumber(value) { return typeof value === 'number'; }
    Utils.isNumber = isNumber;
    /**
     * @ngdoc function
     * @name angular.isDate
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a value is a date.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Date`.
     */
    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }
    Utils.isDate = isDate;
    /**
     * @ngdoc function
     * @name angular.isFunction
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `Function`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Function`.
     */
    function isFunction(value) { return typeof value === 'function'; }
    Utils.isFunction = isFunction;
    /**
     * Determines if a value is a regular expression object.
     *
     * @private
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `RegExp`.
     */
    function isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    }
    Utils.isRegExp = isRegExp;
    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }
    Utils.isFile = isFile;
    function isBlob(obj) {
        return toString.call(obj) === '[object Blob]';
    }
    Utils.isBlob = isBlob;
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    Utils.isBoolean = isBoolean;
    function isPromiseLike(obj) {
        return obj && isFunction(obj.then);
    }
    Utils.isPromiseLike = isPromiseLike;
})(Utils || (Utils = {}));
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./todoApp.ts"/>
/// <reference path="./utils.ts"/>
var State = new Freezer(Utils.store(Serkan.FREEZER_TODOS) || {
    todos: [],
    todoInput: '',
    status: Serkan.Status.READY,
    filter: Serkan.Filter.ALL
});
/**
 * Creates a new todo and add it to the list.
 * @param  {string} The todo content.
 */
State.on('todo:create', function (text) {
    // We set the app into a loading status
    // to let the user know
    State.get().set({ status: Serkan.Status.LOADING });
    // Call the fake server
    setTimeout(function () {
        State.get()
            .set({ status: Serkan.Status.READY, todoInput: '' })
            .todos.push({
            model: {
                title: text,
                id: Utils.uuid(),
                completed: false
            },
            ui: {
                status: Serkan.Status.READY,
                input: text
            }
        });
        // Save the state in localStorage
        Utils.store(Serkan.FREEZER_TODOS, State.get());
    }, Serkan.LAG);
});
/**
 * Deletes a todo.
 * @param  { FreezerNode } The todo to delete.
 */
State.on('todo:delete', function (todo) {
    // Since we are receiving the todo to delete from
    // the arguments. We can use directly instead of
    // making use of the state.
    var updated = todo.pivot()
        .ui.set({ status: Serkan.Status.DELETING });
    setTimeout(function () {
        // We just remove the todo from teh list
        State.get()
            .todos.splice(getTodoIndex(updated), 1);
        // Save the state in localStorage
        Utils.store(Serkan.FREEZER_TODOS, State.get());
    }, Serkan.LAG);
});
/**
 * Updates a todo text. Shows how a reaction can receive more
 * than one parameter.
 *
 * @param  {FreezerNode} todo   The todo to update.
 * @param  {string} text    The new text for the todo.
 */
State.on('todo:update', function (todo, text) {
    // Set the todo in an 'updating' state
    // to let the user know.
    // The updated node is returned.
    var updated = todo.pivot().ui.set({ status: Serkan.Status.UPDATING });
    // Call the server
    setTimeout(function () {
        var todo = State.get().todos[getTodoIndex(updated)];
        // We need to pivot in the node to modify multiple children.
        // Pivoting will make children changes return the updated
        // todo instead the updated child.
        todo.pivot()
            .model.set({ title: text })
            .ui.set({ status: Serkan.Status.READY });
        // Save the state in localStorage
        Utils.store(Serkan.FREEZER_TODOS, State.get());
    }, Serkan.LAG);
});
/**
 * Set a filter for the todos.
 * @param  {string} The filter to apply. It can be 'all'|'completed'|'active'.
 */
State.on('todo:filter', function (filter) {
    State.get().set({ filter: filter });
    // Save the state in localStorage
    Utils.store(Serkan.FREEZER_TODOS, State.get());
});
/**
 * Removes completed nodes from the list.
 */
State.on('todo:clearCompleted', function () {
    var i, todos = State.get().todos, toRemove = [];
    // Let's mark all the completed nodes as deleting
    for (var i = todos.length - 1; i >= 0; i--) {
        if (todos[i].model.completed) {
            // Pivoting makes us to have always the updated
            // reference to todos.
            todos[i].ui.set({ status: Serkan.Status.LOADING });
            todos = State.get().todos;
            toRemove.push(i);
        }
    }
    // Call the server
    setTimeout(function () {
        var todos = State.get().todos;
        // Remove all the completed children now.
        toRemove.forEach(function (i) {
            todos = todos.splice(i, 1);
        });
        // Save the state in localStorage
        Utils.store(Serkan.FREEZER_TODOS, State.get());
    }, Serkan.LAG);
});
/**
 * Marks a todo as complete or active.
 * @param {FreezerNode} The todo to toggle.
 */
State.on('todo:toggle', function (todo) {
    todo.model.set({ completed: !todo.model.completed });
    // Save the state in localStorage
    Utils.store(Serkan.FREEZER_TODOS, State.get());
});
/**
 * HELPER function. Find a todo in the state and return
 * its index in the array.
 * @param  {FreezerNode} todo The todo to find.
 * @return {Number|Boolean}   The index or false if not found.
 */
var getTodoIndex = function (todo) {
    var i, found = -1, todos = State.get().todos;
    for (i = 0; i < todos.length; i++) {
        // Since todos are immutable, we can use
        // direct comparison here instead of using uuid.
        if (todos[i] === todo) {
            found = i;
            break;
        }
    }
    return found;
};
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
/// <reference path="./state.ts"/>
var Serkan;
(function (Serkan) {
    var TodoApp = (function (_super) {
        __extends(TodoApp, _super);
        function TodoApp(props, context) {
            _super.call(this, props, context);
            //this.state = { clickCount: props && props.initialClickCount ? props.initialClickCount : 0 };
        }
        TodoApp.prototype.componentDidMount = function () {
            var _this = this;
            // Here the magic happens. Everytime that the
            // state is updated the app will re-render.
            // A real data driven app.
            State.on('update', function () { return _this.forceUpdate(); });
        };
        TodoApp.prototype.handleNewTodoKeyDown = function (event) {
            if (event.keyCode !== Serkan.ENTER_KEY) {
                return;
            }
            event.preventDefault();
            State.trigger('todo:create', State.get().todoInput.trim());
        };
        TodoApp.prototype.updateTodoInput = function (e) {
            // Update inputs needs to be done synchronously,
            // so we use the now method.
            // We don't need to use a reaction for this.
            State.get().set({ todoInput: e.target.value }).now();
        };
        TodoApp.prototype.render = function () {
            var state = State.get(), todos = state.todos, activeCount = 0, completedCount = 0, headerClass = 'header ' + state.status, main = null, footer = null;
            // Let's count todos
            todos.forEach(function (todo) {
                if (!todo.model.completed)
                    activeCount++;
                else
                    completedCount++;
            });
            if (todos.length) {
                footer = React.createElement(Serkan.TodoFooter, { count: activeCount, completedCount: completedCount, nowShowing: state.filter });
                main = React.DOM.section({ className: 'main' }, React.createElement(Serkan.TodoList, { todos: todos, filter: state.filter }));
            }
            return React.DOM.div(null, React.DOM.header({ className: headerClass }), React.DOM.h1(null, 'todos'), React.DOM.input({
                className: 'new-todo',
                ref: 'newField',
                value: state.todoInput,
                onChange: this.updateTodoInput.bind(this),
                placeholder: 'What needs to be done?',
                onKeyDown: this.handleNewTodoKeyDown.bind(this),
                autoFocus: true
            }), React.DOM.span({ className: 'loadingMessage' }, 'Saving...'), main, footer);
        };
        return TodoApp;
    }(React.Component));
    Serkan.TodoApp = TodoApp;
})(Serkan || (Serkan = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var AbstractBaseWidget = (function (_super) {
        __extends(AbstractBaseWidget, _super);
        function AbstractBaseWidget(props) {
            _super.call(this, props);
            this.CONTAINER = 'jreact-widget-' + this.getWidgetName() + '-container';
        }
        AbstractBaseWidget.prototype.getWidgetName = function () {
            throw new Error('should override widget name');
        };
        AbstractBaseWidget.prototype.getContainer = function () {
            return JReact.createElement.bind(null, 'span');
        };
        AbstractBaseWidget.prototype.getContainerProps = function () {
            return {};
        };
        AbstractBaseWidget.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            var update = !JReact.isSame(this.props.widgetOptions, nextProps.widgetOptions) || !JReact.isSame(this.state, nextState);
            if (!update && this.props.children !== nextProps.children) {
                update = (this.props.children != null && nextProps.children == null)
                    || (this.props.children == null && nextProps.children != null)
                    || (this.props.children != null && nextProps.children != null
                        && (this.props.children.length !== nextProps.children.length
                            || this.props.children.some(function (child, idx) {
                                var nextChild = nextProps.children[idx], same = (JReact.isStringOrNumber(child) && JReact.isStringOrNumber(nextChild) && child == nextChild)
                                    || ((child instanceof JReact.Component)
                                        && (nextChild instanceof JReact.Component)
                                        && child.constructor.name === nextChild.constructor.name
                                        && !child.shouldComponentUpdate(nextChild.props, nextChild.state));
                                return !same;
                            })));
            }
            if (!update) {
                this.props = nextProps;
                this.state = nextState;
            }
            return update;
        };
        AbstractBaseWidget.prototype.componentWillReceiveProps = function (nextProps) {
            this.componentWillUnmount();
        };
        AbstractBaseWidget.prototype.render = function () {
            return this.getContainer().apply(void 0, [jQuery.extend({
                className: this.CONTAINER,
                ref: this.CONTAINER
            }, this.getContainerProps())].concat(this.props.children));
        };
        return AbstractBaseWidget;
    }(JReact.Component));
    JReactComponents.AbstractBaseWidget = AbstractBaseWidget;
    var AbstractWidget = (function (_super) {
        __extends(AbstractWidget, _super);
        function AbstractWidget(props) {
            _super.call(this, props);
        }
        AbstractWidget.prototype.componentDidMount = function () {
            this.refs[this.CONTAINER][this.getWidgetName()](this.props.widgetOptions || {});
        };
        AbstractWidget.prototype.componentWillUnmount = function () {
            this.refs[this.CONTAINER][this.getWidgetName()]('destroy');
        };
        AbstractWidget.prototype.componentDidUpdate = function () {
            this.refs[this.CONTAINER][this.getWidgetName()](this.props.widgetOptions || {});
        };
        return AbstractWidget;
    }(AbstractBaseWidget));
    JReactComponents.AbstractWidget = AbstractWidget;
    var Resizable = (function (_super) {
        __extends(Resizable, _super);
        function Resizable(props) {
            _super.call(this, props);
        }
        Resizable.prototype.getWidgetName = function () {
            return 'resizable';
        };
        Resizable.prototype.getContainer = function () {
            return JReact.createElement.bind(null, 'div');
        };
        Resizable.prototype.onResizeStop = function (ui) {
            this.state = ui.size;
        };
        Resizable.prototype.getDefaultProps = function () {
            return {
                widgetOptions: {
                    grid: [1, 1],
                    stop: function (e, ui) {
                        JReact.getInstance(jQuery(e.target).parent()).onResizeStop(ui);
                    }
                }
            };
        };
        Resizable.prototype.getContainerProps = function () {
            if (this.state)
                return {
                    style: {
                        width: this.state.width,
                        height: this.state.height
                    }
                };
            return _super.prototype.getContainerProps.call(this);
        };
        return Resizable;
    }(AbstractWidget));
    JReactComponents.Resizable = Resizable;
    var Accordion = (function (_super) {
        __extends(Accordion, _super);
        function Accordion(props) {
            _super.call(this, props);
        }
        Accordion.prototype.getWidgetName = function () {
            return 'accordion';
        };
        return Accordion;
    }(AbstractWidget));
    JReactComponents.Accordion = Accordion;
    var LongPress = (function (_super) {
        __extends(LongPress, _super);
        function LongPress(props) {
            _super.call(this, props);
        }
        LongPress.prototype.getWidgetName = function () {
            return 'longpress';
        };
        LongPress.prototype.getDefaultProps = function () {
            return {
                widgetOptions: {
                    delay: 500,
                    shortCallback: JReact.NOOP,
                    longCallback: JReact.NOOP
                }
            };
        };
        LongPress.prototype.clearTimeout = function () {
            clearTimeout(LongPress.timeout);
            LongPress.timeout = null;
        };
        LongPress.prototype.onMouseDown = function (e) {
            var _this = this;
            if (e.button === 0)
                LongPress.timeout = setTimeout(function () {
                    _this.props.widgetOptions.longCallback.call(_this, e);
                    LongPress.timeout = null;
                }, this.props.widgetOptions.delay);
        };
        LongPress.prototype.onMouseUp = function (e) {
            if (e.button === 0 && LongPress.timeout != null) {
                this.clearTimeout();
                this.props.widgetOptions.shortCallback.call(this, e);
            }
        };
        LongPress.prototype.onMouseMove = function (e) {
            if (LongPress.timeout != null)
                this.clearTimeout();
        };
        //private onContextMenu(e: JQueryEventObject) {
        //  if (this.timeout == null && e.type !== 'mouseup') {
        //    this.props.widgetOptions.longCallback.call(this, e);
        //    e.preventDefault();
        //    e.stopPropagation();
        //    return false;
        //  }
        //}
        LongPress.prototype.getContainerProps = function () {
            return {
                //contextmenu: this.onContextMenu.bind(this),
                mousedown: this.onMouseDown.bind(this),
                mouseup: this.onMouseUp.bind(this),
                mousemove: this.onMouseMove.bind(this),
                touchstart: this.onMouseDown.bind(this),
                touchend: this.onMouseUp.bind(this),
                touchmove: this.onMouseMove.bind(this)
            };
        };
        LongPress.timeout = null;
        return LongPress;
    }(AbstractBaseWidget));
    JReactComponents.LongPress = LongPress;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/jqueryui/jqueryui.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
/// <reference path="./state.ts"/>
(function ($) {
    'use strict';
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);
            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
            this._setOption("disabled", this.element.prop("disabled"));
            //update input size.
            var txt = this.element.find(':selected').text();
            var wrappedTxt = $("<span style='display:none'>" + txt + "</span>").insertAfter(this.element);
            //$(this)[0].input.width($(wrappedTxt).width() < 135 ? 155 : $(wrappedTxt).width() + 20);
            $(wrappedTxt).remove();
        },
        _createAutocomplete: function () {
            var selected = this.element.children(":selected");
            var value = selected ? selected.text() : "";
            this.input = $("<input>")
                .data("originalselect", this.element)
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                .focus(function () { $(this).select(); })
                .mouseup(function (e) { e.preventDefault(); }) // dans certains navigateur, la s�lection sur le focus disparait au mouse up
                .addClass("custom-combobox-input")
                .autocomplete({
                delay: 0,
                minLength: 0,
                source: $.proxy(this, "_source")
            });
            $(this.element).data("filtered_input", this.input);
        },
        _createShowAllButton: function () {
            var input = this.input;
            var pShowAllButton = $("<a>");
            this.button = $("<a>")
                .attr("tabIndex", -1)
                .appendTo(this.wrapper)
                .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle")
                .click(function () {
                input.focus();
                // Pass empty string as value to search for, displaying all results
                input.autocomplete("search", "");
            });
            //try to fullfill synchronous rendering expectations of the javascript runtime
            setTimeout(function () {
                pShowAllButton.css({ height: input.outerHeight() - 2 });
            }, 0);
        },
        _setOption: function (key, value) {
            this._super(key, value);
            if (key === "disabled") {
                if (value) {
                    this.element.prop("disabled", true);
                    this.input.prop("disabled", true);
                    this.button.button("disable");
                }
                else {
                    this.element.prop("disabled", false);
                    this.input.prop("disabled", false);
                    this.button.button("enable");
                }
                return;
            }
        },
        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value != null && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },
        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var MyGridListActionType;
    (function (MyGridListActionType) {
    })(MyGridListActionType || (MyGridListActionType = {}));
    var MyGridList = (function (_super) {
        __extends(MyGridList, _super);
        function MyGridList(props) {
            _super.call(this, props);
            this.itemRenderer = this.itemRenderer.bind(this);
            this.itemsRenderer = this.itemsRenderer.bind(this);
        }
        MyGridList.prototype.itemsRenderer = function (items, ref) {
            return JReact.createElement.apply(JReact, ['div', { ref: ref }].concat(items));
        };
        MyGridList.prototype.itemRenderer = function (row, key) {
            var XLENGTH = 100, style = { display: "inline-block", width: "100px" };
            return JReact.createElement(
            //COLUMN
            JReactComponents.List, {
                axis: JReactComponents.Axis.x,
                key: key,
                pageSize: 10,
                threshold: 20,
                listType: JReactComponents.ListType.uniform,
                itemsRenderer: this.itemsRenderer,
                itemRenderer: function (col, key) { return JReact.createElement('div', { key: key, style: style }, 'x' + (col + (XLENGTH * row)) + 'x'); },
                length: XLENGTH
            });
        };
        MyGridList.prototype.render = function () {
            return JReact.createElement('div', { style: { overflow: 'auto', maxHeight: 100 } }, 
            //GRID
            JReact.createElement(JReactComponents.List, {
                axis: JReactComponents.Axis.y,
                key: 1,
                pageSize: 10,
                threshold: 20,
                listType: JReactComponents.ListType.uniform,
                useStaticSize: false,
                useTranslate3d: true,
                itemsRenderer: this.itemsRenderer,
                itemRenderer: this.itemRenderer,
                length: 1000
            }));
        };
        return MyGridList;
    }(JReact.Component));
    JReactComponents.MyGridList = MyGridList;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var Todo = (function (_super) {
        __extends(Todo, _super);
        function Todo(props) {
            _super.call(this, props);
        }
        Todo.prototype.componentDidMount = function () {
            this.refs[Todo.TODO_DIV].effect('highlight');
        };
        Todo.prototype.componentDidUpdate = function () {
            this.refs[Todo.TODO_DIV].effect('highlight');
        };
        Todo.prototype.render = function () {
            var _a = this.props, todo = _a.todo, todoClick = _a.todoClick;
            return JReact.createElement('div', {
                className: Todo.TODO_DIV + (todo.selected ? ' selected' : ''),
                style: {
                    backgroundColor: 'beige'
                },
                ref: Todo.TODO_DIV,
                click: function (e) {
                    if (todoClick)
                        todoClick.call(this, e, todo.message);
                }
            }, JReact.createElement('span', { className: 'todo-span', ref: 'todo-span' }, todo.message));
        };
        Todo.TODO_DIV = 'todo-div';
        return Todo;
    }(JReact.Component));
    JReactComponents.Todo = Todo;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var ITEMS_CONTAINER = 'items_container';
    var ITEMS_TRANSLATE = 'items_translate';
    var ITEMS_REFERENCE = 'items_reference';
    function getClientStartKey(axis) {
        return axis === Axis.x ? 'clientTop' : 'clientLeft';
    }
    function getClientSizeKey(axis) {
        return axis === Axis.x ? 'clientWidth' : 'clientHeight';
    }
    function getInnerSizeKey(axis) {
        return axis === Axis.x ? 'innerWidth' : 'innerHeight';
    }
    function getScrollSizeKey(axis) {
        return axis === Axis.x ? 'scrollWidth' : 'scrollHeight';
    }
    function getScrollStartKey(axis) {
        return axis === Axis.x ? 'scrollLeft' : 'scrollTop';
    }
    function getOffsetSizeKey(axis) {
        return axis === Axis.x ? 'offsetWidth' : 'offsetHeight';
    }
    function getOffsetStartKey(axis) {
        return axis === Axis.x ? 'offsetLeft' : 'offsetTop';
    }
    function getOverflowKey(axis) {
        return axis === Axis.x ? 'overflowX' : 'overflowY';
    }
    function getSizeKey(axis) {
        return axis === Axis.x ? 'width' : 'height';
    }
    (function (Axis) {
        Axis[Axis["x"] = 0] = "x";
        Axis[Axis["y"] = 1] = "y";
    })(JReactComponents.Axis || (JReactComponents.Axis = {}));
    var Axis = JReactComponents.Axis;
    (function (ListType) {
        ListType[ListType["uniform"] = 0] = "uniform";
        ListType[ListType["variable"] = 1] = "variable";
    })(JReactComponents.ListType || (JReactComponents.ListType = {}));
    var ListType = JReactComponents.ListType;
    var ListActionType;
    (function (ListActionType) {
        ListActionType[ListActionType["UPDATE"] = 0] = "UPDATE";
    })(ListActionType || (ListActionType = {}));
    var List = (function (_super) {
        __extends(List, _super);
        function List(props) {
            _super.call(this, props);
            var _a = this.props, initialIndex = _a.initialIndex, pageSize = _a.pageSize;
            var itemsPerRow = 1;
            var _b = this.constrain(initialIndex, pageSize, itemsPerRow, this.props), fromIndex = _b.fromIndex, size = _b.size;
            this.state = { fromIndex: fromIndex, size: size, itemsPerRow: itemsPerRow };
            this.cache = {};
        }
        List.prototype.getTag = function () {
            return 'div';
        };
        List.prototype.update = function (field, action, actionField) {
            if (field === void 0) { field = 1; }
            switch (action.type) {
                case ListActionType.UPDATE:
                    if (typeof actionField === 'undefined')
                        return field;
                    else
                        return actionField;
                default:
                    return field;
            }
        };
        List.prototype.reduce = function (state, action) {
            if (state === void 0) { state = {}; }
            return {
                itemsPerRow: this.update(state.itemsPerRow, action, action.payload.itemsPerRow),
                fromIndex: this.update(state.fromIndex, action, action.payload.fromIndex),
                itemSize: this.update(state.itemSize, action, action.payload.itemSize),
                size: this.update(state.size, action, action.payload.size)
            };
        };
        List.prototype.componentWillReceiveProps = function (nextProps) {
            var _a = this.state, fromIndex = _a.fromIndex, size = _a.size, itemsPerRow = _a.itemsPerRow;
            this.setState(this.constrain(fromIndex, size, itemsPerRow, nextProps));
        };
        List.prototype.componentDidMount = function () {
            this.updateFrame = this.updateFrame.bind(this);
            jQuery(window).bind('resize', this.updateFrame);
            this.updateFrame();
        };
        List.prototype.componentDidUpdate = function () {
            this.updateFrame();
        };
        List.prototype.componentWillUnmount = function () {
            jQuery(window).unbind('resize', this.updateFrame);
            jQuery(this.scrollParent).unbind('scroll', this.updateFrame);
        };
        List.prototype.updateFrame = function () {
            this.updateScrollParent();
            switch (this.props.listType) {
                case ListType.variable: return this.updateVariableFrame();
                case ListType.uniform: return this.updateUniformFrame();
            }
        };
        List.prototype.updateScrollParent = function () {
            var prev = this.scrollParent;
            this.scrollParent = this.getScrollParent();
            if (prev === this.scrollParent)
                return;
            if (prev)
                jQuery(prev).unbind('scroll', this.updateFrame);
            jQuery(this.scrollParent).bind('scroll', this.updateFrame);
        };
        List.prototype.getScrollParent = function () {
            var _a = this.props, axis = _a.axis, scrollParentGetter = _a.scrollParentGetter;
            if (scrollParentGetter)
                return scrollParentGetter();
            var el = this.getElement().get(0);
            var overflowKey = getOverflowKey(axis);
            while (el = el.parentElement) {
                switch (window.getComputedStyle(el)[overflowKey]) {
                    case 'auto':
                    case 'scroll':
                    case 'overlay':
                        return el;
                }
            }
            return window;
        };
        List.prototype.getOffset = function (el) {
            var axis = this.props.axis;
            var offset = el[getClientStartKey(axis)] || 0;
            var offsetKey = getOffsetStartKey(axis);
            do
                offset += el[offsetKey] || 0;
            while (el = el.offsetParent);
            return offset;
        };
        List.prototype.getScroll = function () {
            var scrollParent = this.scrollParent;
            var axis = this.props.axis;
            var scrollKey = getScrollStartKey(axis);
            var actual = scrollParent === window ?
                // Firefox always returns document.body[scrollKey] as 0 and Chrome/Safari
                // always return document.documentElement[scrollKey] as 0, so take
                // whichever has a value.
                document.body[scrollKey] || document.documentElement[scrollKey] :
                scrollParent[scrollKey];
            var max = this.getScrollSize() - this.getViewportSize();
            var scroll = Math.max(0, Math.min(actual, max));
            var el = this.getElement().get(0);
            return this.getOffset(scrollParent) + scroll - this.getOffset(el);
        };
        List.prototype.setScroll = function (offset) {
            var scrollParent = this.scrollParent;
            var axis = this.props.axis;
            offset += this.getOffset(this.getElement().get(0));
            if (scrollParent === window)
                return window.scrollTo(0, offset);
            offset -= this.getOffset(this.scrollParent);
            scrollParent[getScrollStartKey(axis)] = offset;
        };
        List.prototype.getViewportSize = function () {
            var scrollParent = this.scrollParent;
            var axis = this.props.axis;
            return scrollParent === window ?
                window[getInnerSizeKey(axis)] :
                scrollParent[getClientSizeKey(axis)];
        };
        List.prototype.getScrollSize = function () {
            var scrollParent = this.scrollParent;
            var key = getScrollSizeKey(this.props.axis);
            return scrollParent === window ?
                Math.max(document.body[key], document.documentElement[key]) :
                scrollParent[key];
        };
        List.prototype.getStartAndEnd = function (threshold) {
            if (threshold === void 0) { threshold = this.props.threshold; }
            var _a = this.props, itemSizeGetter = _a.itemSizeGetter, listType = _a.listType, length = _a.length;
            var scroll = this.getScroll();
            var start = Math.max(0, scroll - threshold);
            var end = scroll + this.getViewportSize() + threshold;
            if (listType === ListType.uniform || itemSizeGetter)
                end = Math.min(end, this.getSpaceBefore(length));
            return { start: start, end: end };
        };
        List.prototype.updateVariableFrame = function () {
            if (!this.props.itemSizeGetter)
                this.cacheSizes();
            var _a = this.getStartAndEnd(), start = _a.start, end = _a.end;
            var _b = this.props, length = _b.length, pageSize = _b.pageSize;
            var space = 0;
            var fromIndex = 0;
            var size = 0;
            var maxFrom = length - 1;
            while (fromIndex < maxFrom) {
                var itemSize = this.getSizeOf(fromIndex);
                if (itemSize == null || space + itemSize > start)
                    break;
                space += itemSize;
                ++fromIndex;
            }
            var maxSize = length - fromIndex;
            while (size < maxSize && space < end) {
                var itemSize = this.getSizeOf(fromIndex + size);
                if (itemSize == null) {
                    size = Math.min(size + pageSize, maxSize);
                    break;
                }
                space += itemSize;
                ++size;
            }
            this.dispatch(new JReact.Action(ListActionType.UPDATE, { fromIndex: fromIndex, size: size }));
        };
        List.prototype.getChildrenFromContainer = function () {
            return JReact.getInstance(JReact.getInstance(this.refs[ITEMS_CONTAINER]).refs[ITEMS_TRANSLATE]).refs[ITEMS_REFERENCE][0].children;
            ;
        };
        List.prototype.cacheSizes = function () {
            var cache = this.cache;
            var fromIndex = this.state.fromIndex;
            var itemEls = this.getChildrenFromContainer();
            var sizeKey = getOffsetSizeKey(this.props.axis);
            for (var i = 0, l = itemEls.length; i < l; ++i) {
                cache[fromIndex + i] = itemEls[i][sizeKey];
            }
        };
        List.prototype.updateUniformFrame = function () {
            var _a = this.getItemSizeAndItemsPerRow(), itemSize = _a.itemSize, itemsPerRow = _a.itemsPerRow;
            var _b = this.getStartAndEnd(), start = _b.start, end = _b.end;
            var _c = this.constrain(Math.floor(start / itemSize) * itemsPerRow, (Math.ceil((end - start) / itemSize) + 1) * itemsPerRow, itemsPerRow, this.props), fromIndex = _c.fromIndex, size = _c.size;
            this.dispatch(new JReact.Action(ListActionType.UPDATE, { itemsPerRow: itemsPerRow, fromIndex: fromIndex, itemSize: itemSize, size: size }));
        };
        List.prototype.getItemSizeAndItemsPerRow = function () {
            var _a = this.props, axis = _a.axis, useStaticSize = _a.useStaticSize;
            var _b = this.state, itemSize = _b.itemSize, itemsPerRow = _b.itemsPerRow;
            if (useStaticSize && itemSize && itemsPerRow) {
                return { itemSize: itemSize, itemsPerRow: itemsPerRow };
            }
            var itemEls = this.getChildrenFromContainer();
            if (!itemEls.length)
                return {};
            var firstEl = itemEls[0];
            // Firefox has a problem where it will return a *slightly* (less than
            // thousandths of a pixel) different size for the same element between
            // renders. This can cause an infinite render loop, so only change the
            // itemSize when it is significantly different.
            var firstElSize = firstEl[getOffsetSizeKey(axis)];
            var delta = Math.abs(firstElSize - itemSize);
            if (isNaN(delta) || delta >= 1)
                itemSize = firstElSize;
            if (!itemSize)
                return {};
            var startKey = getOffsetStartKey(axis);
            var firstStart = firstEl[startKey];
            itemsPerRow = 1;
            for (var item = itemEls[itemsPerRow]; item && item[startKey] === firstStart; item = itemEls[itemsPerRow])
                ++itemsPerRow;
            return { itemSize: itemSize, itemsPerRow: itemsPerRow };
        };
        List.prototype.getSpaceBefore = function (index, cache) {
            if (cache === void 0) { cache = {}; }
            if (cache[index] != null)
                return cache[index];
            // Try the static itemSize.
            var _a = this.state, itemSize = _a.itemSize, itemsPerRow = _a.itemsPerRow;
            if (itemSize)
                return cache[index] = Math.floor(index / itemsPerRow) * itemSize;
            // Find the closest space to index there is a cached value for.
            var fromIndex = index;
            while (fromIndex > 0 && cache[--fromIndex] == null)
                ;
            // Finally, accumulate sizes of items fromIndex - index.
            var space = cache[fromIndex] || 0;
            for (var i = fromIndex; i < index; ++i) {
                cache[i] = space;
                var itemSize_1 = this.getSizeOf(i);
                if (itemSize_1 == null)
                    break;
                space += itemSize_1;
            }
            return cache[index] = space;
        };
        List.prototype.getSizeOf = function (index) {
            var cache = this.cache;
            var _a = this.props, axis = _a.axis, itemSizeGetter = _a.itemSizeGetter, itemSizeEstimator = _a.itemSizeEstimator, listType = _a.listType;
            var _b = this.state, fromIndex = _b.fromIndex, itemSize = _b.itemSize, size = _b.size;
            // Try the static itemSize.
            if (itemSize)
                return itemSize;
            // Try the itemSizeGetter.
            if (itemSizeGetter)
                return itemSizeGetter(index);
            // Try the cache.
            if (index in cache)
                return cache[index];
            // Try the itemSizeEstimator.
            if (itemSizeEstimator)
                return itemSizeEstimator(index, cache);
        };
        List.prototype.constrain = function (fromIndex, size, itemsPerRow, _a) {
            var length = _a.length, pageSize = _a.pageSize, listType = _a.listType;
            size = Math.max(size, pageSize);
            var mod = size % itemsPerRow;
            if (mod)
                size += itemsPerRow - mod;
            if (size > length)
                size = length;
            fromIndex = !fromIndex ? 0 : Math.max(Math.min(fromIndex, length - size), 0);
            if (mod = fromIndex % itemsPerRow) {
                fromIndex -= mod;
                size += mod;
            }
            return { fromIndex: fromIndex, size: size };
        };
        List.prototype.scrollTo = function (index) {
            if (index != null)
                this.setScroll(this.getSpaceBefore(index));
        };
        List.prototype.renderItems = function () {
            var _a = this.props, itemRenderer = _a.itemRenderer, itemsRenderer = _a.itemsRenderer;
            var _b = this.state, fromIndex = _b.fromIndex, size = _b.size;
            var items = [];
            for (var i = 0; i < size; ++i)
                items.push(itemRenderer(fromIndex + i, i));
            return itemsRenderer(items, ITEMS_REFERENCE);
        };
        List.prototype.render = function () {
            var _a = this.props, axis = _a.axis, length = _a.length, listType = _a.listType, useTranslate3d = _a.useTranslate3d;
            var _b = this.state, fromIndex = _b.fromIndex, itemsPerRow = _b.itemsPerRow;
            var items = this.renderItems();
            var style = { position: 'relative' };
            var cache = {};
            var bottom = Math.ceil(length / itemsPerRow) * itemsPerRow;
            var size = this.getSpaceBefore(bottom, cache);
            if (size) {
                style[getSizeKey(axis)] = size;
                if (axis === Axis.x)
                    style.overflowX = 'hidden';
            }
            var offset = this.getSpaceBefore(fromIndex, cache);
            var x = axis === Axis.x ? offset : 0;
            var y = axis === Axis.y ? offset : 0;
            var transform = useTranslate3d ?
                "translate3d(" + x + "px, " + y + "px, 0)" :
                "translate(" + x + "px, " + y + "px)";
            var listStyle = {
                msTransform: transform,
                WebkitTransform: transform,
                transform: transform
            };
            return JReact.createElement('div', { style: style, ref: ITEMS_CONTAINER }, JReact.createElement('div', { style: listStyle, ref: ITEMS_TRANSLATE }, items));
        };
        return List;
    }(JReact.Component));
    JReactComponents.List = List;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
var Serkan;
(function (Serkan) {
    var TodoList = (function (_super) {
        __extends(TodoList, _super);
        function TodoList(props, context) {
            _super.call(this, props, context);
            //this.state = { clickCount: props && props.initialClickCount ? props.initialClickCount : 0 };
        }
        TodoList.prototype.render = function () {
            var todoItems = [], filter = this.props.filter;
            this.props.todos.forEach(function (todo) {
                if (filter === Serkan.Filter.ALL || filter == Serkan.Filter.COMPLETED && todo.model.completed || filter == Serkan.Filter.ACTIVE && !todo.model.completed)
                    todoItems.push(React.createElement(Serkan.TodoItem, { todo: todo, key: todo.model.id }));
            });
            return (_a = React.DOM).ul.apply(_a, [{ className: 'todo-list' }].concat(todoItems));
            var _a;
        };
        TodoList.prototype.shouldComponentUpdate = function (nextProps) {
            // Thanks to freezer's immutabilty we can check if there
            // has been a change in any todo just comparing the todo
            // object. This will boost our app performance drastically.
            return nextProps.todos != this.props.todos ||
                nextProps.filter != this.props.filter;
        };
        return TodoList;
    }(React.Component));
    Serkan.TodoList = TodoList;
})(Serkan || (Serkan = {}));
/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var JReactComponents;
(function (JReactComponents) {
    var Todos = (function (_super) {
        __extends(Todos, _super);
        function Todos(props) {
            _super.call(this, props);
        }
        Todos.shortPress = function (e) {
            alert('shortpress');
        };
        Todos.longPress = function (e) {
            alert('longpress');
        };
        Todos.prototype.render = function () {
            var maps = [], active = 0, idx = 0, todoClick = this.props.todoClick;
            this.props.todos.forEach(function (todo) {
                var jReactComponent = JReact.createElement(JReactComponents.Todo, {
                    key: todo.key,
                    todo: todo,
                    todoClick: todoClick
                });
                if (todo.active)
                    active = idx;
                maps.push(JReact.createElement('span', { key: todo.key + 'header' }, todo.key + ' header'));
                maps.push(todo.resizable
                    ? JReact.createElement(JReactComponents.Resizable, {
                        key: todo.key,
                        className: 'resizable'
                    }, jReactComponent)
                    : JReact.createElement(JReactComponents.LongPress, {
                        key: todo.key,
                        className: 'longpress',
                        widgetOptions: {
                            longCallback: Todos.longPress,
                            shortCallback: Todos.shortPress
                        }
                    }, jReactComponent));
                idx++;
            });
            return JReact.createElement('div', { className: 'navbar-default', ref: 'todos-div' }, JReact.createElement.apply(JReact, [JReactComponents.Accordion, {
                widgetOptions: {
                    active: active,
                    heightStyle: 'content',
                    collapsible: true
                }
            }].concat(maps)));
        };
        return Todos;
    }(JReact.Component));
    JReactComponents.Todos = Todos;
})(JReactComponents || (JReactComponents = {}));
/// <reference path="../typings/react/react.d.ts"/>
/// <reference path="../typings/react-bootstrap/react-bootstrap.d.ts"/>
/// <reference path="../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./counter.ts"/>
/// <reference path="./state.ts"/>
var Serkan;
(function (Serkan) {
    var ModalDemo = (function (_super) {
        __extends(ModalDemo, _super);
        function ModalDemo(props, context) {
            _super.call(this, props, context);
            this.state = { showModal: false };
        }
        ModalDemo.prototype.close = function () {
            this.setState({ showModal: false });
        };
        ModalDemo.prototype.open = function () {
            this.setState({ showModal: true });
        };
        ModalDemo.prototype.render = function () {
            var popover = React.createElement(ReactBootstrap.Popover, {title: "popover"}, "very popover. such engagement");
            var tooltip = React.createElement(ReactBootstrap.Tooltip, null, "wow.");
            return (React.createElement("div", null, React.createElement("p", null, "Click to get the full Modal experience!"), React.createElement(ReactBootstrap.Button, {bsStyle: "primary", bsSize: "large", onClick: this.open.bind(this)}, "Launch demo modal"), React.createElement(ReactBootstrap.Modal, {show: this.state.showModal, onHide: this.close.bind(this)}, React.createElement(ReactBootstrap.ModalHeader, {closeButton: true}, React.createElement(ReactBootstrap.Modal.Title, null, "Modal heading")), React.createElement(ReactBootstrap.Modal.Body, null, React.createElement("h4", null, "Text in a modal"), React.createElement("p", null, "Duis mollis, est non commodo luctus, nisi erat porttitor ligula."), React.createElement("h4", null, "Popover in a modal"), React.createElement("p", null, "there is a ", React.createElement(ReactBootstrap.OverlayTrigger, {overlay: popover}, React.createElement("a", {href: "#"}, "popover")), " here"), React.createElement("h4", null, "Tooltips in a modal"), React.createElement("p", null, "there is a ", React.createElement(ReactBootstrap.OverlayTrigger, {overlay: tooltip}, React.createElement("a", {href: "#"}, "tooltip")), " here"), React.createElement("hr", null), React.createElement("h4", null, "Overflowing text to show scroll behavior"), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."), React.createElement("p", null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."), React.createElement("p", null, "Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.")), React.createElement(ReactBootstrap.Modal.Footer, null, React.createElement(ReactBootstrap.Button, {onClick: this.close.bind(this)}, "Close")))));
        };
        return ModalDemo;
    }(React.Component));
    Serkan.ModalDemo = ModalDemo;
})(Serkan || (Serkan = {}));
//# sourceMappingURL=bundle.js.map