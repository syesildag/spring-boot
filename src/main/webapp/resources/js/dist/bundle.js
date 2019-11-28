/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/webapp/resources/typescript/bundle.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/webapp/resources/typescript/bundle.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/resources/typescript/bundle.ts ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/main/webapp/resources/typescript/utils.ts");
/* harmony import */ var _genericFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./genericFactory */ "./src/main/webapp/resources/typescript/genericFactory.ts");
/* harmony import */ var _jreact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jreact */ "./src/main/webapp/resources/typescript/jreact.ts");
/* harmony import */ var _jreactWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jreactWidget */ "./src/main/webapp/resources/typescript/jreactWidget.ts");




window.Utils = _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"];
window.GenericFactory = _genericFactory__WEBPACK_IMPORTED_MODULE_1__["GenericFactory"];
window.JReact = _jreact__WEBPACK_IMPORTED_MODULE_2__["JReact"];
window.CustomCombobox = _jreactWidget__WEBPACK_IMPORTED_MODULE_3__["RslComponents"].CustomCombobox;


/***/ }),

/***/ "./src/main/webapp/resources/typescript/genericFactory.ts":
/*!****************************************************************!*\
  !*** ./src/main/webapp/resources/typescript/genericFactory.ts ***!
  \****************************************************************/
/*! exports provided: GenericFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericFactory", function() { return GenericFactory; });
var GenericFactory;
(function (GenericFactory) {
    'use strict';
    class Base {
        constructor(...classList) {
            this.classMap = {};
            for (let clazz of classList) {
                let key = new clazz().supply();
                this.classMap[key.toString()] = clazz;
            }
        }
        create(key, ...args) {
            let clazz = this.classMap[key.toString()];
            return new clazz(args);
        }
    }
    GenericFactory.Base = Base;
})(GenericFactory || (GenericFactory = {}));


/***/ }),

/***/ "./src/main/webapp/resources/typescript/jreact.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/resources/typescript/jreact.ts ***!
  \********************************************************/
/*! exports provided: JReact */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JReact", function() { return JReact; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/main/webapp/resources/typescript/utils.ts");

var JReact;
(function (JReact) {
    'use strict';
    JReact.DEBUG = false;
    JReact.TEST = false;
    JReact.INSTANCE = 'instance';
    JReact.DATA_KEY = 'data-key';
    JReact.RSL_VALID_REQUIRED = 'rsl-valid-required';
    JReact.RSL_INVALID_REQUIRED = 'rsl-invalid-required';
    JReact.RSL_VALID_PATTERN = 'rsl-valid-pattern';
    JReact.RSL_INVALID_PATTERN = 'rsl-invalid-pattern';
    JReact.DATA_FIXED_ITEM = 'data-fixed-item';
    JReact.DATA_REQUIRED = 'data-required';
    JReact.DATA_PATTERN = 'data-pattern';
    JReact.VALUE = '_value';
    const STYLE = 'style';
    const CLASS = 'class';
    let ATTRIBUTE_MAP = {
        key: JReact.DATA_KEY,
        className: CLASS
    };
    [STYLE,
        JReact.VALUE,
        JReact.DATA_REQUIRED,
        JReact.DATA_PATTERN,
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
    ].forEach(key => ATTRIBUTE_MAP[key] = key);
    class Action {
        constructor(type, payload, error, meta) {
            this.type = type;
            this.payload = payload;
            this.error = error;
            this.meta = meta;
        }
    }
    JReact.Action = Action;
    function getInstance(el) {
        return el.data(JReact.INSTANCE);
    }
    JReact.getInstance = getInstance;
    function setInstance(el, comp) {
        el.data(JReact.INSTANCE, comp);
    }
    function getInstanceKey(comp) {
        return getInstanceKeyFromTag(comp.getTag(), comp.props.key);
    }
    JReact.getInstanceKey = getInstanceKey;
    function getInstanceKeyFromTag(tag, key) {
        let componentKey = tag;
        if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].testString(key))
            componentKey += '[' + JReact.DATA_KEY + '=' + key + ']';
        return componentKey;
    }
    JReact.getInstanceKeyFromTag = getInstanceKeyFromTag;
    function isSame(myProps, nextProps) {
        if (myProps === nextProps || (myProps == null && nextProps == null))
            return true;
        if (myProps == null && nextProps != null)
            return false;
        if (myProps != null && nextProps == null)
            return false;
        if (Object.keys(myProps).length !== Object.keys(nextProps).length)
            return false;
        return Object.keys(myProps).every(function (prop) {
            return myProps[prop] === nextProps[prop];
        });
    }
    JReact.isSame = isSame;
    function NOOP() {
    }
    JReact.NOOP = NOOP;
    function createElement(jrc, props, ...args) {
        let childKeys = {};
        if (args.length > 1) {
            if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isStringOrNumber(args[0]))
                throw new Error('multiple children with string or number');
            args.forEach(child => {
                if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isStringOrNumber(child))
                    return;
                let comp = child, componentKey;
                if (comp.props.key == null)
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
        props.children = args;
        if (typeof jrc === 'function')
            return new jrc(props);
        else
            return new ComponentDOM(props, jrc);
    }
    JReact.createElement = createElement;
    function updateProps(comp, el, remove) {
        Object.keys(comp.props).forEach(function (key) {
            let keyMap, value = comp.props[key];
            if (ATTRIBUTE_MAP.hasOwnProperty(key)) {
                keyMap = ATTRIBUTE_MAP[key];
                if (typeof value === 'function') {
                    if (remove)
                        el.unbind(keyMap);
                    else
                        el.bind(keyMap, value);
                }
                else if (key === STYLE) {
                    Object.keys(value).forEach(style => {
                        el.css(style, remove ? '' : value[style]);
                    });
                }
                else if (key === JReact.VALUE) {
                    if (remove)
                        el.val(null);
                    else
                        el.val(value);
                }
                else if (remove) {
                    if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isBoolean(value))
                        el.prop(keyMap, false);
                    else
                        el.removeAttr(keyMap);
                }
                else {
                    if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isBoolean(value))
                        el.prop(keyMap, value);
                    else
                        el.attr(keyMap, value);
                }
            }
        }, comp);
    }
    function render(comp, mount, sibling) {
        let childSibling, nextSibling, renderResult, oldComp, prevProps, prevState, el, first = false, alreadyMounted, children = [], childKeyElements = {}, instanceKey = getInstanceKey(comp), oldHTML;
        el = mount.children(instanceKey);
        alreadyMounted = el.length > 0;
        if (alreadyMounted && (oldComp = getInstance(el))) {
            if (JReact.DEBUG)
                oldHTML = el.get(0).outerHTML;
            if (sibling) {
                nextSibling = sibling.next();
                if (nextSibling.length == 0 || getInstanceKey(getInstance(nextSibling)) !== instanceKey) {
                    el.detach();
                    sibling.after(el);
                }
            }
            if (!oldComp.shouldComponentUpdate(comp.props, comp.state))
                return el;
            prevState = oldComp.state;
            oldComp.componentWillReceiveProps(comp.props);
            updateProps(oldComp, el, true);
            prevProps = oldComp.props;
            oldComp.props = comp.props;
            updateProps(oldComp, el);
            comp = oldComp;
        }
        else {
            first = true;
            if (!alreadyMounted)
                el = jQuery('<' + comp.getTag() + '/>');
            comp.setElement(el);
            setInstance(el, comp);
            comp.componentWillMount();
            updateProps(comp, el);
            if (!alreadyMounted) {
                if (sibling)
                    sibling.after(el);
                else
                    mount.append(el);
            }
        }
        if (comp instanceof AutoTemplate)
            comp.renderTemplate();
        else if (comp.props.dangerouslySetInnerHTML)
            el.html(comp.props.dangerouslySetInnerHTML.__html);
        else {
            renderResult = comp.render();
            if (renderResult) {
                if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(renderResult))
                    children.push(...renderResult);
                else
                    children.push(renderResult);
            }
            else
                children = comp.props.children;
            children.forEach((child) => {
                if (child instanceof Component)
                    childKeyElements[getInstanceKey(child)] = true;
            });
            el.children().each(function () {
                let jEl = jQuery(this), inst = getInstance(jEl);
                if ((!inst || !childKeyElements[getInstanceKey(inst)]) && !jEl.is('[' + JReact.DATA_FIXED_ITEM + ']'))
                    unmountElement(jEl);
            });
            comp.refs = {};
            children.forEach(function (child) {
                if (child instanceof Component) {
                    childSibling = render(child, el, childSibling);
                    if (child.props.ref != null) {
                        if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isFunction(child.props.ref))
                            child.props.ref.call(comp, JReact.getInstance(childSibling));
                        else if (child.props.ref != '')
                            comp.refs[child.props.ref] = childSibling;
                    }
                }
                else
                    el.text(child);
            });
        }
        if (first)
            comp.componentDidMount();
        else
            comp.componentDidUpdate(prevProps, prevState);
        if (JReact.DEBUG && !first && oldHTML === el.get(0).outerHTML) {
            console.log(`rendered but same:\n${comp.constructor.name}\n${getInstanceKey(comp)}\n${oldHTML}`);
            console.dir(el.get(0));
        }
        return el;
    }
    JReact.render = render;
    function renderDOM(comp, m) {
        let el = render(comp, m);
        m.children().each(function () {
            if (this !== el[0])
                unmountElement(jQuery(this));
        });
        return el;
    }
    JReact.renderDOM = renderDOM;
    function unmountElement(jc, bDoNotRemove) {
        let old = getInstance(jc);
        if (old)
            old.componentWillUnmount();
        if (bDoNotRemove)
            jc.html(null);
        else
            jc.remove();
    }
    JReact.unmountElement = unmountElement;
    class Component {
        constructor(props) {
            this.refs = {};
            let defaultProps = this.getDefaultProps();
            if (defaultProps)
                props = jQuery.extend(true, {}, defaultProps, props);
            this.props = props;
        }
        getDefaultProps() {
            return null;
        }
        getTag() {
            return 'span';
        }
        getElement() {
            return this.element;
        }
        setElement(element) {
            this.element = element;
        }
        _getState() {
            return this.state;
        }
        _setState(state) {
            this.state = state;
        }
        render() {
            return null;
        }
        renderTemplate() {
            throw new Error("must be overloaded");
        }
        reduce(state, action) {
            return state;
        }
        shouldComponentUpdate(nextProps, nextState) {
            return !isSame(this.state, nextState) || !isSame(this.props, nextProps);
        }
        dispatch(action) {
            this.setState(this.reduce(this.state, action));
        }
        setState(nextState) {
            if (this.shouldComponentUpdate(this.props, nextState)) {
                this._setState(nextState);
                if (!JReact.TEST) {
                    let renderResult = this.render();
                    if (renderResult) {
                        if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(renderResult))
                            render(JReact.createElement(this.constructor, this.props, ...renderResult), this.element.parent());
                        else
                            renderDOM(renderResult, this.element);
                    }
                    else
                        this.renderTemplate();
                }
            }
        }
        componentWillReceiveProps(nextProps) {
        }
        componentWillMount() {
        }
        componentDidMount() {
        }
        componentWillUnmount() {
        }
        componentDidUpdate(prevProps, prevState) {
        }
    }
    JReact.Component = Component;
    class ComponentDOM extends Component {
        constructor(props, tag) {
            super(props);
            this.tag = tag;
        }
        getTag() {
            return this.tag;
        }
    }
    JReact.ComponentDOM = ComponentDOM;
    class AutoTemplate extends Component {
        constructor(props) {
            super(props);
        }
        getTag() {
            return this.props.tag;
        }
        getComponents() {
            return this.props.components;
        }
        getComponentByKey(key) {
            return getPropByKey(key, this.getComponents());
        }
        getTemplateHTML() {
            return getTemplateContent(this.props.templateID);
        }
        renderTemplate() {
            let templateHTML = this.getTemplateHTML(), el = this.getElement();
            this.preRenderTemplate();
            if (!_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(templateHTML) && !el.html())
                el.html(templateHTML);
            this.postRenderTemplate();
        }
        preRenderTemplate() {
            this._preRenderTemplate();
            let childKeyElements = {}, components = this.getComponents(), templateHTML = this.getTemplateHTML();
            if (components)
                components.forEach(component => {
                    childKeyElements[getInstanceKeyFromTag(component.tag, component.key)] = true;
                });
            this.getElement().children('[' + JReact.DATA_KEY + ']').each(function () {
                let jEl = jQuery(this), inst = getInstance(jEl);
                if (!inst || !childKeyElements[getInstanceKey(inst)])
                    unmountElement(jEl, !_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(templateHTML));
            });
        }
        _preRenderTemplate() {
        }
        postRenderTemplate() {
            let components = this.getComponents(), sibling = null, templateHTML = this.getTemplateHTML();
            this.refs = {};
            if (components)
                components.forEach(component => {
                    sibling = render(createElement(evalComponent(component), component), this.getElement(), _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(templateHTML) ? sibling : undefined);
                    this.refs[component.key] = sibling;
                });
            this._postRenderTemplate();
        }
        _postRenderTemplate() {
        }
    }
    JReact.AutoTemplate = AutoTemplate;
    function evalComponent(props) {
        return eval(props.nameSpace + "." + props.name);
    }
    class StatelessAutoTemplate extends AutoTemplate {
        constructor(props) {
            super(props);
        }
    }
    JReact.StatelessAutoTemplate = StatelessAutoTemplate;
    function getDynamicComponent(key, dynProps) {
        return getPropByKey(key, dynProps.data.dynamicComponents);
    }
    JReact.getDynamicComponent = getDynamicComponent;
    function getPropByKey(key, props) {
        if (props)
            for (let component of props)
                if (component.key == key)
                    return component;
        return null;
    }
    JReact.getPropByKey = getPropByKey;
    class DynamicStatelessAutoTemplate extends StatelessAutoTemplate {
        constructor(props) {
            super(props);
        }
        getDynamicComponentByKey(key) {
            return getPropByKey(key, this.props.data.dynamicComponents);
        }
    }
    JReact.DynamicStatelessAutoTemplate = DynamicStatelessAutoTemplate;
    class ComponentController {
        constructor(state, ...converters) {
            this.state = state;
            this.converters = converters;
        }
        dispatch(action) {
            let actionHandler = this.getActionHandler(action.type), oldState = _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].extend(this.state);
            this.state = actionHandler.reduce(this, action);
            if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isFunction(actionHandler.preRenderTemplate)) {
                this.preRenderStart(action);
                actionHandler.preRenderTemplate(this, action).then((newState) => {
                    this.state = newState;
                    this.render(actionHandler, action);
                    this.preRenderSuccess(action, oldState, newState);
                    this.preRenderFinally(action, oldState, newState);
                }, (error) => {
                    this.state = oldState;
                    this.preRenderError(action, oldState, error);
                    this.preRenderFinally(action, oldState, error);
                });
            }
            else
                this.render(actionHandler, action);
        }
        render(actionHandler, action) {
            if (JReact.TEST)
                return;
            for (let converter of this.converters) {
                let component = converter.getComponent();
                let newProps = converter.convert(this.state);
                render(JReact.createElement(component.constructor, newProps), component.getElement().parent());
            }
            if (_utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isFunction(actionHandler.postRenderTemplate))
                actionHandler.postRenderTemplate(this, action);
        }
        getState() {
            return this.state;
        }
        getActionHandler(actionType) {
            throw new Error('getActionHandler should be overridden');
        }
        preRenderStart(action) {
        }
        preRenderSuccess(action, oldState, newState) {
        }
        preRenderError(action, oldState, error) {
        }
        preRenderFinally(action, oldState, newStateOrError) {
        }
    }
    JReact.ComponentController = ComponentController;
    class SingleComponentController extends ComponentController {
        constructor(component) {
            super(component.props, new SingleComponentConverter(component));
        }
    }
    JReact.SingleComponentController = SingleComponentController;
    class SingleComponentConverter {
        constructor(component) {
            this.component = component;
        }
        getComponent() {
            return this.component;
        }
        convert(state) {
            return state;
        }
    }
    JReact.SingleComponentConverter = SingleComponentConverter;
    function hasInvalidPattern(el) {
        return el.hasClass(JReact.RSL_INVALID_PATTERN);
    }
    JReact.hasInvalidPattern = hasInvalidPattern;
    function hasInvalidRequired(el) {
        return el.hasClass(JReact.RSL_INVALID_REQUIRED);
    }
    JReact.hasInvalidRequired = hasInvalidRequired;
    let templateCache = {};
    function getTemplateContent(id) {
        return templateCache[id];
    }
    JReact.getTemplateContent = getTemplateContent;
    function bootstrap(document) {
        let script, scriptType = 'text/html';
        for (let index = 0; index < document.scripts.length; index++) {
            script = document.scripts[index];
            if (script.type === scriptType && script.id)
                templateCache[script.id] = script.text;
        }
    }
    JReact.bootstrap = bootstrap;
})(JReact || (JReact = {}));


/***/ }),

/***/ "./src/main/webapp/resources/typescript/jreactWidget.ts":
/*!**************************************************************!*\
  !*** ./src/main/webapp/resources/typescript/jreactWidget.ts ***!
  \**************************************************************/
/*! exports provided: RslComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RslComponents", function() { return RslComponents; });
/* harmony import */ var _jreact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jreact */ "./src/main/webapp/resources/typescript/jreact.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/main/webapp/resources/typescript/utils.ts");


var RslComponents;
(function (RslComponents) {
    class AbstractWidget extends _jreact__WEBPACK_IMPORTED_MODULE_0__["JReact"].Component {
        constructor(props) {
            super(props);
            this.CONTAINER = 'jreact-widget-' + this.getWidgetName() + '-container';
        }
        getWidgetName() {
            throw new Error('should override widget name');
        }
        getContainer() {
            return _jreact__WEBPACK_IMPORTED_MODULE_0__["JReact"].createElement.bind(null, 'span');
        }
        getContainerProps() {
            return {};
        }
        getWidgetRef() {
            return this.refs[this.CONTAINER];
        }
        getWidget() {
            return this.getWidgetRef()[this.getWidgetName()];
        }
        componentDidMount() {
            this.createWidget();
        }
        componentDidUpdate() {
            this.createWidget();
        }
        componentWillUnmount() {
            this.destroyWidget();
        }
        componentWillReceiveProps(nextProps) {
            this.destroyWidget();
        }
        createWidget() {
            this.getWidget().call(this.getWidgetRef(), this.props.widgetOptions || {});
        }
        destroyWidget() {
            this.getWidget().call(this.getWidgetRef(), 'destroy');
        }
        render() {
            return this.getContainer()(_utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].extend(this.getContainerProps(), { ref: this.CONTAINER }), ...(this.props.children || []));
        }
    }
    RslComponents.AbstractWidget = AbstractWidget;
    class Resizable extends AbstractWidget {
        constructor(props) {
            super(props);
        }
        getWidgetName() {
            return 'resizable';
        }
        getContainer() {
            return _jreact__WEBPACK_IMPORTED_MODULE_0__["JReact"].createElement.bind(null, 'div');
        }
        onResizeStop(ui) {
            this.state = ui.size;
        }
        getDefaultProps() {
            return {
                widgetOptions: {
                    grid: [1, 1],
                    stop: (e, ui) => {
                        _jreact__WEBPACK_IMPORTED_MODULE_0__["JReact"].getInstance(jQuery(e.target).parent()).onResizeStop(ui);
                    }
                }
            };
        }
        getContainerProps() {
            if (this.state)
                return {
                    style: {
                        width: this.state.width,
                        height: this.state.height
                    }
                };
            return super.getContainerProps();
        }
    }
    RslComponents.Resizable = Resizable;
    class Accordion extends AbstractWidget {
        constructor(props) {
            super(props);
        }
        getWidgetName() {
            return 'accordion';
        }
    }
    RslComponents.Accordion = Accordion;
    class CustomCombobox extends AbstractWidget {
        constructor(props) {
            super(props);
        }
        getContainer() {
            return _jreact__WEBPACK_IMPORTED_MODULE_0__["JReact"].createElement.bind(null, 'select');
        }
        getContainerProps() {
            let props = {}, classNames = ['control_select'];
            if (this.props.onChange)
                props.change = this.props.onChange.bind(this);
            if (this.props.codeSelect)
                classNames.push('select-autocomplete');
            props.className = classNames.join(' ');
            props.name = this.props.name;
            return props;
        }
        getWidgetName() {
            return 'combobox';
        }
    }
    RslComponents.CustomCombobox = CustomCombobox;
})(RslComponents || (RslComponents = {}));


/***/ }),

/***/ "./src/main/webapp/resources/typescript/utils.ts":
/*!*******************************************************!*\
  !*** ./src/main/webapp/resources/typescript/utils.ts ***!
  \*******************************************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
var Utils;
(function (Utils) {
    'use strict';
    function values(obj) {
        let values = [];
        for (let key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key))
                values.push(obj[key]);
        return values;
    }
    Utils.values = values;
    function NOOP() {
    }
    Utils.NOOP = NOOP;
    function parseURL(url) {
        let parser = document.createElement('a'), searchObject = [], queries, split, i;
        parser.href = url;
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    }
    Utils.parseURL = parseURL;
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    }
    Utils.hexToRgb = hexToRgb;
    function mixColors(color1, color2, amount) {
        const weight1 = amount;
        const weight2 = 1 - amount;
        const r = Math.round(weight1 * color1.r + weight2 * color2.r);
        const g = Math.round(weight1 * color1.g + weight2 * color2.g);
        const b = Math.round(weight1 * color1.b + weight2 * color2.b);
        return { r, g, b };
    }
    Utils.mixColors = mixColors;
    let size;
    function scrollbarSize(recalc) {
        if ((!size && size !== 0) || recalc) {
            if (Utils.canUseDOM) {
                const scrollDiv = document.createElement('div');
                scrollDiv.style.position = 'absolute';
                scrollDiv.style.top = '-9999px';
                scrollDiv.style.width = '50px';
                scrollDiv.style.height = '50px';
                scrollDiv.style.overflow = 'scroll';
                document.body.appendChild(scrollDiv);
                size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
        }
        return size;
    }
    Utils.scrollbarSize = scrollbarSize;
    Utils.canUseDOM = !!(typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement);
    function flatten(previousValue, currentValue, currentIndex, array) {
        return [...previousValue, ...currentValue];
    }
    Utils.flatten = flatten;
    function sum(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
    }
    Utils.sum = sum;
    function negateFunction(predicate) {
        return () => {
            return !predicate.apply(this, arguments);
        };
    }
    Utils.negateFunction = negateFunction;
    function identity(value) {
        return value;
    }
    Utils.identity = identity;
    function matcher(value, flags = "i") {
        return new RegExp(escapeRegex(value), flags);
    }
    Utils.matcher = matcher;
    function escapeRegex(value) {
        return $.ui.autocomplete.escapeRegex(value);
    }
    Utils.escapeRegex = escapeRegex;
    function filter(array, term) {
        return $.ui.autocomplete.filter(array, term);
    }
    Utils.filter = filter;
    function trimSpecial(input) {
        return input.replace(/[^\w\s]/gi, '');
    }
    Utils.trimSpecial = trimSpecial;
    function uuid() {
        let i, random;
        let uuid = '';
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
    function capitalize(s) {
        return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
    }
    Utils.capitalize = capitalize;
    function store(key, data) {
        if (data)
            return localStorage.setItem(key, JSON.stringify(data));
        let store = localStorage.getItem(key);
        return store ? JSON.parse(store) : null;
    }
    Utils.store = store;
    function extend(...args) {
        let newObj = {};
        for (let i = 0; i < args.length; i++) {
            let obj = args[i];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
    Utils.extend = extend;
    let uid = ['0', '0', '0'];
    function nextUid() {
        let index = uid.length, digit;
        while (index--) {
            digit = uid[index].charCodeAt(0);
            if (digit == 57) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90) {
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
    const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    function camelCase(name) {
        return name
            .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    }
    Utils.camelCase = camelCase;
    const SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
        separator = separator || '_';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }
    Utils.snake_case = snake_case;
    function debounce(func, wait, immediate) {
        let timeout;
        let debounced = function (...args) {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                timeout = null;
                if (!immediate)
                    func.apply(this, args);
            }, wait);
            if (immediate && !timeout)
                func.apply(this, args);
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        return debounced;
    }
    Utils.debounce = debounce;
    function throttle(func, delay) {
        let recent;
        return function throttled() {
            let context = this;
            let args = arguments;
            let n = Utils.now();
            if (!recent || recent - n > delay) {
                func.apply(context, args);
                recent = n;
            }
        };
    }
    Utils.throttle = throttle;
    Utils.now = typeof window !== 'undefined' && window && window.performance ? window.performance.now.bind(window.performance) : Date.now;
    function isUndefined(value) {
        return !isDefined(value);
    }
    Utils.isUndefined = isUndefined;
    function isDefined(value) {
        return typeof value !== 'undefined';
    }
    Utils.isDefined = isDefined;
    function isNotNull(value) {
        return !isNull(value);
    }
    Utils.isNotNull = isNotNull;
    function isNull(value) {
        return value === null;
    }
    Utils.isNull = isNull;
    function isObject(value) {
        return value != null && typeof value === 'object';
    }
    Utils.isObject = isObject;
    function getAsString(value) {
        if (!testString(value))
            return '';
        return String(value);
    }
    Utils.getAsString = getAsString;
    function isString(value) {
        return typeof value === 'string';
    }
    Utils.isString = isString;
    function testString(value) {
        return value != null && value !== '';
    }
    Utils.testString = testString;
    function isNumber(value) {
        return typeof value === 'number';
    }
    Utils.isNumber = isNumber;
    function isStringOrNumber(value) {
        return isString(value) || isNumber(value);
    }
    Utils.isStringOrNumber = isStringOrNumber;
    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }
    Utils.isDate = isDate;
    function isFunction(value) {
        return typeof value === 'function';
    }
    Utils.isFunction = isFunction;
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
    function isArray(value) {
        return Array.isArray(value);
    }
    Utils.isArray = isArray;
    function isPromiseLike(obj) {
        return obj && isDefined(obj) && isFunction(obj.then);
    }
    Utils.isPromiseLike = isPromiseLike;
    function curry(fn) {
        return (...args) => {
            let last = args[args.length - 1];
            if (isFunction(last))
                return fn(...args);
            return (Component) => fn(...args, Component);
        };
    }
    Utils.curry = curry;
    function nullIf(arg1, arg2) {
        return arg1 === arg2 ? null : arg1;
    }
    Utils.nullIf = nullIf;
    function coalesce(...args) {
        for (const arg of args)
            if (isNotNull(arg) && isDefined(arg))
                return arg;
        return null;
    }
    Utils.coalesce = coalesce;
    function groupBy(list, ...toStringArray) {
        let result = {};
        list.forEach(item => {
            let subResult = result;
            let idx = 0;
            for (let toString of toStringArray) {
                idx++;
                let key = toString(item);
                let subSubResult = subResult[key];
                if (!subSubResult) {
                    subSubResult = idx === toStringArray.length ? [] : {};
                    subResult[key] = subSubResult;
                }
                subResult = subSubResult;
            }
            subResult.push(item);
        });
        return result;
    }
    Utils.groupBy = groupBy;
    function createChainedFunction(...funcs) {
        return funcs
            .filter(f => f != null)
            .reduce((acc, f) => {
            if (!isFunction(f))
                throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
            if (acc === null)
                return f;
            return function chainedFunction(...args) {
                acc.apply(this, args);
                f.apply(this, args);
            };
        }, null);
    }
    Utils.createChainedFunction = createChainedFunction;
    function addClass(element, className) {
        element.classList.add(className);
    }
    Utils.addClass = addClass;
    function removeClass(element, className) {
        element.classList.remove(className);
    }
    Utils.removeClass = removeClass;
    Utils.FORMAT_VALUES = {
        'age': /^\d{1,2}\.?\d?$/,
        'alpha10': /^[0-9A-Za-z\/_-]{1,10}$/,
        'alpha12': /^[0-9A-Za-z\/_]{1,12}$/,
        'amex': /^(\d){15}$/,
        'amount_pct': /^%\d{1,2}\.\d{2}|\d{1,2}\.\d{2}%|%100\.00|100\.00%|\d+\.\d{2}$/,
        'amount_pct_hyphen': /^%\d{1,2}\.\d{2}|\d{1,2}\.\d{2}%|%100\.00|100\.00%|\d+\.\d{2}|-$/,
        'aurore': /^(\d){19}$/,
        'avaibility_pct': /^%\d{1,2}\.\d{2}|\d{1,2}\.\d{2}%|%100\.00|100\.00%|\d+$/,
        'bcmc': /^(\d){13,19}$/,
        'cb': /^(\d){16}$/,
        'char10': /^[0-9A-Z_]{1,10}$/,
        'char17': /^[0-9A-Z_]{1,17}$/,
        'char2': /^[0-9A-Z_]{1,2}$/,
        'char30': /^.{0,30}$/,
        'char4': /^[0-9A-Z_]{1,4}$/,
        'char5': /^[0-9A-Z_]{1,5}$/,
        'char60': /^.{0,60}$/,
        'char9': /^[0-9A-Z_]{1,9}$/,
        'color_code': /^[0-9A-F]{6}$/,
        'customer_code': /^[0-9A-Z_\/]{1,9}$/,
        'email': /^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,5}$/,
        'emails': /^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,5}(;[a-zA-Z0-9\-_.]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,5})*$/,
        'float': /^\d*\.?\d*$/,
        'hour': /^[0-2]?[0-9]:[0-5]?[0-9]$/,
        'int': /^\d*$/,
        'maestro': /^(\d){13,19}$/,
        'mastercard': /^(\d){16}$/,
        'money': /^\d+\.\d{2}$/,
        'money_special': /^\d+\.\d{2}|-$/,
        'money_special_product': /^-?\d+\.\d{2}|-$/,
        'num2': /^[0-9]{1,2}$/,
        'num3': /^[0-9]{1,3}$/,
        'num4': /^[0-9]{1,4}$/,
        'num_cha_pattern': /^([1-9A-Z_]|0(?=[0-9A-Z_)]))([0-9A-Z_]{0,9})$/g,
        'pct': /^%\d{1,2}\.\d{2}|\d{1,2}\.\d{2}%|%100\.00|100\.00%$/,
        'pctb': /^\d{1,2}\.\d{2}|\d{1,2}\.\d{2}|100\.00|100\.00$/,
        'positiv_int': /^[1-9]\d*$/,
        'positiv_int_include_zero': /^[0-9]\d*$/,
        'product_code': /^[0-9A-Z_]{1,9}$/,
        'quantity': /^\d{1,3}\.\d{2}$/,
        'smoney': /^-?\d+\.\d{2}$/,
        'squantity': /^-?\d{1,3}\.\d{2}$/,
        'squantitydif0': /^-?[1-9][0-9]{0,5}\.\d{2}$/,
        'stay': /^[1-9]\d{0,2}$/,
        'step': /^-?\d+$/,
        'text': /^\w*$/,
        'text_point': /^[\w.]*$/,
        'ufloat': /^-?\d*\.?\d*$/,
        'uint': /^-?\d*$/,
        'visa': /^(\d){16}$/,
    };
    function addScript(content) {
        document.head.insertAdjacentHTML('beforeend', content);
    }
    Utils.addScript = addScript;
})(Utils || (Utils = {}));


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map