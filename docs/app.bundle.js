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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/reset.css":
/*!***************************!*\
  !*** ./src/css/reset.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/styles.scss":
/*!*****************************!*\
  !*** ./src/css/styles.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/reset.css */ "./src/css/reset.css");
/* harmony import */ var _css_reset_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_reset_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/styles.scss */ "./src/css/styles.scss");
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_styles_scss__WEBPACK_IMPORTED_MODULE_1__);



class Request {

    constructor(handler, signal) {
        this.eventName = this.readSignal(handler, signal);
    }

    readSignal(handler, signal) {
        var [event, segment, method] = signal.split(',', 3),
            eventName;

        segment = this.format(segment) ? '.' + this.format(segment) : '';
        method = this.format(method) ? '/' + this.format(method) : '';

        eventName = event + '/' + handler.getHandlerName() + segment + method;

        return eventName;
    }

    format(str) {
        if (typeof str !== "string") return '';

        return str.trim().replace(/^\.+|\.$/, '');
    }
}

class ParameterGetters {

    constructor() {
        return [
            [ ["editor", "editorElement"], this.getEditor ],
            [ ["handler", "handlerForElement"], this.getHandler ],
            [ ["event"], this.getEvent ],
            [ ["controller"], this.getFigureController ],
        ];
    }

    getEditor(event) {

        var element = event.target;

        while (!valid(element)) {
            element = element.parentNode;
        }

        return element;

        function valid(element) {
            return element === document || element.hasAttribute("handler");
        }
    }

    getHandler(name, handler) {

        var app = handler.getApp();
        
        name = name.target;

        if (typeof name === "object" && "nodeType" in name) {
            while (!valid()) {
                name = name.parentNode;
            }

            name = name === document ? '' : name.getAttribute("handler");
        }

        return app.handlers[name] || this;

        function valid() {
            return name === document || name.hasAttribute("handler");
        }
    }
    
    getEvent(event) {
        return event;
    }
    
    getFigureController(event) {
        return document.querySelector('.figure-controller');
    }
}

class Core {

    constructor(app, name) {
        this.setApp(app);
        this.setHandlerName(name);

        this.setListeners();
    }

    setApp(app) {
        this.app = app || this;
    }

    getApp() {
        return this.app;
    }

    setAppDesign() {
        var app = this.getApp();

        app.design = app.makeAppDesign();
    }

    getAppDesign() {
        return this.getApp().design;
    }

    setListeners() {
        var app = this.getApp(),
            listeners = this.getListenerList();

        app.listeners = app.listeners || {};

        for (let key in listeners) {
            app.listeners[key] = listeners[key];
        }
    }

    getListenerList() {
        return this.formatListeners(this.makeListeners());
    }
    
    makeListeners() {
        return {};
    }

    formatListeners(listenerList) {
        var formatted = {},
            parsed;

        for (let key in listenerList) {

            parsed = this.parseKey(key);
            formatted[parsed.event + this.getHandlerName() + parsed.segment + parsed.method] = listenerList[key];
        }

        return formatted;
    }

    parseKey(key) {
        var splitted = key.split(',', 3),
            replaced, parsed = {};

        parsed.event = splitted[0] + '/';
        parsed.segment = (typeof splitted[1] === "string" && (replaced = splitted[1].replace(/\s/g, ''))) ? '.' + replaced : '';
        parsed.method = (typeof splitted[2] === "string" && (replaced = splitted[2].replace(/\s/g, ''))) ? '/' + replaced : '';

        return parsed;
    }

    getListeners(name) {
        return this.getApp().listeners[name];
    }

    setHandlers() {
        var app = this.getApp(),
            design = app.getAppDesign(),
            designKeys = Object.keys(design);

        app.handlers = {};

        for (let designKey of designKeys) {            app.handlers[designKey] = new design[designKey]["class"](app);
                                          }
    }

    getHandlers() {
        return this.getApp().handlers;
    }

    getHandler(name) {
        var handlers = this.getHandlers();
        
        if (typeof name == "object" && "nodeType" in name) {
            name = this.eventTargetToHandlerName(name);
        }
        
        return handlers[name];
    }
    
    eventTargetToHandlerName(targetElement) {

        while (!valid(targetElement)) {
            targetElement = targetElement.parentNode;
        }
        
        return targetElement === document.body ? 'App' : targetElement.getAttribute("handler");

        function valid(target) {
            return target === document.body || target.hasAttribute("handler");
        }
    }

    setHandlerName(name) {
        this.handlerName = name;
    }

    getHandlerName() {
        return this.handlerName;
    }
    
    isHandlerName(name) {
        var design = this.getAppDesign();
        
        return !!design[name];
    }

    setParameterGetters() {
        var app = this.getApp();

        app.paramGetters = new ParameterGetters;
    }

    getParameterGetters() {
        return this.getApp().paramGetters;
    }
}

class BasicListeners extends Core {
    constructor(app, name) {
        super(app, name);
        
        return {
            "mousedown": this.handleMousedown.bind(this),
            "mouseup": this.handleMouseup.bind(this),
            "click": this.handleClick.bind(this),
            "keydown": this.handleKeydown.bind(this),
            "keyup": this.handleKeyup.bind(this),
            "input": this.handleInput.bind(this),
            "change": this.handleChange.bind(this)
        };
    }
    
    handleMousedown(event) {
        var handler = this.getHandler(event.target);

        handler.handle("mousedown", event);
    }

    handleMouseup(event) {
        var handler = this.getHandler(event.target);

        handler.handle("mouseup", event);
    }

    handleClick(event) {
        
        var handler = this.getHandler(event.target);
        
        handler.handle("click", event);
    }

    handleKeydown(event) {

        var handler = this.getHandler(event.target),
            name = "keydown";
        
        if (event.key == "Enter") {
            name += ".Enter";
        }

        handler.handle(name, event, window.getSelection().getRangeAt(0).startContainer);

    }
    
    handleKeyup(event) {
        
        var handler = this.getHandler(event.target);

        handler.handle("keyup", event);
    }
    
    handleInput(event) {
        
        var handler = this.getHandler(event.target),
            selection = window.getSelection(),
            element = selection ? selection.getRangeAt(0).startContainer : null;
        
        handler.handle("input", event, element);
    }

    handleChange(event) {

        var handler = this.getHandler(event.target);

        handler.handle("change", event);
    }
}

class Handler extends Core {

    constructor(app, name) {
        super(app, name);
    }
    
    
    handle(eventName, event, option) {
        
        var signalObj = this.makeSignalObject(eventName, event, option),
            signal,
            sNum = signalObj.segment.length;
        
        while (true) {
            signal = this.makeSignal(signalObj);
            
            this.handleRequest(new Request(this, signal), event, sNum == signalObj.segment.length);
            
            if (signalObj.segment.length == 0) { return true; }
            
            signalObj.segment.pop();
        }
    }
    
    makeSignalObject(eventName, event, option) {
        var sigObj = {};
        
        sigObj.event = this.signalEventName(eventName, event);
        sigObj.segment = this.signalHandlerSegment(event, option);
        sigObj.operation = this.signalOperation(event);
        
        return sigObj;
    }
    
    makeSignal(sigObj) {
        return sigObj.event + ', ' + sigObj.segment.join('.') + ', ' + sigObj.operation;
    }
    
    getNearParentElement(element) {
        while (element.nodeType !== Node.ELEMENT_NODE) {
            element = element.parentNode;
        }
        
        return element;
    }

    signalEventName(baseEventName, event) {
        return baseEventName.trim();
    }
    
    signalHandlerSegment(event, option) {
        
        if (!event) {
            return [];
        }
        
        var target = option ? option : event.target,
            check = this.getNearParentElement(target),
            segment = [];
        
        while (check !== document) {
            
            if (check.hasAttribute("segment")) {
                segment.unshift(check.getAttribute("segment"));
            }
            
            check = check.parentNode;
        }
        
        return segment;
    }
    
    signalOperation(event) {
        if (!event) {
            return '';
        }
        var check = this.getNearParentElement(event.target);
        
        return check.hasAttribute("operation") ?  check.getAttribute("operation") : '';
    }
    

    handleRequest(request, event, first) {
        var listeners = this.getListeners(request.eventName) || [],
            args = [];
        
        for (let listener of listeners) {
            args = this.resolveDependencies(listener[0], event);
            
            if (first || listener[1]) {
                
                listener[0].apply(this, args);
            }
        }
    }
    
    
    resolveDependencies(method, event) {
        
        var args = [],
            deps = this.getDependencies(method),
            pGetters = this.getParameterGetters();
        
        for (let i = 0; i < deps.length; i++) {
            let arg = this.getParameter(deps[i], pGetters, event);
            
            args.push(arg);
        }
        
        return args;
    }

    getDependencies(method) {
        var code = method.toString(),
            re = /\(([^)]*?)\)/,
            result;

        result = re.exec(code);
        result = result[1].split(",");
        result = result.map(x => x.trim());

        return result;
    }
    
    getParameter(dep, getters, event) {
        
        for (let i = 0; i < getters.length; i++) {
            
            var getter = getters[i];
            
            for (let k = 0; k < getter[0].length; k++) {
                if (dep == getter[0][k]) {
                    
                    return getter[1](event, this);
                }
            }
        }
        
        return dep;
    }
}

class ApplicationInitializer extends Handler {
    
    constructor(app, name) {
        super(app, name);

        this.setAppDesign();
        this.setHandlers();
        this.setParameterGetters();
        
        this.handlers['App'] = this;

        this.attachBasicListeners(this.app);

        this.buildInitElements();
    }
    
    attachBasicListeners(app) {

        var listeners = new BasicListeners(app, "BasicListeners"),
            keys = Object.keys(listeners);

        for (let key of keys) {
            addEventListener(key, listeners[key]);
        }
    }
    
    buildInitElements() {
        var design = this.getAppDesign(),
            handlerNames = Object.keys(design),
            handler, element, loc;

        for (let name of handlerNames) {
            if (design[name]["attr"] && design[name]["attr"].indexOf('init') != -1) {
                handler = this.getHandler(name);
                element = handler.build();
                loc = handler.getBuildLocation('init');

                loc.appendChild(element);

                this.getHandler(name).handle("inserted");
            }
        }
    }
    
    save(fileName) {
        console.log("App.save()");
        
        var saveKeys = this.getSaveKeys(),
            handlers = this.getHandlers(),
            data;
        
        data = saveKeys.reduce(function(acc, key) {
            return Object.assign(acc, handlers[key].save());
        }, {});
        
        var aTag = document.createElement("a"),
            dName = fileName + ".txt",
            blob = new Blob([JSON.stringify(data)], { type: "text/plain"});
        
        aTag.href = window.URL.createObjectURL(blob);
        aTag.download = dName;
        
        document.body.appendChild(aTag);
        
        aTag.click();
        
        document.body.removeChild(aTag);
        
    }
    
    getSaveKeys() {
        
        var design = this.getAppDesign(),
            keys = Object.keys(design);
        
        return keys.filter(function(key) {
            if (design[key].hasOwnProperty("attr") && design[key]["attr"].indexOf("save") != -1) {
                return key;
            }
        });
    }

    load(event) {
        
        var loadKeys = this.getSaveKeys(),
            handlers = this.getHandlers(),
            handler = this,
            reader = new FileReader(),
            data;
        
        reader.addEventListener('loadend', function() {
            data = JSON.parse(reader.result);
            
            loadKeys.forEach(function(key) {
                handlers[key].load(data);
            });
            
            handler.getHandler("Figure").figure();
        });
        
        reader.readAsText(event.target.files[0]);
    }
}

class Application extends ApplicationInitializer {
    constructor() {
        super(null, "App");
    }

    makeAppDesign() {
        return {
            "NavigationBar": {
                class: NavigationBar,
                attr: "init"
            },
            "Figure": {
                class: Figure,
                attr: "init　save"
            },
            "Box": {
                class: Box,
                attr: "save"
            }
        };
    }
}

class Elemental extends Handler {

    constructor(app, name) {
        super(app, name);

        this.setBuildModel();
        this.setBuildLocation();
    }

    setBuildModel() {
        this.buildModel = this.makeBuildModel();
    }

    getBuildModel(key) {
        key = key || this.getHandlerName();

        return this.buildModel[key];
    }

    setBuildLocation() {
        this.buildLocation = this.makeBuildLocation();
    }

    getBuildLocation(key) {        
        return document.querySelector(this.buildLocation[key]);
    }


    build(key = null) {
        var buildKey = key ? key.replace('_', '') + '_' + this.getHandlerName() : this.getHandlerName(),
            buildModel = this.makeSuffixedBuildModel(this.getHandlerName()),
            element;
        
        element = this.modelToElement(buildModel, buildKey);

        this.handle("built");

        return element;
    }

    makeSuffixedBuildModel(targetName, made = {}, merged = []) {
        
        var design = this.getAppDesign(),
            handlerNames = Object.keys(design),
            handler, suffixed, keys;

        for (let handlerName of handlerNames) {
            
            if (handlerName == targetName && merged.indexOf(handlerName) == -1) {
                merged.push(targetName);

                handler = this.getHandler(handlerName);
                suffixed = this.addSuffix(handler.makeBuildModel(), handler.getHandlerName());
                keys = Object.keys(suffixed);

                for (let key of keys) {
                    made[key] = suffixed[key];
                }

                if (Array.isArray(design[handlerName]['children'])) {
                    for (let childTarget of design[handlerName]['children']) {
                        this.makeBuildModel(childTarget, made, merged);
                    }
                }
            }
        }
        return made;
    }
    
    addSuffix(buildModel, handlerName) {
        var design = this.getAppDesign(),
            dest = {},
            keys = Object.keys(buildModel),
            suffix = '_' + handlerName,
            proc,
            innerKeys;

        for (let key of keys) {

            if (this.isHandlerName(key)) {
                proc = dest[key] = {};
            } else {
                proc = dest[key.replace('_', '') + suffix] = {};
            }

            innerKeys = Object.keys(buildModel[key]);

            for (let innerKey of innerKeys) {
                this.transport(design, suffix, proc, buildModel[key], innerKey);
            }
        }
        
        return dest;
    }

    transport(design, suffix, to, from, key) {
        var children

        if (key == "children") {
            children = from.children;
            to['children'] = [];

            for (let i = 0; i < children.length; i++) {

                if (this.isHandlerName(children[i])) {
                    to['children'].push(children[i]);
                } else {
                    to['children'].push(children[i].replace('_', '') + suffix);
                }
            }
        } else {
            to[key] = from[key];
        }
    }


    modelToPlan(buildModel, buildKey) {

        return toPlan(buildModel[buildKey]);

        function toPlan(target) {
            var obj = {};
            for (let key in target) {
                if (key == "children") {
                    obj["children"] = {};
                    for (let innerKey in target["children"]) {
                        innerKey = innerKey.replace('_', '');
                        if (buildModel[target["children"][innerKey]]) {
                            obj["children"][target["children"][innerKey]] = toPlan(buildModel[target["children"][innerKey]]);
                        }
                    }
                } else {
                    obj[key] = target[key];
                }
            }
            return obj;
        }
    }

    planToElement(buildPlan) {

        return this.toElement(buildPlan);
    }

    toElement(plan, child = false) {

        if (plan["optional"] && child) return;

        var [tagName, attrData, content] = this.extractTagData(plan["tag"]),
            elm = document.createElement(tagName);
        
        this.makeAttributes(elm, attrData);
        this.makeContent(elm, content);

        for (let key in plan["children"]) {
            elm.appendChild(this.toElement(plan["children"][key], true));
        }

        return elm;
    }

    extractTagData(tag) {
        var data = [],
            block = /<\s*(\w+)\s*([^>]*?)>([^<]*?)<\s*\/\s*[^>]*?>/u,
            inline = /<\s*(\w+)\s*([^>]*?)>/u;
        
        console.log(tag);

        if (block.test(tag)) {
            console.log("block");
            data = tag.match(block);
        } else if(inline.test(tag)) {
            console.log("inline");
            data = tag.match(inline);
        }

        data.shift();

        return data;
    }

    makeAttributes(element, attrData) {
        var attrs = this.extractAttrs(attrData),
            keys = Object.keys(attrs);

        for (let key of keys) {

            element.setAttribute(key, attrs[key]);
        }
    }

    extractAttrs(attrData) {
        if (!attrData) return false;
        
        console.log("\nextractAttrs");
        console.log(attrData);
        
        var attrRe = /[a-zA-Z0-9-_]+=['"].*?['"]/ug,
            attrs = attrData.match(attrRe);
        
        var attrsPairs = attrData.split(' '),
            dest = {},
            k, v;

        attrsPairs.forEach(function (pair) {
            [k, v] = pair.split('=');
            if (v) {
                dest[k] = v.replace(/^'|'$/ug, "").replace(/^"|"$/ug, "");
            }
        });
        
        attrs.forEach(function (pair) {
            [k, v] = pair.split('=');
            if (v) {
                dest[k] = v.replace(/^'|'$/ug, "").replace(/^"|"$/ug, "");
            }
        });

        return dest;
    }

    makeContent(element, content) {
        if (!content) return false;
        
        element.appendChild(document.createTextNode(content));
    }

    modelToElement(buildModel, buildKey) {
        return this.planToElement(this.modelToPlan(buildModel, buildKey));
    }
    
    
    addElement(parent, child) {
        parent.appendChild(child);
    }
    
    putSelection(elm, offset = 0) {
        window.getSelection().getRangeAt(0).setStart(elm, offset);
        
        document.createRange().setStart(elm, offset);
    }
}

class Example extends Elemental {
    constructor() {

    }

    makeBuildModel() {
        return {
            "Test": {
                "tag": "<div>Test</div>"
            }
        };
    }

    makeBuildLocation() {
    }
}


















class NavigationBar extends Elemental {

    constructor(app) {
        super(app, "NavigationBar");
    }
    
    makeListeners() {
        return {
            "click, , insertBox": [
                [ this.insertBox, false ],
            ],
            "click, , toggleFigureController": [
                [ this.toggleFigureController, false ],
            ],
            "click, , toggleSave": [
                [ this.toggleSaveBox, false ],
            ],
            "click, , save": [
                [ this.save, false ],
            ],
            "change, , load": [
                [ this.load, false ],
            ],
        };
    }

    makeBuildModel() {
        return {
            "NavigationBar": {
                "tag": "<div id='diaNavigation' handler='NavigationBar'></div>",
                "children": [
                    "insert",
                    "figure",
                    "save",
                    "load",
                ]
            },
            "insert": {
                "tag": "<span class='diaCommand test-one test-two' operation='insertBox' trigger='click'>insert</span>",
                "children": []
            },
            "figure": {
                "tag": "<span class='diaCommand' operation='toggleFigureController'>figure</span>"
            },
            "save": {
                "tag": "<span class='diaCommand' operation='toggleSave' trigger='click'>save</span>"
            },
            "load": {
                "tag": "<label class='diaCommand'>load</label>",
                "children": [
                    "loadInput",
                ]
            },
            "loadInput": {
                "tag": "<input operation='load' type='file'>"
            },
            
            saveBox: {
                tag: '<div class="save-box" handler="NavigationBar"></div>',
                children: [
                    'save_field',
                ]
            },
            save_field: {
                tag: '<div class="save-field"></div>',
                children: [
                    'save_name',
                    'save_button',
                ]
            },
            save_name: {
                tag: '<input type="text" class="save-name">'
            },
            save_button: {
                tag: '<legend class="save-button" operation="save">save</legend>'
            }
        };
    }
    
    makeBuildLocation() {
        return {
            'init': '#diaHeader',
            'save': '#diaImage',
        };
    }
    
    insertBox() {
        var box = this.getHandler("Box");
        
        box.insert();
    }
    
    toggleFigureController() {
        var figure = this.getHandler("Figure");

        figure.toggleController();
    }
    
    save() {
        console.log("Navigation.save()");
        
        var fileName = document.querySelector('.save-name').value;
        
        this.getApp().save(fileName);
    }
    
    toggleSaveBox() {
        var box = document.querySelector('.save-box');

        if (box) {
            box.parentNode.removeChild(box);
        } else {
            var box = this.build('saveBox'),
                loc = this.getBuildLocation('save');

            loc.appendChild(box);
        }
    }
    
    load(event) {
        this.getApp().load(event);
    }
}

class Figure extends Elemental {
    
    constructor(app) {
        super(app, "Figure");
        
        this.plan = [];
    }
    
    save() {
        return { dia_Figure: this.plan };
    }
    
    load(data) {
        var keys = Object.keys(data);
        
        this.plan = data["dia_Figure"];
    }
    
    
    makeListeners() {
        return {
            "inserted": [
                [ this.expandCanvas, false ],
            ],
            "mousedown": [
                [ this.startDrag, false ],
            ],
            "click, , index": [
                [ this.clearController, false ],
                [ this.index, false ],
            ],
            "click, , create": [
                [ this.clearController, false ],
                [ this.create, false ],
            ],
            "click, , store": [
                [ this.store, false ],
                [ this.clearController, false ],
                [ this.index, false ],
                [ this.figure, false ],
            ],
            "click, , edit": [
                [ this.clearController, false ],
                [ this.edit, false ],
            ],
            "click, , update": [
                [ this.update, false ],
                [ this.clearController, false ],
                [ this.index, false ],
                [ this.figure, false ],
            ],
            "click, , destroy": [
                [ this.destroy, false ],
                [ this.clearController, false ],
                [ this.index, false ],
                [ this.figure, false ],
            ],
            "click, , cancel": [
                [ this.clearController, false ],
                [ this.index, false ],
            ],
            "click, , close": [
                [ this.toggleController, false ],
            ]
        };
    }
    
    makeBuildModel() {
        return {
            Figure: {
                tag: '<canvas id="DiaFigure"></canvas>'
            },
            
            figure_controller: {
                tag: '<div class="figure-controller" handler="Figure"></div>'
            },
            figure_controller_create: {
                tag: '<span class="figure-control-create" operation="create">create</span>'
            },
            figure_controller_store: {
                tag: '<span class="figure-control-store" operation="store">store</span>'
            },
            figure_controller_update: {
                tag: '<span class="figure-control-update" operation="update">update</span>'
            },
            figure_controller_cancel: {
                tag: '<span class="figure-control-cancel" operation="cancel">cancel</span>'
            },
            figure_controller_close: {
                tag: '<span class="figure-control-close" operation="close">close</span>'
            },
            
            figure_index: {
                tag: '<div class="figure-index"></div>',
                children: [
                    'figure_index_header',
                    'figure_index_body',
                    'figure_index_footer',
                ]
            },
            figure_index_header: {
                tag: '<div class="figure-index-header">Index of figures</div>'
            },
            figure_index_body: {
                tag: '<div class="figure-index-body"></div>'
            },
            figure_index_footer: {
                tag: '<div class="figure-index-footer"></div>',
                children: [
                    'figure_controller_create',
                    'figure_controller_close'
                ]
            },
            
            figure_create : {
                tag: '<div class="figure-create"></div>',
                children: [
                    'figure_create_header',
                    'figure_create_body',
                    'figure_create_footer'
                ]
            },
            figure_create_header: {
                tag: '<div class="figure-create-header">Create an item</div>'
            },
            figure_create_body: {
                tag: '<div class="figure-create-body"></div>'
            },
            figure_create_footer: {
                tag: '<div class="figure-create-footer"></div>',
                children: [
                    'figure_controller_store',
                    'figure_controller_cancel'
                ]
            },
            
            figure_edit: {
                tag: '<div class="figure-edit"></div>',
                children: [
                    'figure_edit_header',
                    'figure_edit_body',
                    'figure_edit_footer'
                ]
            },
            figure_edit_header: {
                tag: '<div class="figure-edit-header">Edit an item</div>'
            },
            figure_edit_body: {
                tag: '<div class="figure-edit-body"></div>'
            },
            figure_edit_footer: {
                tag: '<div class="figure-edit-footer"></div>',
                children: [
                    'figure_controller_update',
                    'figure_controller_cancel'
                ]
            },
            
            figure_list: {
                tag: '<ul class="figure-list"></ol>'
            },
            
            figure_item: {
                tag: '<li class="figure-item"></li>',
                children: [
                    'figure_item_from',
                    'figure_item_to',
                    'figure_item_color',
                    'figure_item_edit',
                    'figure_item_destroy'
                ]
            },
            figure_item_from: {
                tag: '<span class="figure-item-from"></span>'
            },
            figure_item_to: {
                tag: '<span class="figure-item-to"></span>'
            },
            figure_item_color: {
                tag: '<span class="figure-item-color"></span>'
            },
            figure_item_shape: {
                tag: '<span class="figure-item-shape"></span>'
            },
            figure_item_edit: {
                tag: '<span class="figure-item-edit" operation="edit">edit</span>'
            },
            figure_item_destroy: {
                tag: '<span class="figure-item-destroy" operation="destroy">destroy</span>'
            },
            
            figure_editor_create: {
                tag: '<div class="figure-editor"></div>',
                children: [
                    'figure_editor_create_parameters',
                    'figure_editor_create_selectors',
                ]
            },
            figure_editor_create_parameters: {
                tag: '<div class="figure-editor-parameters">',
                children: [
                'figure_editor_from',
                'figure_editor_to',
                'figure_editor_color',
                'figure_editor_shape',
                ]
            },
            figure_editor_create_selectors: {
                tag: '<div class="figure-editor-selectors"></div>',
                children: [
                    'figure_editor_selector_from',
                    'figure_editor_selector_to',
                    'figure_editor_selector_none',
                ]
            },
            figure_editor_edit: {
                tag: '<div class="figure-editor"></div>',
                children: [
                    'figure_editor_from_imm',
                    'figure_editor_to_imm',
                    'figure_editor_color',
                    'figure_editor_shape',
                ]
            },
            figure_editor_from: {
                tag: '<select class="figure-editor-from"></select>'
            },
            figure_editor_from_imm: {
                tag: '<span class="figure-editor-from-imm"></span>'
            },
            figure_editor_to: {
                tag: '<select class="figure-editor-to"></select>'
            },
            figure_editor_to_imm: {
                tag: '<span class="figure-editor-to-imm"></span>'
            },
            figure_editor_color: {
                tag: '<input type="color" class="figure-editor-color">'
            },
            figure_editor_shape: {
                tag: '<select class="figure-editor-shape"></select>'
            },
            figure_editor_option: {
                tag: '<option class="figure-editor-option"></option>'
            },
            figure_editor_selector_from: {
                tag: '<input type="radio" name="selector" class="figure-editor-selector-from" value="from">'
            },
            figure_editor_selector_to: {
                tag: '<input type="radio" name="selector" class="figure-editor-selector-to" value="to">'
            },
            figure_editor_selector_none: {
                tag: '<input type="radio" name="selector" class="figure-editor-selector-none" value="none" checked>'
            }
            
        }
    }
    
    makeBuildLocation() {
        return {
            'init': "#diaImage",
            'controller': "#diaImage",
        }
    }
    
    
    expandCanvas() {
        var editor = document.getElementById('DiaFigure'),
            image = document.getElementById('diaImage'),
            rect = image.getBoundingClientRect();
        
        editor.setAttribute('width', rect.width);
        editor.setAttribute('height', rect.height);
    }
    
    toggleController() {
        
        var controller = document.querySelector('.figure-controller');
        
        if (controller) {
            controller.parentNode.removeChild(controller);
        } else {
            var controller = this.insertController();
            this.index(controller);
        }
    }
    
    insertController() {
        var controller = this.build('figure_controller'),
            loc = this.getBuildLocation('controller');
        
        loc.appendChild(controller);
        
        return controller;
    }
    
    clearController(controller) {
        while (controller.firstChild) {
            controller.removeChild(controller.firstChild);
        }
    }
    
    index(controller) {
        var index = this.build('figure_index'),
            create = this.build('figure_controller_create'),
            cancel = this.build('figure_controller_cancel');
        
        controller.appendChild(index);
        
        this.makeList(index.querySelector('.figure-index-body'));
    }
    
    makeList(body) {
        var list = this.build('figure_list'),
            plan = this.plan;
        
        for (let i = 0; i < plan.length; i++) {
            this.makeItem(plan[i], i, list);
        }
        
        body.appendChild(list);
    }
    
    makeItem(plan, index, list) {
        var item = this.build('figure_item');
        item.querySelector('.figure-item-from').appendChild(document.createTextNode(plan[0]));
        item.querySelector('.figure-item-to').appendChild(document.createTextNode(plan[1]));
        
        item.querySelector('.figure-item-color').setAttribute('style', 'background: ' + plan[2]);
        
        item.querySelector('.figure-item-edit').setAttribute('planIndex', index);
        item.querySelector('.figure-item-destroy').setAttribute('planIdex', index);
        
        list.appendChild(item);
    }
    
    create(controller) {
        var create = this.build('figure_create');
        
        controller.appendChild(create);
        
        this.makeEditor(create.querySelector('.figure-create-body'));
    }
    
    makeEditor(body) {
        var editor = this.build('figure_editor_create'),
            selects = editor.querySelectorAll('.figure-editor select'),
            selectorFrom = editor.querySelector('.figure-editor-selector-from');
        
        this.makeOption(selects[0]);
        this.makeOption(selects[1]);
        this.makeShapeOptions(selects[2]);
        
        selectorFrom.checked = true;
        
        body.appendChild(editor);
    }
    
    makeOption(select) {
        var box = this.getHandler('Box'),
            ids = box.ids;
        
        for (let i = 0; i < ids.length; i++) {
            var option = this.build('figure_editor_option');
            
            option.appendChild(document.createTextNode(ids[i]));
            option.setAttribute('value', ids[i]);
            
            select.appendChild(option);
        }
    }
    
    makeShapeOptions(select) {
        var shapes = [
            '---',
            '-->',
            '<->',
        ];
        
        for (let i = 0; i < shapes.length; i++) {
            var option = this.build('figure_editor_option');
            
            option.appendChild(document.createTextNode(shapes[i]));
            option.setAttribute('value', i);
            
            select.appendChild(option);
        }
    }
    
    store(controller) {
        var from = document.querySelector('.figure-editor-from'),
            fValue = from.options[from.selectedIndex].value,
            to = document.querySelector('.figure-editor-to'),
            tValue = to.options[to.selectedIndex].value,
            cValue = document.querySelector('.figure-editor-color').value,
            shape = document.querySelector('.figure-editor-shape'),
            sValue = shape.options[shape.selectedIndex].value;
        
        if (fValue !== tValue) {
            this.plan.push([fValue, tValue, cValue, sValue]);
        }
    }
    
    edit(event, controller) {
        var edit = this.build('figure_edit'),
            plan = this.plan,
            pIndex = event.target.getAttribute('planIndex');
        
        edit.setAttribute('planIndex', pIndex);

        this.makeEditorImm(plan, pIndex, edit.querySelector('.figure-edit-body'));
        
        controller.appendChild(edit);
    }
    
    makeEditorImm(plan, index, body) {
        var editor = this.build('figure_editor_edit'),
            from = editor.querySelector('.figure-editor-from-imm'),
            to = editor.querySelector('.figure-editor-to-imm'),
            color = editor.querySelector('.figure-editor-color'),
            select = editor.querySelector('.figure-editor select');
        
        from.setAttribute('value', plan[index][0]);
        from.appendChild(document.createTextNode(plan[index][0]));
        to.setAttribute('value', plan[index][1]);
        to.appendChild(document.createTextNode(plan[index][1]));
        color.setAttribute('value', plan[index][2]);
        
        this.makeShapeOptions(select);
        
        body.appendChild(editor);
    }
    
    update(controller) {
        var pIndex = controller.querySelector('.figure-edit').getAttribute('planIndex'),
            from = document.querySelector('.figure-editor-from-imm'),
            fValue = from.getAttribute('value'),
            to = document.querySelector('.figure-editor-to-imm'),
            tValue = to.getAttribute('value'),
            cValue = document.querySelector('.figure-editor-color').value,
            shape = document.querySelector('.figure-editor-shape'),
            sValue = shape.options[shape.selectedIndex].value;
        
        this.plan[pIndex] = [fValue, tValue, cValue, sValue];
    }
    
    destroy(event) {
        var plan = this.plan,
            pIndex = event.target.getAttribute('planIndex');
        
        plan.splice(pIndex, 1);
    }
    
    setFromOrTo(controller, id) {
        var checked = this.getCheckedSelector(controller),
            options;
        
        if (checked == "from") {
            options = controller.querySelector('.figure-editor-from');
            
            controller.querySelector('.figure-editor-selector-to').checked = true;
        } else if (checked == "to") {
            options = controller.querySelector('.figure-editor-to');
            
            controller.querySelector('.figure-editor-selector-none').checked = true;
        }
        
        if (!options) return false;
        
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == id) {
                options.selectedIndex = i;
            }
        }
    }
    
    getCheckedSelector(controller) {
        var selectors = controller.querySelector('.figure-editor-selectors').childNodes;
        
        for (let i = 0; i < selectors.length; i++) {
            if (selectors[i].checked) {
                return selectors[i].value;
            }
        }
    }
    
    
    figure() {
        
        this.refreshCanvas();
        
        var canvas = document.getElementById("DiaFigure");
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            
            for (let i = 0; i < this.plan.length; i++) {
                var pair = this.plan[i],
                    fElem = document.querySelector('.diaCursor[dia-id="' + pair[0] + '"]'),
                    tElem = document.querySelector('.diaCursor[dia-id="' + pair[1] + '"]'),
                    from = this.getFromCord(canvas, fElem, tElem),
                    to = this.getToCord(canvas, fElem, tElem),
                    color = pair[2],
                    shape = pair[3];
                /*
                console.log("from & to");
                console.log(from);
                console.log(to);
                */
                
                ctx.beginPath();
                
                ctx.strokeStyle = color;
                
                ctx.moveTo(from.left, from.top);
                ctx.lineTo(to.left, to.top);
                
                ctx.stroke();

                if (shape >= 1) {
                    this.fillArrow(ctx, color, from.left, from.top, to.left, to.top, 10, 45);
                }
                if (shape >= 2) {
                    this.fillArrow(ctx, color, to.left, to.top, from.left, from.top, 10, 45);
                }
            }
        }
        
    }
    
    getCord(p, e) {
        var pRect = p.getBoundingClientRect(),
            eRect = e.getBoundingClientRect();
        
        return { left: eRect.left - pRect.left, top: eRect.top - pRect.top };
    }
    
    getFromCord(p, f, t) {
        var pRect = p.getBoundingClientRect(),
            fRect = f.getBoundingClientRect(),
            tRect = t.getBoundingClientRect(),
            w = (fRect.left + fRect.width/2) - (tRect.left + tRect.width/2) - pRect.left,
            h = (fRect.top + fRect.height/2) - (tRect.top + tRect.height/2) - pRect.top;
        
        if (Math.abs(w) < Math.abs(h)) {
            
            if (h <= 0) {
                return {
                    left: fRect.left + fRect.width/2 - pRect.left,
                    top: fRect.top + fRect.height - pRect.top
                };
                
            } else {
                return {
                    left: fRect.left + fRect.width/2 - pRect.left,
                    top: fRect.top - pRect.top
                };
            }
            
        } else {
            
            if (w <= 0) {
                return {
                    left: fRect.left + fRect.width - pRect.left,
                    top: fRect.top + fRect.height/2 - pRect.top
                };
                
            } else {
                return {
                    left: fRect.left - pRect.left,
                    top: fRect.top + fRect.height/2 - pRect.top
                }
                
            }
            
        }
        
    }
    
    getToCord(p, f, t) {
        var pRect = p.getBoundingClientRect(),
            fRect = f.getBoundingClientRect(),
            tRect = t.getBoundingClientRect(),
            w = (fRect.left + fRect.width/2) - (tRect.left + tRect.width/2) - pRect.left,
            h = (fRect.top + fRect.height/2) - (tRect.top + tRect.height/2) - pRect.top;

        if (Math.abs(w) < Math.abs(h)) {

            if (h <= 0) {
                return {
                    left: tRect.left + tRect.width/2 - pRect.left,
                    top: tRect.top - pRect.top
                };
                
            } else {
                return {
                    left: tRect.left + tRect.width/2 - pRect.left,
                    top: tRect.top + tRect.height - pRect.top
                };
            }

        } else {

            if (w <= 0) {
                return {
                    left: tRect.left - pRect.left,
                    top: tRect.top + tRect.height/2 - pRect.top
                };

            } else {
                return {
                    left: tRect.left + tRect.width - pRect.left,
                    top: tRect.top + tRect.height/2 - pRect.top
                };

            }

        }
        
    }
    
    fillArrow(ctx, color, xs, ys, xe, ye, leng, rad) {
        if (rad >= 90 || rad <= 0) return false;
        
        var dist = this.getCoordOnLine(xe, ye, xs, ys, leng),
            coordCW = this.getCoordRad(xe, ye, dist.x, dist.y, rad),
            coordCCW = this.getCoordRad(xe, ye, dist.x, dist.y, -rad);
        
        ctx.beginPath();
        
        ctx.fillStyle = color;
        
        ctx.moveTo(xe, ye);
        ctx.lineTo(coordCW.x, coordCW.y);
        ctx.lineTo(coordCCW.x, coordCCW.y);
        
        ctx.fill();
        
    }
    
    getCoordOnLine(xs, ys, xe, ye, dist) {
        var leng = this.getLeng(xs, ys, xe, ye),
            sinT = this.getSin(ys, ye, leng),
            cosT = this.getCos(xs, xe, leng),
            x, y;
        
        console.log("Figure.getCoordOnLine()");
        console.log("leng:\t" + leng);
        console.log("sin:\t" + sinT);
        console.log("cos:\t" + cosT);
        
        x = xs > xe ? xs - dist * cosT : xs + dist * cosT;
        y = ys > ye ? ys - dist * sinT : ys + dist * sinT;
        
        return {x, y};
    }
    
    getCoordRad(xs, ys, xe, ye, r) {
        var radii = r * Math.PI / 360,
            x = Math.cos(radii) * (xe - xs) - Math.sin(radii) * (ye - ys) + xs,
            y = Math.sin(radii) * (xe - xs) + Math.cos(radii) * (ye - ys) + ys;
        
        return {x, y}
    }
    
    getLeng(xs, ys, xe, ye) {
        return Math.sqrt(Math.pow(Math.abs(xs - xe), 2) + Math.pow(Math.abs(ys - ye), 2));
    }
    
    getSin(ys, ye, leng) {
        return Math.abs(ys - ye) / leng;
    }
    
    getCos(xs, xe, leng) {
        return Math.abs(xs - xe) / leng;
    }
    
    refreshCanvas() {
        var canvas = document.getElementById('DiaFigure'),
            width = canvas.getAttribute('width'),
            height = canvas.getAttribute('height');
        
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            
            ctx.clearRect(0, 0, width, height);
        }
    }
    
    
    
    startDrag(editor, event, handler) {

        var dragOffset = {
            x: event.offsetX,
            y: event.offsetY
        };

        addEventListener("mousemove", doDrag);
        addEventListener("mouseup", endDrag);

        function doDrag(event) {
            var pRect = editor.parentNode.getBoundingClientRect(),
                dragX = event.clientX - pRect.left - dragOffset.x,
                dragY = event.clientY - pRect.top - dragOffset.y;

            editor.setAttribute("style", "top: " + Math.floor(dragY) + "px; left: " + Math.floor(dragX) + "px;");
        }

        function endDrag(event) {
            removeEventListener("mousemove", doDrag);
            removeEventListener("mouseup", endDrag);

            var fig = handler.getHandler("Figure");

            fig.figure();
        }
    }
}

class Box extends Elemental {
    
    constructor(app) {
        super(app, "Box");
        
        this.linkers = [null];
        this.ids = [];
    }
    
    save() {
        var elements = this.gatherElements();
        
        return this.makeSaveData(elements);
    }
    
    gatherElements() {
        
        var elements = Array.from(document.querySelectorAll("div[handler='Box']")),
            r = [],
            a = [];
        
        r = elements.reduce(function(acc, element) {
            var linker = element.getAttribute("linker");
            
            if (typeof acc[linker] != "object") {
                acc[linker] = [];
            }
            
            acc[linker].push(element);
            
            return acc;
        }, []);
        
        return r;
    }
    
    makeSaveData(data) {
        var dest;
        
        dest = data.reduce(function(acc, elements, index) {
            var name = "Box_" + index;
            
            acc[name] = elements.reduce(function(accIn, element) {
                if (element.classList.contains("diaBox")) {
                    accIn["content"] = element.innerHTML;
                    accIn["id"] = element.getAttribute('dia-id');
                } else if (element.classList.contains("diaCursor")) {
                    accIn["position"] = element.getAttribute("style");
                }
                
                return accIn;
            }, {});
            
            return acc;
        }, {});
        
        return { diaBox: dest };
    }
    
    load(data) {
        var keys = Object.keys(data["diaBox"]);
        
        for (let key of keys) {
            this.insert(data["diaBox"][key]["content"], data["diaBox"][key]["position"], data["diaBox"][key]["id"])
        }
    }
    
    
    
    makeListeners() {
        return {
            "keydown": [
                [ this.insertHeading, false ],
            ],
            "keydown.Enter": [
                [ this.insertParagraph, true ],
            ],
            "input, heading": [
                [ this.syncHeadingContent, false ],
            ],
            "mousedown, cursor": [
                [ this.startDrag, false ],
            ],
            "click, cursor": [
                [ this.setFromOrTo, false ],
            ],
            "click, heading": [
                [ this.syncHeadingContent, false ],
            ]
        };
    }
    
    makeBuildModel() {
        return {
            "Box": {
                "tag": "<div class='diaBox' contenteditable='true' handler='Box'></div>",
            },
            "cursor": {
                "tag": "<div class='diaCursor' handler='Box' segment='cursor'></div>",
            },
            "heading": {
                "tag": "<h1 segment='heading'></div>",
            },
            "paragraph": {
                "tag": "<p segment='paragraph'></p>",
            }
        };
    }
    
    makeBuildLocation() {
        return {
            "insert": "#diaText",
            "insertCursor": "#diaImage",
        };
    }
    
    
    insert(boxContent = null, position = null, id = null) {
        var box = this.build(),
            id = id || this.makeId(),
            cursor = this.build("cursor"),
            loc = this.getBuildLocation('insert'),
            cursorLoc = this.getBuildLocation('insertCursor'),
            heading;
        
        this.link(box, cursor);
        
        if (box.hasAttribute("dia-id")) {
            cursor.setAttribute("dia-id", id);
            this.ids.push(box.getAttribute("dia-id"));
        } else {
            box.setAttribute("dia-id", id);
            cursor.setAttribute("dia-id", id);
            this.ids.push(id);
        }
        
        if (boxContent) {
            box.innerHTML = boxContent;
            heading = box.querySelector("h1")
        }
        
        if (position) {
            cursor.setAttribute("style", position);
            
        }
        
        loc.appendChild(box);
        cursorLoc.appendChild(cursor);
        
        if (heading) {
            heading.click();
        }
    }
    
    makeId() {
        var t = trial(),
            published = this.ids;
        
        while (exist(t)) {
            t = trial();
        }
        
        return t;
        
        function trial() {
            return Math.floor(Math.random() * Math.floor(10000));
        }
        
        function exist(t) {
            published.some(function (id) {
                return id == t;
            });
        }
    }
    
    link(box, cursor) {
        var linker = this.linkers.length;
        
        this.linkers.push(linker);
        
        box.setAttribute("linker", linker);
        cursor.setAttribute("linker", linker);
        
    }
    
    
    insertHeading(editor, event) {
        
        var heading = this.build("heading");
        
        this.addElement(editor, heading);
        
        heading.appendChild(document.createTextNode(event.key));

        this.putSelection(heading, heading.innerHTML.length);
        
        event.preventDefault();
    }
    
    insertParagraph(editor, event) {
        var paragraph = this.build("paragraph");
        
        this.addElement(editor, paragraph);
        
        this.putSelection(paragraph);
        
        event.preventDefault();
    }
    
    makeHeadingElement(n = 1) {
        var h;
        
        if ([1, 2, 3, 4, 5, 6].indexOf(n) == -1) { return false; }
        
        h = document.createElement("h" + n);
        h.setAttribute("segment", "heading");
        
        return h;
    }
    
    makeParagraphElement() {
        return document.createElement("p");
    }
    
    syncHeadingContent(editor) {
        
        var h = editor.querySelector("h1"),
            linker = editor.getAttribute("linker"),
            target = document.getElementById("diaImage").querySelector("div[linker='" + linker + "']");
        
        target.innerHTML = h.innerHTML;
    }
    
    
    setFromOrTo(controller, editor) {
        if (!controller) return false;
        
        this.getHandler("Figure").setFromOrTo(controller, editor.getAttribute('dia-id'));
    }
    
    
    startDrag(editor, event, handler) {
        
        var dragOffset = {
            x: event.offsetX,
            y: event.offsetY
        };
        
        addEventListener("mousemove", doDrag);
        addEventListener("mouseup", endDrag);

        function doDrag(event) {
            var pRect = editor.parentNode.getBoundingClientRect(),
                dragX = event.clientX - pRect.left - dragOffset.x,
                dragY = event.clientY - pRect.top - dragOffset.y;
            
            dragX = dragX - (dragX % 5);
            dragY = dragY - (dragY % 5);

            editor.setAttribute("style", "top: " + Math.floor(dragY) + "px; left: " + Math.floor(dragX) + "px;");
        }

        function endDrag(event) {
            removeEventListener("mousemove", doDrag);
            removeEventListener("mouseup", endDrag);
            
            var fig = handler.getHandler("Figure");
            
            fig.figure();
        }
    }
}



var app = new Application;







/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9yZXNldC5jc3M/YzQ5YiIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL3N0eWxlcy5zY3NzP2I3ZjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5QjtBQUNFOztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsYUFBYTs7QUFFN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGlCQUFpQjtBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCLG9CQUFvQjs7QUFFM0M7O0FBRUEsMkJBQTJCLHNCQUFzQjtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsSUFBSTs7QUFFYjtBQUNBO0FBQ0EscURBQXFELG9CQUFvQjs7QUFFekU7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLHFCQUFxQjs7QUFFaEQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixnQkFBZ0I7QUFDdkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyRUFBMkUsbUNBQW1DO0FBQzlHOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0EsYUFBYSxJQUFJOztBQUVqQjtBQUNBLFNBQVMsSUFBSTs7QUFFYixnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0RBQWtELGNBQWM7O0FBRWhFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJFQUEyRSxtQ0FBbUM7QUFDOUc7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUEiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IFwiLi9jc3MvcmVzZXQuY3NzXCI7XHJcbmltcG9ydCBcIi4vY3NzL3N0eWxlcy5zY3NzXCI7XHJcblxyXG5jbGFzcyBSZXF1ZXN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihoYW5kbGVyLCBzaWduYWwpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IHRoaXMucmVhZFNpZ25hbChoYW5kbGVyLCBzaWduYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWRTaWduYWwoaGFuZGxlciwgc2lnbmFsKSB7XHJcbiAgICAgICAgdmFyIFtldmVudCwgc2VnbWVudCwgbWV0aG9kXSA9IHNpZ25hbC5zcGxpdCgnLCcsIDMpLFxyXG4gICAgICAgICAgICBldmVudE5hbWU7XHJcblxyXG4gICAgICAgIHNlZ21lbnQgPSB0aGlzLmZvcm1hdChzZWdtZW50KSA/ICcuJyArIHRoaXMuZm9ybWF0KHNlZ21lbnQpIDogJyc7XHJcbiAgICAgICAgbWV0aG9kID0gdGhpcy5mb3JtYXQobWV0aG9kKSA/ICcvJyArIHRoaXMuZm9ybWF0KG1ldGhvZCkgOiAnJztcclxuXHJcbiAgICAgICAgZXZlbnROYW1lID0gZXZlbnQgKyAnLycgKyBoYW5kbGVyLmdldEhhbmRsZXJOYW1lKCkgKyBzZWdtZW50ICsgbWV0aG9kO1xyXG5cclxuICAgICAgICByZXR1cm4gZXZlbnROYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdChzdHIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9eXFwuK3xcXC4kLywgJycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQYXJhbWV0ZXJHZXR0ZXJzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbIFtcImVkaXRvclwiLCBcImVkaXRvckVsZW1lbnRcIl0sIHRoaXMuZ2V0RWRpdG9yIF0sXHJcbiAgICAgICAgICAgIFsgW1wiaGFuZGxlclwiLCBcImhhbmRsZXJGb3JFbGVtZW50XCJdLCB0aGlzLmdldEhhbmRsZXIgXSxcclxuICAgICAgICAgICAgWyBbXCJldmVudFwiXSwgdGhpcy5nZXRFdmVudCBdLFxyXG4gICAgICAgICAgICBbIFtcImNvbnRyb2xsZXJcIl0sIHRoaXMuZ2V0RmlndXJlQ29udHJvbGxlciBdLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWRpdG9yKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICB3aGlsZSAoIXZhbGlkKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmFsaWQoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJoYW5kbGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIYW5kbGVyKG5hbWUsIGhhbmRsZXIpIHtcclxuXHJcbiAgICAgICAgdmFyIGFwcCA9IGhhbmRsZXIuZ2V0QXBwKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbmFtZSA9IG5hbWUudGFyZ2V0O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIgJiYgXCJub2RlVHlwZVwiIGluIG5hbWUpIHtcclxuICAgICAgICAgICAgd2hpbGUgKCF2YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuYW1lID0gbmFtZSA9PT0gZG9jdW1lbnQgPyAnJyA6IG5hbWUuZ2V0QXR0cmlidXRlKFwiaGFuZGxlclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcHAuaGFuZGxlcnNbbmFtZV0gfHwgdGhpcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmFsaWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lID09PSBkb2N1bWVudCB8fCBuYW1lLmhhc0F0dHJpYnV0ZShcImhhbmRsZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRFdmVudChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0RmlndXJlQ29udHJvbGxlcihldmVudCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWNvbnRyb2xsZXInKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29yZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRBcHAoYXBwKTtcclxuICAgICAgICB0aGlzLnNldEhhbmRsZXJOYW1lKG5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFwcChhcHApIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcCB8fCB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFwcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcHA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXBwRGVzaWduKCkge1xyXG4gICAgICAgIHZhciBhcHAgPSB0aGlzLmdldEFwcCgpO1xyXG5cclxuICAgICAgICBhcHAuZGVzaWduID0gYXBwLm1ha2VBcHBEZXNpZ24oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcHBEZXNpZ24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBwKCkuZGVzaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpc3RlbmVycygpIHtcclxuICAgICAgICB2YXIgYXBwID0gdGhpcy5nZXRBcHAoKSxcclxuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lckxpc3QoKTtcclxuXHJcbiAgICAgICAgYXBwLmxpc3RlbmVycyA9IGFwcC5saXN0ZW5lcnMgfHwge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgYXBwLmxpc3RlbmVyc1trZXldID0gbGlzdGVuZXJzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExpc3RlbmVyTGlzdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRMaXN0ZW5lcnModGhpcy5tYWtlTGlzdGVuZXJzKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtYWtlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRMaXN0ZW5lcnMobGlzdGVuZXJMaXN0KSB7XHJcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IHt9LFxyXG4gICAgICAgICAgICBwYXJzZWQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsaXN0ZW5lckxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgIHBhcnNlZCA9IHRoaXMucGFyc2VLZXkoa2V5KTtcclxuICAgICAgICAgICAgZm9ybWF0dGVkW3BhcnNlZC5ldmVudCArIHRoaXMuZ2V0SGFuZGxlck5hbWUoKSArIHBhcnNlZC5zZWdtZW50ICsgcGFyc2VkLm1ldGhvZF0gPSBsaXN0ZW5lckxpc3Rba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VLZXkoa2V5KSB7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVkID0ga2V5LnNwbGl0KCcsJywgMyksXHJcbiAgICAgICAgICAgIHJlcGxhY2VkLCBwYXJzZWQgPSB7fTtcclxuXHJcbiAgICAgICAgcGFyc2VkLmV2ZW50ID0gc3BsaXR0ZWRbMF0gKyAnLyc7XHJcbiAgICAgICAgcGFyc2VkLnNlZ21lbnQgPSAodHlwZW9mIHNwbGl0dGVkWzFdID09PSBcInN0cmluZ1wiICYmIChyZXBsYWNlZCA9IHNwbGl0dGVkWzFdLnJlcGxhY2UoL1xccy9nLCAnJykpKSA/ICcuJyArIHJlcGxhY2VkIDogJyc7XHJcbiAgICAgICAgcGFyc2VkLm1ldGhvZCA9ICh0eXBlb2Ygc3BsaXR0ZWRbMl0gPT09IFwic3RyaW5nXCIgJiYgKHJlcGxhY2VkID0gc3BsaXR0ZWRbMl0ucmVwbGFjZSgvXFxzL2csICcnKSkpID8gJy8nICsgcmVwbGFjZWQgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0ZW5lcnMobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwcCgpLmxpc3RlbmVyc1tuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIYW5kbGVycygpIHtcclxuICAgICAgICB2YXIgYXBwID0gdGhpcy5nZXRBcHAoKSxcclxuICAgICAgICAgICAgZGVzaWduID0gYXBwLmdldEFwcERlc2lnbigpLFxyXG4gICAgICAgICAgICBkZXNpZ25LZXlzID0gT2JqZWN0LmtleXMoZGVzaWduKTtcclxuXHJcbiAgICAgICAgYXBwLmhhbmRsZXJzID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRlc2lnbktleSBvZiBkZXNpZ25LZXlzKSB7ICAgICAgICAgICAgYXBwLmhhbmRsZXJzW2Rlc2lnbktleV0gPSBuZXcgZGVzaWduW2Rlc2lnbktleV1bXCJjbGFzc1wiXShhcHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFuZGxlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBwKCkuaGFuZGxlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFuZGxlcihuYW1lKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5nZXRIYW5kbGVycygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PSBcIm9iamVjdFwiICYmIFwibm9kZVR5cGVcIiBpbiBuYW1lKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSB0aGlzLmV2ZW50VGFyZ2V0VG9IYW5kbGVyTmFtZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXJzW25hbWVdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBldmVudFRhcmdldFRvSGFuZGxlck5hbWUodGFyZ2V0RWxlbWVudCkge1xyXG5cclxuICAgICAgICB3aGlsZSAoIXZhbGlkKHRhcmdldEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0YXJnZXRFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5ID8gJ0FwcCcgOiB0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZShcImhhbmRsZXJcIik7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkKHRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5IHx8IHRhcmdldC5oYXNBdHRyaWJ1dGUoXCJoYW5kbGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRIYW5kbGVyTmFtZShuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyTmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFuZGxlck5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlck5hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzSGFuZGxlck5hbWUobmFtZSkge1xyXG4gICAgICAgIHZhciBkZXNpZ24gPSB0aGlzLmdldEFwcERlc2lnbigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAhIWRlc2lnbltuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXJhbWV0ZXJHZXR0ZXJzKCkge1xyXG4gICAgICAgIHZhciBhcHAgPSB0aGlzLmdldEFwcCgpO1xyXG5cclxuICAgICAgICBhcHAucGFyYW1HZXR0ZXJzID0gbmV3IFBhcmFtZXRlckdldHRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFyYW1ldGVyR2V0dGVycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcHAoKS5wYXJhbUdldHRlcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEJhc2ljTGlzdGVuZXJzIGV4dGVuZHMgQ29yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcclxuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwibW91c2Vkb3duXCI6IHRoaXMuaGFuZGxlTW91c2Vkb3duLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFwibW91c2V1cFwiOiB0aGlzLmhhbmRsZU1vdXNldXAuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgXCJjbGlja1wiOiB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFwia2V5ZG93blwiOiB0aGlzLmhhbmRsZUtleWRvd24uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgXCJrZXl1cFwiOiB0aGlzLmhhbmRsZUtleXVwLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIFwiaW5wdXRcIjogdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBcImNoYW5nZVwiOiB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFuZGxlTW91c2Vkb3duKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLmdldEhhbmRsZXIoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaGFuZGxlci5oYW5kbGUoXCJtb3VzZWRvd25cIiwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vdXNldXAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuZ2V0SGFuZGxlcihldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICBoYW5kbGVyLmhhbmRsZShcIm1vdXNldXBcIiwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLmdldEhhbmRsZXIoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICBcclxuICAgICAgICBoYW5kbGVyLmhhbmRsZShcImNsaWNrXCIsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5nZXRIYW5kbGVyKGV2ZW50LnRhcmdldCksXHJcbiAgICAgICAgICAgIG5hbWUgPSBcImtleWRvd25cIjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09IFwiRW50ZXJcIikge1xyXG4gICAgICAgICAgICBuYW1lICs9IFwiLkVudGVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVyLmhhbmRsZShuYW1lLCBldmVudCwgd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkuc3RhcnRDb250YWluZXIpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFuZGxlS2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuZ2V0SGFuZGxlcihldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICBoYW5kbGVyLmhhbmRsZShcImtleXVwXCIsIGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuZ2V0SGFuZGxlcihldmVudC50YXJnZXQpLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCksXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBzZWxlY3Rpb24gPyBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5zdGFydENvbnRhaW5lciA6IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaGFuZGxlci5oYW5kbGUoXCJpbnB1dFwiLCBldmVudCwgZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5nZXRIYW5kbGVyKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgIGhhbmRsZXIuaGFuZGxlKFwiY2hhbmdlXCIsIGV2ZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGFuZGxlciBleHRlbmRzIENvcmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xyXG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgaGFuZGxlKGV2ZW50TmFtZSwgZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzaWduYWxPYmogPSB0aGlzLm1ha2VTaWduYWxPYmplY3QoZXZlbnROYW1lLCBldmVudCwgb3B0aW9uKSxcclxuICAgICAgICAgICAgc2lnbmFsLFxyXG4gICAgICAgICAgICBzTnVtID0gc2lnbmFsT2JqLnNlZ21lbnQubGVuZ3RoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHNpZ25hbCA9IHRoaXMubWFrZVNpZ25hbChzaWduYWxPYmopO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXF1ZXN0KG5ldyBSZXF1ZXN0KHRoaXMsIHNpZ25hbCksIGV2ZW50LCBzTnVtID09IHNpZ25hbE9iai5zZWdtZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2lnbmFsT2JqLnNlZ21lbnQubGVuZ3RoID09IDApIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNpZ25hbE9iai5zZWdtZW50LnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZVNpZ25hbE9iamVjdChldmVudE5hbWUsIGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICB2YXIgc2lnT2JqID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2lnT2JqLmV2ZW50ID0gdGhpcy5zaWduYWxFdmVudE5hbWUoZXZlbnROYW1lLCBldmVudCk7XHJcbiAgICAgICAgc2lnT2JqLnNlZ21lbnQgPSB0aGlzLnNpZ25hbEhhbmRsZXJTZWdtZW50KGV2ZW50LCBvcHRpb24pO1xyXG4gICAgICAgIHNpZ09iai5vcGVyYXRpb24gPSB0aGlzLnNpZ25hbE9wZXJhdGlvbihldmVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHNpZ09iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZVNpZ25hbChzaWdPYmopIHtcclxuICAgICAgICByZXR1cm4gc2lnT2JqLmV2ZW50ICsgJywgJyArIHNpZ09iai5zZWdtZW50LmpvaW4oJy4nKSArICcsICcgKyBzaWdPYmoub3BlcmF0aW9uO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXROZWFyUGFyZW50RWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25hbEV2ZW50TmFtZShiYXNlRXZlbnROYW1lLCBldmVudCkge1xyXG4gICAgICAgIHJldHVybiBiYXNlRXZlbnROYW1lLnRyaW0oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2lnbmFsSGFuZGxlclNlZ21lbnQoZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghZXZlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gb3B0aW9uID8gb3B0aW9uIDogZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgICAgICBjaGVjayA9IHRoaXMuZ2V0TmVhclBhcmVudEVsZW1lbnQodGFyZ2V0KSxcclxuICAgICAgICAgICAgc2VnbWVudCA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlIChjaGVjayAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjaGVjay5oYXNBdHRyaWJ1dGUoXCJzZWdtZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LnVuc2hpZnQoY2hlY2suZ2V0QXR0cmlidXRlKFwic2VnbWVudFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNoZWNrID0gY2hlY2sucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNpZ25hbE9wZXJhdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmICghZXZlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hlY2sgPSB0aGlzLmdldE5lYXJQYXJlbnRFbGVtZW50KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNoZWNrLmhhc0F0dHJpYnV0ZShcIm9wZXJhdGlvblwiKSA/ICBjaGVjay5nZXRBdHRyaWJ1dGUoXCJvcGVyYXRpb25cIikgOiAnJztcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdCwgZXZlbnQsIGZpcnN0KSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKHJlcXVlc3QuZXZlbnROYW1lKSB8fCBbXSxcclxuICAgICAgICAgICAgYXJncyA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBhcmdzID0gdGhpcy5yZXNvbHZlRGVwZW5kZW5jaWVzKGxpc3RlbmVyWzBdLCBldmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZmlyc3QgfHwgbGlzdGVuZXJbMV0pIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJbMF0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcmVzb2x2ZURlcGVuZGVuY2llcyhtZXRob2QsIGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSxcclxuICAgICAgICAgICAgZGVwcyA9IHRoaXMuZ2V0RGVwZW5kZW5jaWVzKG1ldGhvZCksXHJcbiAgICAgICAgICAgIHBHZXR0ZXJzID0gdGhpcy5nZXRQYXJhbWV0ZXJHZXR0ZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcmcgPSB0aGlzLmdldFBhcmFtZXRlcihkZXBzW2ldLCBwR2V0dGVycywgZXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlcGVuZGVuY2llcyhtZXRob2QpIHtcclxuICAgICAgICB2YXIgY29kZSA9IG1ldGhvZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICByZSA9IC9cXCgoW14pXSo/KVxcKS8sXHJcbiAgICAgICAgICAgIHJlc3VsdDtcclxuXHJcbiAgICAgICAgcmVzdWx0ID0gcmUuZXhlYyhjb2RlKTtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHRbMV0uc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tYXAoeCA9PiB4LnRyaW0oKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFBhcmFtZXRlcihkZXAsIGdldHRlcnMsIGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZ2V0dGVyID0gZ2V0dGVyc1tpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZ2V0dGVyWzBdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVwID09IGdldHRlclswXVtrXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXR0ZXJbMV0oZXZlbnQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkZXA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFwcGxpY2F0aW9uSW5pdGlhbGl6ZXIgZXh0ZW5kcyBIYW5kbGVyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRBcHBEZXNpZ24oKTtcclxuICAgICAgICB0aGlzLnNldEhhbmRsZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJHZXR0ZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyc1snQXBwJ10gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFjaEJhc2ljTGlzdGVuZXJzKHRoaXMuYXBwKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZEluaXRFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhdHRhY2hCYXNpY0xpc3RlbmVycyhhcHApIHtcclxuXHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IG5ldyBCYXNpY0xpc3RlbmVycyhhcHAsIFwiQmFzaWNMaXN0ZW5lcnNcIiksXHJcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKGtleSwgbGlzdGVuZXJzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYnVpbGRJbml0RWxlbWVudHMoKSB7XHJcbiAgICAgICAgdmFyIGRlc2lnbiA9IHRoaXMuZ2V0QXBwRGVzaWduKCksXHJcbiAgICAgICAgICAgIGhhbmRsZXJOYW1lcyA9IE9iamVjdC5rZXlzKGRlc2lnbiksXHJcbiAgICAgICAgICAgIGhhbmRsZXIsIGVsZW1lbnQsIGxvYztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBoYW5kbGVyTmFtZXMpIHtcclxuICAgICAgICAgICAgaWYgKGRlc2lnbltuYW1lXVtcImF0dHJcIl0gJiYgZGVzaWduW25hbWVdW1wiYXR0clwiXS5pbmRleE9mKCdpbml0JykgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLmdldEhhbmRsZXIobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gaGFuZGxlci5idWlsZCgpO1xyXG4gICAgICAgICAgICAgICAgbG9jID0gaGFuZGxlci5nZXRCdWlsZExvY2F0aW9uKCdpbml0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SGFuZGxlcihuYW1lKS5oYW5kbGUoXCJpbnNlcnRlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZShmaWxlTmFtZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXBwLnNhdmUoKVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc2F2ZUtleXMgPSB0aGlzLmdldFNhdmVLZXlzKCksXHJcbiAgICAgICAgICAgIGhhbmRsZXJzID0gdGhpcy5nZXRIYW5kbGVycygpLFxyXG4gICAgICAgICAgICBkYXRhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEgPSBzYXZlS2V5cy5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWNjLCBoYW5kbGVyc1trZXldLnNhdmUoKSk7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksXHJcbiAgICAgICAgICAgIGROYW1lID0gZmlsZU5hbWUgKyBcIi50eHRcIixcclxuICAgICAgICAgICAgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShkYXRhKV0sIHsgdHlwZTogXCJ0ZXh0L3BsYWluXCJ9KTtcclxuICAgICAgICBcclxuICAgICAgICBhVGFnLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICBhVGFnLmRvd25sb2FkID0gZE5hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhVGFnKTtcclxuICAgICAgICBcclxuICAgICAgICBhVGFnLmNsaWNrKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhVGFnKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0U2F2ZUtleXMoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGRlc2lnbiA9IHRoaXMuZ2V0QXBwRGVzaWduKCksXHJcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhkZXNpZ24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGRlc2lnbltrZXldLmhhc093blByb3BlcnR5KFwiYXR0clwiKSAmJiBkZXNpZ25ba2V5XVtcImF0dHJcIl0uaW5kZXhPZihcInNhdmVcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGxvYWRLZXlzID0gdGhpcy5nZXRTYXZlS2V5cygpLFxyXG4gICAgICAgICAgICBoYW5kbGVycyA9IHRoaXMuZ2V0SGFuZGxlcnMoKSxcclxuICAgICAgICAgICAgaGFuZGxlciA9IHRoaXMsXHJcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCksXHJcbiAgICAgICAgICAgIGRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocmVhZGVyLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsb2FkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnNba2V5XS5sb2FkKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhhbmRsZXIuZ2V0SGFuZGxlcihcIkZpZ3VyZVwiKS5maWd1cmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uSW5pdGlhbGl6ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIobnVsbCwgXCJBcHBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUFwcERlc2lnbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIk5hdmlnYXRpb25CYXJcIjoge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IE5hdmlnYXRpb25CYXIsXHJcbiAgICAgICAgICAgICAgICBhdHRyOiBcImluaXRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIkZpZ3VyZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogRmlndXJlLFxyXG4gICAgICAgICAgICAgICAgYXR0cjogXCJpbml044CAc2F2ZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiQm94XCI6IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiBCb3gsXHJcbiAgICAgICAgICAgICAgICBhdHRyOiBcInNhdmVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRWxlbWVudGFsIGV4dGVuZHMgSGFuZGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRCdWlsZE1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCdWlsZExvY2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnVpbGRNb2RlbCgpIHtcclxuICAgICAgICB0aGlzLmJ1aWxkTW9kZWwgPSB0aGlzLm1ha2VCdWlsZE1vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVpbGRNb2RlbChrZXkpIHtcclxuICAgICAgICBrZXkgPSBrZXkgfHwgdGhpcy5nZXRIYW5kbGVyTmFtZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZE1vZGVsW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QnVpbGRMb2NhdGlvbigpIHtcclxuICAgICAgICB0aGlzLmJ1aWxkTG9jYXRpb24gPSB0aGlzLm1ha2VCdWlsZExvY2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVpbGRMb2NhdGlvbihrZXkpIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYnVpbGRMb2NhdGlvbltrZXldKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYnVpbGQoa2V5ID0gbnVsbCkge1xyXG4gICAgICAgIHZhciBidWlsZEtleSA9IGtleSA/IGtleS5yZXBsYWNlKCdfJywgJycpICsgJ18nICsgdGhpcy5nZXRIYW5kbGVyTmFtZSgpIDogdGhpcy5nZXRIYW5kbGVyTmFtZSgpLFxyXG4gICAgICAgICAgICBidWlsZE1vZGVsID0gdGhpcy5tYWtlU3VmZml4ZWRCdWlsZE1vZGVsKHRoaXMuZ2V0SGFuZGxlck5hbWUoKSksXHJcbiAgICAgICAgICAgIGVsZW1lbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWxlbWVudCA9IHRoaXMubW9kZWxUb0VsZW1lbnQoYnVpbGRNb2RlbCwgYnVpbGRLZXkpO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZShcImJ1aWx0XCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlU3VmZml4ZWRCdWlsZE1vZGVsKHRhcmdldE5hbWUsIG1hZGUgPSB7fSwgbWVyZ2VkID0gW10pIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZGVzaWduID0gdGhpcy5nZXRBcHBEZXNpZ24oKSxcclxuICAgICAgICAgICAgaGFuZGxlck5hbWVzID0gT2JqZWN0LmtleXMoZGVzaWduKSxcclxuICAgICAgICAgICAgaGFuZGxlciwgc3VmZml4ZWQsIGtleXM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhhbmRsZXJOYW1lIG9mIGhhbmRsZXJOYW1lcykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXJOYW1lID09IHRhcmdldE5hbWUgJiYgbWVyZ2VkLmluZGV4T2YoaGFuZGxlck5hbWUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBtZXJnZWQucHVzaCh0YXJnZXROYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gdGhpcy5nZXRIYW5kbGVyKGhhbmRsZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHN1ZmZpeGVkID0gdGhpcy5hZGRTdWZmaXgoaGFuZGxlci5tYWtlQnVpbGRNb2RlbCgpLCBoYW5kbGVyLmdldEhhbmRsZXJOYW1lKCkpO1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHN1ZmZpeGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hZGVba2V5XSA9IHN1ZmZpeGVkW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVzaWduW2hhbmRsZXJOYW1lXVsnY2hpbGRyZW4nXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZFRhcmdldCBvZiBkZXNpZ25baGFuZGxlck5hbWVdWydjaGlsZHJlbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZUJ1aWxkTW9kZWwoY2hpbGRUYXJnZXQsIG1hZGUsIG1lcmdlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYWRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRTdWZmaXgoYnVpbGRNb2RlbCwgaGFuZGxlck5hbWUpIHtcclxuICAgICAgICB2YXIgZGVzaWduID0gdGhpcy5nZXRBcHBEZXNpZ24oKSxcclxuICAgICAgICAgICAgZGVzdCA9IHt9LFxyXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoYnVpbGRNb2RlbCksXHJcbiAgICAgICAgICAgIHN1ZmZpeCA9ICdfJyArIGhhbmRsZXJOYW1lLFxyXG4gICAgICAgICAgICBwcm9jLFxyXG4gICAgICAgICAgICBpbm5lcktleXM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0hhbmRsZXJOYW1lKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHByb2MgPSBkZXN0W2tleV0gPSB7fTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb2MgPSBkZXN0W2tleS5yZXBsYWNlKCdfJywgJycpICsgc3VmZml4XSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbm5lcktleXMgPSBPYmplY3Qua2V5cyhidWlsZE1vZGVsW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5uZXJLZXkgb2YgaW5uZXJLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydChkZXNpZ24sIHN1ZmZpeCwgcHJvYywgYnVpbGRNb2RlbFtrZXldLCBpbm5lcktleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRlc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNwb3J0KGRlc2lnbiwgc3VmZml4LCB0bywgZnJvbSwga2V5KSB7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuXHJcblxyXG4gICAgICAgIGlmIChrZXkgPT0gXCJjaGlsZHJlblwiKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gZnJvbS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdG9bJ2NoaWxkcmVuJ10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0hhbmRsZXJOYW1lKGNoaWxkcmVuW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvWydjaGlsZHJlbiddLnB1c2goY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b1snY2hpbGRyZW4nXS5wdXNoKGNoaWxkcmVuW2ldLnJlcGxhY2UoJ18nLCAnJykgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vZGVsVG9QbGFuKGJ1aWxkTW9kZWwsIGJ1aWxkS2V5KSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0b1BsYW4oYnVpbGRNb2RlbFtidWlsZEtleV0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b1BsYW4odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcImNoaWxkcmVuXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpbXCJjaGlsZHJlblwiXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlubmVyS2V5IGluIHRhcmdldFtcImNoaWxkcmVuXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyS2V5ID0gaW5uZXJLZXkucmVwbGFjZSgnXycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkTW9kZWxbdGFyZ2V0W1wiY2hpbGRyZW5cIl1baW5uZXJLZXldXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW1wiY2hpbGRyZW5cIl1bdGFyZ2V0W1wiY2hpbGRyZW5cIl1baW5uZXJLZXldXSA9IHRvUGxhbihidWlsZE1vZGVsW3RhcmdldFtcImNoaWxkcmVuXCJdW2lubmVyS2V5XV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHRhcmdldFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYW5Ub0VsZW1lbnQoYnVpbGRQbGFuKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvRWxlbWVudChidWlsZFBsYW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvRWxlbWVudChwbGFuLCBjaGlsZCA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGFuW1wib3B0aW9uYWxcIl0gJiYgY2hpbGQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIFt0YWdOYW1lLCBhdHRyRGF0YSwgY29udGVudF0gPSB0aGlzLmV4dHJhY3RUYWdEYXRhKHBsYW5bXCJ0YWdcIl0pLFxyXG4gICAgICAgICAgICBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFrZUF0dHJpYnV0ZXMoZWxtLCBhdHRyRGF0YSk7XHJcbiAgICAgICAgdGhpcy5tYWtlQ29udGVudChlbG0sIGNvbnRlbnQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcGxhbltcImNoaWxkcmVuXCJdKSB7XHJcbiAgICAgICAgICAgIGVsbS5hcHBlbmRDaGlsZCh0aGlzLnRvRWxlbWVudChwbGFuW1wiY2hpbGRyZW5cIl1ba2V5XSwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0VGFnRGF0YSh0YWcpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBibG9jayA9IC88XFxzKihcXHcrKVxccyooW14+XSo/KT4oW148XSo/KTxcXHMqXFwvXFxzKltePl0qPz4vdSxcclxuICAgICAgICAgICAgaW5saW5lID0gLzxcXHMqKFxcdyspXFxzKihbXj5dKj8pPi91O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhZyk7XHJcblxyXG4gICAgICAgIGlmIChibG9jay50ZXN0KHRhZykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJibG9ja1wiKTtcclxuICAgICAgICAgICAgZGF0YSA9IHRhZy5tYXRjaChibG9jayk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGlubGluZS50ZXN0KHRhZykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmxpbmVcIik7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0YWcubWF0Y2goaW5saW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0ckRhdGEpIHtcclxuICAgICAgICB2YXIgYXR0cnMgPSB0aGlzLmV4dHJhY3RBdHRycyhhdHRyRGF0YSksXHJcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhhdHRycyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0QXR0cnMoYXR0ckRhdGEpIHtcclxuICAgICAgICBpZiAoIWF0dHJEYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJcXG5leHRyYWN0QXR0cnNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0ckRhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhdHRyUmUgPSAvW2EtekEtWjAtOS1fXSs9WydcIl0uKj9bJ1wiXS91ZyxcclxuICAgICAgICAgICAgYXR0cnMgPSBhdHRyRGF0YS5tYXRjaChhdHRyUmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhdHRyc1BhaXJzID0gYXR0ckRhdGEuc3BsaXQoJyAnKSxcclxuICAgICAgICAgICAgZGVzdCA9IHt9LFxyXG4gICAgICAgICAgICBrLCB2O1xyXG5cclxuICAgICAgICBhdHRyc1BhaXJzLmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHtcclxuICAgICAgICAgICAgW2ssIHZdID0gcGFpci5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgICAgZGVzdFtrXSA9IHYucmVwbGFjZSgvXid8JyQvdWcsIFwiXCIpLnJlcGxhY2UoL15cInxcIiQvdWcsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYXR0cnMuZm9yRWFjaChmdW5jdGlvbiAocGFpcikge1xyXG4gICAgICAgICAgICBbaywgdl0gPSBwYWlyLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0W2tdID0gdi5yZXBsYWNlKC9eJ3wnJC91ZywgXCJcIikucmVwbGFjZSgvXlwifFwiJC91ZywgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUNvbnRlbnQoZWxlbWVudCwgY29udGVudCkge1xyXG4gICAgICAgIGlmICghY29udGVudCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsVG9FbGVtZW50KGJ1aWxkTW9kZWwsIGJ1aWxkS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhblRvRWxlbWVudCh0aGlzLm1vZGVsVG9QbGFuKGJ1aWxkTW9kZWwsIGJ1aWxkS2V5KSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgYWRkRWxlbWVudChwYXJlbnQsIGNoaWxkKSB7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHV0U2VsZWN0aW9uKGVsbSwgb2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLnNldFN0YXJ0KGVsbSwgb2Zmc2V0KTtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLnNldFN0YXJ0KGVsbSwgb2Zmc2V0KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXhhbXBsZSBleHRlbmRzIEVsZW1lbnRhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUJ1aWxkTW9kZWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJUZXN0XCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFnXCI6IFwiPGRpdj5UZXN0PC9kaXY+XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUJ1aWxkTG9jYXRpb24oKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuY2xhc3MgTmF2aWdhdGlvbkJhciBleHRlbmRzIEVsZW1lbnRhbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBcIk5hdmlnYXRpb25CYXJcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJjbGljaywgLCBpbnNlcnRCb3hcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmluc2VydEJveCwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCB0b2dnbGVGaWd1cmVDb250cm9sbGVyXCI6IFtcclxuICAgICAgICAgICAgICAgIFsgdGhpcy50b2dnbGVGaWd1cmVDb250cm9sbGVyLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImNsaWNrLCAsIHRvZ2dsZVNhdmVcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLnRvZ2dsZVNhdmVCb3gsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiY2xpY2ssICwgc2F2ZVwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuc2F2ZSwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjaGFuZ2UsICwgbG9hZFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMubG9hZCwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VCdWlsZE1vZGVsKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiTmF2aWdhdGlvbkJhclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhZ1wiOiBcIjxkaXYgaWQ9J2RpYU5hdmlnYXRpb24nIGhhbmRsZXI9J05hdmlnYXRpb25CYXInPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnNlcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImZpZ3VyZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibG9hZFwiLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImluc2VydFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhZ1wiOiBcIjxzcGFuIGNsYXNzPSdkaWFDb21tYW5kIHRlc3Qtb25lIHRlc3QtdHdvJyBvcGVyYXRpb249J2luc2VydEJveCcgdHJpZ2dlcj0nY2xpY2snPmluc2VydDwvc3Bhbj5cIixcclxuICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJmaWd1cmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWdcIjogXCI8c3BhbiBjbGFzcz0nZGlhQ29tbWFuZCcgb3BlcmF0aW9uPSd0b2dnbGVGaWd1cmVDb250cm9sbGVyJz5maWd1cmU8L3NwYW4+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzYXZlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFnXCI6IFwiPHNwYW4gY2xhc3M9J2RpYUNvbW1hbmQnIG9wZXJhdGlvbj0ndG9nZ2xlU2F2ZScgdHJpZ2dlcj0nY2xpY2snPnNhdmU8L3NwYW4+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsb2FkXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFnXCI6IFwiPGxhYmVsIGNsYXNzPSdkaWFDb21tYW5kJz5sb2FkPC9sYWJlbD5cIixcclxuICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFwibG9hZElucHV0XCIsXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibG9hZElucHV0XCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFnXCI6IFwiPGlucHV0IG9wZXJhdGlvbj0nbG9hZCcgdHlwZT0nZmlsZSc+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNhdmVCb3g6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJzYXZlLWJveFwiIGhhbmRsZXI9XCJOYXZpZ2F0aW9uQmFyXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NhdmVfZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzYXZlX2ZpZWxkOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwic2F2ZS1maWVsZFwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICdzYXZlX25hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzYXZlX2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNhdmVfbmFtZToge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzYXZlLW5hbWVcIj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNhdmVfYnV0dG9uOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8bGVnZW5kIGNsYXNzPVwic2F2ZS1idXR0b25cIiBvcGVyYXRpb249XCJzYXZlXCI+c2F2ZTwvbGVnZW5kPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VCdWlsZExvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdpbml0JzogJyNkaWFIZWFkZXInLFxyXG4gICAgICAgICAgICAnc2F2ZSc6ICcjZGlhSW1hZ2UnLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluc2VydEJveCgpIHtcclxuICAgICAgICB2YXIgYm94ID0gdGhpcy5nZXRIYW5kbGVyKFwiQm94XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJveC5pbnNlcnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdG9nZ2xlRmlndXJlQ29udHJvbGxlcigpIHtcclxuICAgICAgICB2YXIgZmlndXJlID0gdGhpcy5nZXRIYW5kbGVyKFwiRmlndXJlXCIpO1xyXG5cclxuICAgICAgICBmaWd1cmUudG9nZ2xlQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbi5zYXZlKClcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNhdmUtbmFtZScpLnZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2V0QXBwKCkuc2F2ZShmaWxlTmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRvZ2dsZVNhdmVCb3goKSB7XHJcbiAgICAgICAgdmFyIGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXZlLWJveCcpO1xyXG5cclxuICAgICAgICBpZiAoYm94KSB7XHJcbiAgICAgICAgICAgIGJveC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJveCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGJveCA9IHRoaXMuYnVpbGQoJ3NhdmVCb3gnKSxcclxuICAgICAgICAgICAgICAgIGxvYyA9IHRoaXMuZ2V0QnVpbGRMb2NhdGlvbignc2F2ZScpO1xyXG5cclxuICAgICAgICAgICAgbG9jLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsb2FkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRBcHAoKS5sb2FkKGV2ZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmlndXJlIGV4dGVuZHMgRWxlbWVudGFsIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBcIkZpZ3VyZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBsYW4gPSBbXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICByZXR1cm4geyBkaWFfRmlndXJlOiB0aGlzLnBsYW4gfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9hZChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBsYW4gPSBkYXRhW1wiZGlhX0ZpZ3VyZVwiXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBtYWtlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFwiaW5zZXJ0ZWRcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmV4cGFuZENhbnZhcywgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJtb3VzZWRvd25cIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLnN0YXJ0RHJhZywgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCBpbmRleFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuY2xlYXJDb250cm9sbGVyLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmluZGV4LCBmYWxzZSBdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImNsaWNrLCAsIGNyZWF0ZVwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuY2xlYXJDb250cm9sbGVyLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmNyZWF0ZSwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCBzdG9yZVwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuc3RvcmUsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuY2xlYXJDb250cm9sbGVyLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmluZGV4LCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmZpZ3VyZSwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCBlZGl0XCI6IFtcclxuICAgICAgICAgICAgICAgIFsgdGhpcy5jbGVhckNvbnRyb2xsZXIsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuZWRpdCwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCB1cGRhdGVcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLnVwZGF0ZSwgZmFsc2UgXSxcclxuICAgICAgICAgICAgICAgIFsgdGhpcy5jbGVhckNvbnRyb2xsZXIsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuaW5kZXgsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuZmlndXJlLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImNsaWNrLCAsIGRlc3Ryb3lcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmRlc3Ryb3ksIGZhbHNlIF0sXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuY2xlYXJDb250cm9sbGVyLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmluZGV4LCBmYWxzZSBdLFxyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmZpZ3VyZSwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCBjYW5jZWxcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmNsZWFyQ29udHJvbGxlciwgZmFsc2UgXSxcclxuICAgICAgICAgICAgICAgIFsgdGhpcy5pbmRleCwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJjbGljaywgLCBjbG9zZVwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMudG9nZ2xlQ29udHJvbGxlciwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VCdWlsZE1vZGVsKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEZpZ3VyZToge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGNhbnZhcyBpZD1cIkRpYUZpZ3VyZVwiPjwvY2FudmFzPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpZ3VyZV9jb250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWNvbnRyb2xsZXJcIiBoYW5kbGVyPVwiRmlndXJlXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfY29udHJvbGxlcl9jcmVhdGU6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxzcGFuIGNsYXNzPVwiZmlndXJlLWNvbnRyb2wtY3JlYXRlXCIgb3BlcmF0aW9uPVwiY3JlYXRlXCI+Y3JlYXRlPC9zcGFuPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2NvbnRyb2xsZXJfc3RvcmU6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxzcGFuIGNsYXNzPVwiZmlndXJlLWNvbnRyb2wtc3RvcmVcIiBvcGVyYXRpb249XCJzdG9yZVwiPnN0b3JlPC9zcGFuPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2NvbnRyb2xsZXJfdXBkYXRlOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c3BhbiBjbGFzcz1cImZpZ3VyZS1jb250cm9sLXVwZGF0ZVwiIG9wZXJhdGlvbj1cInVwZGF0ZVwiPnVwZGF0ZTwvc3Bhbj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9jb250cm9sbGVyX2NhbmNlbDoge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPHNwYW4gY2xhc3M9XCJmaWd1cmUtY29udHJvbC1jYW5jZWxcIiBvcGVyYXRpb249XCJjYW5jZWxcIj5jYW5jZWw8L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfY29udHJvbGxlcl9jbG9zZToge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPHNwYW4gY2xhc3M9XCJmaWd1cmUtY29udHJvbC1jbG9zZVwiIG9wZXJhdGlvbj1cImNsb3NlXCI+Y2xvc2U8L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlndXJlX2luZGV4OiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWluZGV4XCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9pbmRleF9oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfaW5kZXhfYm9keScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9pbmRleF9mb290ZXInLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfaW5kZXhfaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWluZGV4LWhlYWRlclwiPkluZGV4IG9mIGZpZ3VyZXM8L2Rpdj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9pbmRleF9ib2R5OiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWluZGV4LWJvZHlcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9pbmRleF9mb290ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtaW5kZXgtZm9vdGVyXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9jb250cm9sbGVyX2NyZWF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9jb250cm9sbGVyX2Nsb3NlJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlndXJlX2NyZWF0ZSA6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtY3JlYXRlXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9jcmVhdGVfaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2NyZWF0ZV9ib2R5JyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2NyZWF0ZV9mb290ZXInXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9jcmVhdGVfaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWNyZWF0ZS1oZWFkZXJcIj5DcmVhdGUgYW4gaXRlbTwvZGl2PidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2NyZWF0ZV9ib2R5OiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWNyZWF0ZS1ib2R5XCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfY3JlYXRlX2Zvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGRpdiBjbGFzcz1cImZpZ3VyZS1jcmVhdGUtZm9vdGVyXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9jb250cm9sbGVyX3N0b3JlJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2NvbnRyb2xsZXJfY2FuY2VsJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlndXJlX2VkaXQ6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtZWRpdFwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdF9oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdF9ib2R5JyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2VkaXRfZm9vdGVyJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdF9oZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtZWRpdC1oZWFkZXJcIj5FZGl0IGFuIGl0ZW08L2Rpdj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9lZGl0X2JvZHk6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtZWRpdC1ib2R5XCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdF9mb290ZXI6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtZWRpdC1mb290ZXJcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2NvbnRyb2xsZXJfdXBkYXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2NvbnRyb2xsZXJfY2FuY2VsJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlndXJlX2xpc3Q6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzx1bCBjbGFzcz1cImZpZ3VyZS1saXN0XCI+PC9vbD4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaWd1cmVfaXRlbToge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGxpIGNsYXNzPVwiZmlndXJlLWl0ZW1cIj48L2xpPicsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfaXRlbV9mcm9tJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2l0ZW1fdG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfaXRlbV9jb2xvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9pdGVtX2VkaXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfaXRlbV9kZXN0cm95J1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfaXRlbV9mcm9tOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c3BhbiBjbGFzcz1cImZpZ3VyZS1pdGVtLWZyb21cIj48L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfaXRlbV90bzoge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPHNwYW4gY2xhc3M9XCJmaWd1cmUtaXRlbS10b1wiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9pdGVtX2NvbG9yOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c3BhbiBjbGFzcz1cImZpZ3VyZS1pdGVtLWNvbG9yXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2l0ZW1fc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxzcGFuIGNsYXNzPVwiZmlndXJlLWl0ZW0tc2hhcGVcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfaXRlbV9lZGl0OiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c3BhbiBjbGFzcz1cImZpZ3VyZS1pdGVtLWVkaXRcIiBvcGVyYXRpb249XCJlZGl0XCI+ZWRpdDwvc3Bhbj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9pdGVtX2Rlc3Ryb3k6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxzcGFuIGNsYXNzPVwiZmlndXJlLWl0ZW0tZGVzdHJveVwiIG9wZXJhdGlvbj1cImRlc3Ryb3lcIj5kZXN0cm95PC9zcGFuPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpZ3VyZV9lZGl0b3JfY3JlYXRlOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8ZGl2IGNsYXNzPVwiZmlndXJlLWVkaXRvclwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdG9yX2NyZWF0ZV9wYXJhbWV0ZXJzJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlndXJlX2VkaXRvcl9jcmVhdGVfc2VsZWN0b3JzJyxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2VkaXRvcl9jcmVhdGVfcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGRpdiBjbGFzcz1cImZpZ3VyZS1lZGl0b3ItcGFyYW1ldGVyc1wiPicsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgJ2ZpZ3VyZV9lZGl0b3JfZnJvbScsXHJcbiAgICAgICAgICAgICAgICAnZmlndXJlX2VkaXRvcl90bycsXHJcbiAgICAgICAgICAgICAgICAnZmlndXJlX2VkaXRvcl9jb2xvcicsXHJcbiAgICAgICAgICAgICAgICAnZmlndXJlX2VkaXRvcl9zaGFwZScsXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9lZGl0b3JfY3JlYXRlX3NlbGVjdG9yczoge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnPGRpdiBjbGFzcz1cImZpZ3VyZS1lZGl0b3Itc2VsZWN0b3JzXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9lZGl0b3Jfc2VsZWN0b3JfZnJvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9lZGl0b3Jfc2VsZWN0b3JfdG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdG9yX3NlbGVjdG9yX25vbmUnLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX2VkaXQ6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxkaXYgY2xhc3M9XCJmaWd1cmUtZWRpdG9yXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9lZGl0b3JfZnJvbV9pbW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdG9yX3RvX2ltbScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpZ3VyZV9lZGl0b3JfY29sb3InLFxyXG4gICAgICAgICAgICAgICAgICAgICdmaWd1cmVfZWRpdG9yX3NoYXBlJyxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2VkaXRvcl9mcm9tOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c2VsZWN0IGNsYXNzPVwiZmlndXJlLWVkaXRvci1mcm9tXCI+PC9zZWxlY3Q+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX2Zyb21faW1tOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c3BhbiBjbGFzcz1cImZpZ3VyZS1lZGl0b3ItZnJvbS1pbW1cIj48L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX3RvOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c2VsZWN0IGNsYXNzPVwiZmlndXJlLWVkaXRvci10b1wiPjwvc2VsZWN0PidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2VkaXRvcl90b19pbW06IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxzcGFuIGNsYXNzPVwiZmlndXJlLWVkaXRvci10by1pbW1cIj48L3NwYW4+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX2NvbG9yOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8aW5wdXQgdHlwZT1cImNvbG9yXCIgY2xhc3M9XCJmaWd1cmUtZWRpdG9yLWNvbG9yXCI+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX3NoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8c2VsZWN0IGNsYXNzPVwiZmlndXJlLWVkaXRvci1zaGFwZVwiPjwvc2VsZWN0PidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2VkaXRvcl9vcHRpb246IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxvcHRpb24gY2xhc3M9XCJmaWd1cmUtZWRpdG9yLW9wdGlvblwiPjwvb3B0aW9uPidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlndXJlX2VkaXRvcl9zZWxlY3Rvcl9mcm9tOiB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICc8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJmaWd1cmUtZWRpdG9yLXNlbGVjdG9yLWZyb21cIiB2YWx1ZT1cImZyb21cIj4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpZ3VyZV9lZGl0b3Jfc2VsZWN0b3JfdG86IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic2VsZWN0b3JcIiBjbGFzcz1cImZpZ3VyZS1lZGl0b3Itc2VsZWN0b3ItdG9cIiB2YWx1ZT1cInRvXCI+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWd1cmVfZWRpdG9yX3NlbGVjdG9yX25vbmU6IHtcclxuICAgICAgICAgICAgICAgIHRhZzogJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic2VsZWN0b3JcIiBjbGFzcz1cImZpZ3VyZS1lZGl0b3Itc2VsZWN0b3Itbm9uZVwiIHZhbHVlPVwibm9uZVwiIGNoZWNrZWQ+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZUJ1aWxkTG9jYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2luaXQnOiBcIiNkaWFJbWFnZVwiLFxyXG4gICAgICAgICAgICAnY29udHJvbGxlcic6IFwiI2RpYUltYWdlXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGV4cGFuZENhbnZhcygpIHtcclxuICAgICAgICB2YXIgZWRpdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0RpYUZpZ3VyZScpLFxyXG4gICAgICAgICAgICBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFJbWFnZScpLFxyXG4gICAgICAgICAgICByZWN0ID0gaW1hZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWRpdG9yLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCByZWN0LndpZHRoKTtcclxuICAgICAgICBlZGl0b3Iuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCByZWN0LmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRvZ2dsZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWNvbnRyb2xsZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udHJvbGxlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLmluc2VydENvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleChjb250cm9sbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluc2VydENvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLmJ1aWxkKCdmaWd1cmVfY29udHJvbGxlcicpLFxyXG4gICAgICAgICAgICBsb2MgPSB0aGlzLmdldEJ1aWxkTG9jYXRpb24oJ2NvbnRyb2xsZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsb2MuYXBwZW5kQ2hpbGQoY29udHJvbGxlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyQ29udHJvbGxlcihjb250cm9sbGVyKSB7XHJcbiAgICAgICAgd2hpbGUgKGNvbnRyb2xsZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZUNoaWxkKGNvbnRyb2xsZXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbmRleChjb250cm9sbGVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5idWlsZCgnZmlndXJlX2luZGV4JyksXHJcbiAgICAgICAgICAgIGNyZWF0ZSA9IHRoaXMuYnVpbGQoJ2ZpZ3VyZV9jb250cm9sbGVyX2NyZWF0ZScpLFxyXG4gICAgICAgICAgICBjYW5jZWwgPSB0aGlzLmJ1aWxkKCdmaWd1cmVfY29udHJvbGxlcl9jYW5jZWwnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb250cm9sbGVyLmFwcGVuZENoaWxkKGluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1ha2VMaXN0KGluZGV4LnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtaW5kZXgtYm9keScpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZUxpc3QoYm9keSkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5idWlsZCgnZmlndXJlX2xpc3QnKSxcclxuICAgICAgICAgICAgcGxhbiA9IHRoaXMucGxhbjtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYWtlSXRlbShwbGFuW2ldLCBpLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChsaXN0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZUl0ZW0ocGxhbiwgaW5kZXgsIGxpc3QpIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuYnVpbGQoJ2ZpZ3VyZV9pdGVtJyk7XHJcbiAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWl0ZW0tZnJvbScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBsYW5bMF0pKTtcclxuICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtaXRlbS10bycpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBsYW5bMV0pKTtcclxuICAgICAgICBcclxuICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtaXRlbS1jb2xvcicpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYmFja2dyb3VuZDogJyArIHBsYW5bMl0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1pdGVtLWVkaXQnKS5zZXRBdHRyaWJ1dGUoJ3BsYW5JbmRleCcsIGluZGV4KTtcclxuICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtaXRlbS1kZXN0cm95Jykuc2V0QXR0cmlidXRlKCdwbGFuSWRleCcsIGluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGUoY29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBjcmVhdGUgPSB0aGlzLmJ1aWxkKCdmaWd1cmVfY3JlYXRlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udHJvbGxlci5hcHBlbmRDaGlsZChjcmVhdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFrZUVkaXRvcihjcmVhdGUucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1jcmVhdGUtYm9keScpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZUVkaXRvcihib2R5KSB7XHJcbiAgICAgICAgdmFyIGVkaXRvciA9IHRoaXMuYnVpbGQoJ2ZpZ3VyZV9lZGl0b3JfY3JlYXRlJyksXHJcbiAgICAgICAgICAgIHNlbGVjdHMgPSBlZGl0b3IucXVlcnlTZWxlY3RvckFsbCgnLmZpZ3VyZS1lZGl0b3Igc2VsZWN0JyksXHJcbiAgICAgICAgICAgIHNlbGVjdG9yRnJvbSA9IGVkaXRvci5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXRvci1zZWxlY3Rvci1mcm9tJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYWtlT3B0aW9uKHNlbGVjdHNbMF0pO1xyXG4gICAgICAgIHRoaXMubWFrZU9wdGlvbihzZWxlY3RzWzFdKTtcclxuICAgICAgICB0aGlzLm1ha2VTaGFwZU9wdGlvbnMoc2VsZWN0c1syXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2VsZWN0b3JGcm9tLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZU9wdGlvbihzZWxlY3QpIHtcclxuICAgICAgICB2YXIgYm94ID0gdGhpcy5nZXRIYW5kbGVyKCdCb3gnKSxcclxuICAgICAgICAgICAgaWRzID0gYm94LmlkcztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uID0gdGhpcy5idWlsZCgnZmlndXJlX2VkaXRvcl9vcHRpb24nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpZHNbaV0pKTtcclxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpZHNbaV0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtYWtlU2hhcGVPcHRpb25zKHNlbGVjdCkge1xyXG4gICAgICAgIHZhciBzaGFwZXMgPSBbXHJcbiAgICAgICAgICAgICctLS0nLFxyXG4gICAgICAgICAgICAnLS0+JyxcclxuICAgICAgICAgICAgJzwtPicsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoYXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uID0gdGhpcy5idWlsZCgnZmlndXJlX2VkaXRvcl9vcHRpb24nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzaGFwZXNbaV0pKTtcclxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RvcmUoY29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBmcm9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItZnJvbScpLFxyXG4gICAgICAgICAgICBmVmFsdWUgPSBmcm9tLm9wdGlvbnNbZnJvbS5zZWxlY3RlZEluZGV4XS52YWx1ZSxcclxuICAgICAgICAgICAgdG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXRvci10bycpLFxyXG4gICAgICAgICAgICB0VmFsdWUgPSB0by5vcHRpb25zW3RvLnNlbGVjdGVkSW5kZXhdLnZhbHVlLFxyXG4gICAgICAgICAgICBjVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXRvci1jb2xvcicpLnZhbHVlLFxyXG4gICAgICAgICAgICBzaGFwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLXNoYXBlJyksXHJcbiAgICAgICAgICAgIHNWYWx1ZSA9IHNoYXBlLm9wdGlvbnNbc2hhcGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGZWYWx1ZSAhPT0gdFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbi5wdXNoKFtmVmFsdWUsIHRWYWx1ZSwgY1ZhbHVlLCBzVmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGVkaXQoZXZlbnQsIGNvbnRyb2xsZXIpIHtcclxuICAgICAgICB2YXIgZWRpdCA9IHRoaXMuYnVpbGQoJ2ZpZ3VyZV9lZGl0JyksXHJcbiAgICAgICAgICAgIHBsYW4gPSB0aGlzLnBsYW4sXHJcbiAgICAgICAgICAgIHBJbmRleCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3BsYW5JbmRleCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVkaXQuc2V0QXR0cmlidXRlKCdwbGFuSW5kZXgnLCBwSW5kZXgpO1xyXG5cclxuICAgICAgICB0aGlzLm1ha2VFZGl0b3JJbW0ocGxhbiwgcEluZGV4LCBlZGl0LnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdC1ib2R5JykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRyb2xsZXIuYXBwZW5kQ2hpbGQoZWRpdCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VFZGl0b3JJbW0ocGxhbiwgaW5kZXgsIGJvZHkpIHtcclxuICAgICAgICB2YXIgZWRpdG9yID0gdGhpcy5idWlsZCgnZmlndXJlX2VkaXRvcl9lZGl0JyksXHJcbiAgICAgICAgICAgIGZyb20gPSBlZGl0b3IucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItZnJvbS1pbW0nKSxcclxuICAgICAgICAgICAgdG8gPSBlZGl0b3IucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItdG8taW1tJyksXHJcbiAgICAgICAgICAgIGNvbG9yID0gZWRpdG9yLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLWNvbG9yJyksXHJcbiAgICAgICAgICAgIHNlbGVjdCA9IGVkaXRvci5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXRvciBzZWxlY3QnKTtcclxuICAgICAgICBcclxuICAgICAgICBmcm9tLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBwbGFuW2luZGV4XVswXSk7XHJcbiAgICAgICAgZnJvbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwbGFuW2luZGV4XVswXSkpO1xyXG4gICAgICAgIHRvLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBwbGFuW2luZGV4XVsxXSk7XHJcbiAgICAgICAgdG8uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGxhbltpbmRleF1bMV0pKTtcclxuICAgICAgICBjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcGxhbltpbmRleF1bMl0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFrZVNoYXBlT3B0aW9ucyhzZWxlY3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGNvbnRyb2xsZXIpIHtcclxuICAgICAgICB2YXIgcEluZGV4ID0gY29udHJvbGxlci5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXQnKS5nZXRBdHRyaWJ1dGUoJ3BsYW5JbmRleCcpLFxyXG4gICAgICAgICAgICBmcm9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItZnJvbS1pbW0nKSxcclxuICAgICAgICAgICAgZlZhbHVlID0gZnJvbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyksXHJcbiAgICAgICAgICAgIHRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItdG8taW1tJyksXHJcbiAgICAgICAgICAgIHRWYWx1ZSA9IHRvLmdldEF0dHJpYnV0ZSgndmFsdWUnKSxcclxuICAgICAgICAgICAgY1ZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3ItY29sb3InKS52YWx1ZSxcclxuICAgICAgICAgICAgc2hhcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlndXJlLWVkaXRvci1zaGFwZScpLFxyXG4gICAgICAgICAgICBzVmFsdWUgPSBzaGFwZS5vcHRpb25zW3NoYXBlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGxhbltwSW5kZXhdID0gW2ZWYWx1ZSwgdFZhbHVlLCBjVmFsdWUsIHNWYWx1ZV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlc3Ryb3koZXZlbnQpIHtcclxuICAgICAgICB2YXIgcGxhbiA9IHRoaXMucGxhbixcclxuICAgICAgICAgICAgcEluZGV4ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgncGxhbkluZGV4Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxhbi5zcGxpY2UocEluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RnJvbU9yVG8oY29udHJvbGxlciwgaWQpIHtcclxuICAgICAgICB2YXIgY2hlY2tlZCA9IHRoaXMuZ2V0Q2hlY2tlZFNlbGVjdG9yKGNvbnRyb2xsZXIpLFxyXG4gICAgICAgICAgICBvcHRpb25zO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjaGVja2VkID09IFwiZnJvbVwiKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBjb250cm9sbGVyLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLWZyb20nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIucXVlcnlTZWxlY3RvcignLmZpZ3VyZS1lZGl0b3Itc2VsZWN0b3ItdG8nKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrZWQgPT0gXCJ0b1wiKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBjb250cm9sbGVyLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLXRvJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250cm9sbGVyLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLXNlbGVjdG9yLW5vbmUnKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnZhbHVlID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnNlbGVjdGVkSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRDaGVja2VkU2VsZWN0b3IoY29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBzZWxlY3RvcnMgPSBjb250cm9sbGVyLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtZWRpdG9yLXNlbGVjdG9ycycpLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yc1tpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGZpZ3VyZSgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlZnJlc2hDYW52YXMoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEaWFGaWd1cmVcIik7XHJcbiAgICAgICAgaWYgKGNhbnZhcy5nZXRDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGFuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHRoaXMucGxhbltpXSxcclxuICAgICAgICAgICAgICAgICAgICBmRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWFDdXJzb3JbZGlhLWlkPVwiJyArIHBhaXJbMF0gKyAnXCJdJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlhQ3Vyc29yW2RpYS1pZD1cIicgKyBwYWlyWzFdICsgJ1wiXScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb20gPSB0aGlzLmdldEZyb21Db3JkKGNhbnZhcywgZkVsZW0sIHRFbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICB0byA9IHRoaXMuZ2V0VG9Db3JkKGNhbnZhcywgZkVsZW0sIHRFbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHBhaXJbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSBwYWlyWzNdO1xyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnJvbSAmIHRvXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnJvbSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0byk7XHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGZyb20ubGVmdCwgZnJvbS50b3ApO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0by5sZWZ0LCB0by50b3ApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxBcnJvdyhjdHgsIGNvbG9yLCBmcm9tLmxlZnQsIGZyb20udG9wLCB0by5sZWZ0LCB0by50b3AsIDEwLCA0NSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGUgPj0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbEFycm93KGN0eCwgY29sb3IsIHRvLmxlZnQsIHRvLnRvcCwgZnJvbS5sZWZ0LCBmcm9tLnRvcCwgMTAsIDQ1KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0Q29yZChwLCBlKSB7XHJcbiAgICAgICAgdmFyIHBSZWN0ID0gcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgZVJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7IGxlZnQ6IGVSZWN0LmxlZnQgLSBwUmVjdC5sZWZ0LCB0b3A6IGVSZWN0LnRvcCAtIHBSZWN0LnRvcCB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRGcm9tQ29yZChwLCBmLCB0KSB7XHJcbiAgICAgICAgdmFyIHBSZWN0ID0gcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgZlJlY3QgPSBmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICB0UmVjdCA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIHcgPSAoZlJlY3QubGVmdCArIGZSZWN0LndpZHRoLzIpIC0gKHRSZWN0LmxlZnQgKyB0UmVjdC53aWR0aC8yKSAtIHBSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIGggPSAoZlJlY3QudG9wICsgZlJlY3QuaGVpZ2h0LzIpIC0gKHRSZWN0LnRvcCArIHRSZWN0LmhlaWdodC8yKSAtIHBSZWN0LnRvcDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoTWF0aC5hYnModykgPCBNYXRoLmFicyhoKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmUmVjdC5sZWZ0ICsgZlJlY3Qud2lkdGgvMiAtIHBSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBmUmVjdC50b3AgKyBmUmVjdC5oZWlnaHQgLSBwUmVjdC50b3BcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogZlJlY3QubGVmdCArIGZSZWN0LndpZHRoLzIgLSBwUmVjdC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogZlJlY3QudG9wIC0gcFJlY3QudG9wXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZSZWN0LmxlZnQgKyBmUmVjdC53aWR0aCAtIHBSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBmUmVjdC50b3AgKyBmUmVjdC5oZWlnaHQvMiAtIHBSZWN0LnRvcFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmUmVjdC5sZWZ0IC0gcFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IGZSZWN0LnRvcCArIGZSZWN0LmhlaWdodC8yIC0gcFJlY3QudG9wXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFRvQ29yZChwLCBmLCB0KSB7XHJcbiAgICAgICAgdmFyIHBSZWN0ID0gcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgZlJlY3QgPSBmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICB0UmVjdCA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIHcgPSAoZlJlY3QubGVmdCArIGZSZWN0LndpZHRoLzIpIC0gKHRSZWN0LmxlZnQgKyB0UmVjdC53aWR0aC8yKSAtIHBSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIGggPSAoZlJlY3QudG9wICsgZlJlY3QuaGVpZ2h0LzIpIC0gKHRSZWN0LnRvcCArIHRSZWN0LmhlaWdodC8yKSAtIHBSZWN0LnRvcDtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHcpIDwgTWF0aC5hYnMoaCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdFJlY3QubGVmdCArIHRSZWN0LndpZHRoLzIgLSBwUmVjdC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdFJlY3QudG9wIC0gcFJlY3QudG9wXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRSZWN0LmxlZnQgKyB0UmVjdC53aWR0aC8yIC0gcFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRSZWN0LnRvcCArIHRSZWN0LmhlaWdodCAtIHBSZWN0LnRvcFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKHcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0UmVjdC5sZWZ0IC0gcFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRSZWN0LnRvcCArIHRSZWN0LmhlaWdodC8yIC0gcFJlY3QudG9wXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdFJlY3QubGVmdCArIHRSZWN0LndpZHRoIC0gcFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRSZWN0LnRvcCArIHRSZWN0LmhlaWdodC8yIC0gcFJlY3QudG9wXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbGxBcnJvdyhjdHgsIGNvbG9yLCB4cywgeXMsIHhlLCB5ZSwgbGVuZywgcmFkKSB7XHJcbiAgICAgICAgaWYgKHJhZCA+PSA5MCB8fCByYWQgPD0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBkaXN0ID0gdGhpcy5nZXRDb29yZE9uTGluZSh4ZSwgeWUsIHhzLCB5cywgbGVuZyksXHJcbiAgICAgICAgICAgIGNvb3JkQ1cgPSB0aGlzLmdldENvb3JkUmFkKHhlLCB5ZSwgZGlzdC54LCBkaXN0LnksIHJhZCksXHJcbiAgICAgICAgICAgIGNvb3JkQ0NXID0gdGhpcy5nZXRDb29yZFJhZCh4ZSwgeWUsIGRpc3QueCwgZGlzdC55LCAtcmFkKTtcclxuICAgICAgICBcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN0eC5tb3ZlVG8oeGUsIHllKTtcclxuICAgICAgICBjdHgubGluZVRvKGNvb3JkQ1cueCwgY29vcmRDVy55KTtcclxuICAgICAgICBjdHgubGluZVRvKGNvb3JkQ0NXLngsIGNvb3JkQ0NXLnkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENvb3JkT25MaW5lKHhzLCB5cywgeGUsIHllLCBkaXN0KSB7XHJcbiAgICAgICAgdmFyIGxlbmcgPSB0aGlzLmdldExlbmcoeHMsIHlzLCB4ZSwgeWUpLFxyXG4gICAgICAgICAgICBzaW5UID0gdGhpcy5nZXRTaW4oeXMsIHllLCBsZW5nKSxcclxuICAgICAgICAgICAgY29zVCA9IHRoaXMuZ2V0Q29zKHhzLCB4ZSwgbGVuZyksXHJcbiAgICAgICAgICAgIHgsIHk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWd1cmUuZ2V0Q29vcmRPbkxpbmUoKVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxlbmc6XFx0XCIgKyBsZW5nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNpbjpcXHRcIiArIHNpblQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29zOlxcdFwiICsgY29zVCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgeCA9IHhzID4geGUgPyB4cyAtIGRpc3QgKiBjb3NUIDogeHMgKyBkaXN0ICogY29zVDtcclxuICAgICAgICB5ID0geXMgPiB5ZSA/IHlzIC0gZGlzdCAqIHNpblQgOiB5cyArIGRpc3QgKiBzaW5UO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7eCwgeX07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENvb3JkUmFkKHhzLCB5cywgeGUsIHllLCByKSB7XHJcbiAgICAgICAgdmFyIHJhZGlpID0gciAqIE1hdGguUEkgLyAzNjAsXHJcbiAgICAgICAgICAgIHggPSBNYXRoLmNvcyhyYWRpaSkgKiAoeGUgLSB4cykgLSBNYXRoLnNpbihyYWRpaSkgKiAoeWUgLSB5cykgKyB4cyxcclxuICAgICAgICAgICAgeSA9IE1hdGguc2luKHJhZGlpKSAqICh4ZSAtIHhzKSArIE1hdGguY29zKHJhZGlpKSAqICh5ZSAtIHlzKSArIHlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7eCwgeX1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0TGVuZyh4cywgeXMsIHhlLCB5ZSkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMoeHMgLSB4ZSksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMoeXMgLSB5ZSksIDIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0U2luKHlzLCB5ZSwgbGVuZykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyh5cyAtIHllKSAvIGxlbmc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENvcyh4cywgeGUsIGxlbmcpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoeHMgLSB4ZSkgLyBsZW5nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWZyZXNoQ2FudmFzKCkge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRGlhRmlndXJlJyksXHJcbiAgICAgICAgICAgIHdpZHRoID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNhbnZhcy5nZXRDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgc3RhcnREcmFnKGVkaXRvciwgZXZlbnQsIGhhbmRsZXIpIHtcclxuXHJcbiAgICAgICAgdmFyIGRyYWdPZmZzZXQgPSB7XHJcbiAgICAgICAgICAgIHg6IGV2ZW50Lm9mZnNldFgsXHJcbiAgICAgICAgICAgIHk6IGV2ZW50Lm9mZnNldFlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRvRHJhZyk7XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZW5kRHJhZyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRvRHJhZyhldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcFJlY3QgPSBlZGl0b3IucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgICAgIGRyYWdYID0gZXZlbnQuY2xpZW50WCAtIHBSZWN0LmxlZnQgLSBkcmFnT2Zmc2V0LngsXHJcbiAgICAgICAgICAgICAgICBkcmFnWSA9IGV2ZW50LmNsaWVudFkgLSBwUmVjdC50b3AgLSBkcmFnT2Zmc2V0Lnk7XHJcblxyXG4gICAgICAgICAgICBlZGl0b3Iuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0b3A6IFwiICsgTWF0aC5mbG9vcihkcmFnWSkgKyBcInB4OyBsZWZ0OiBcIiArIE1hdGguZmxvb3IoZHJhZ1gpICsgXCJweDtcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBlbmREcmFnKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZG9EcmFnKTtcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZW5kRHJhZyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlnID0gaGFuZGxlci5nZXRIYW5kbGVyKFwiRmlndXJlXCIpO1xyXG5cclxuICAgICAgICAgICAgZmlnLmZpZ3VyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQm94IGV4dGVuZHMgRWxlbWVudGFsIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBcIkJveFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxpbmtlcnMgPSBbbnVsbF07XHJcbiAgICAgICAgdGhpcy5pZHMgPSBbXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmdhdGhlckVsZW1lbnRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZVNhdmVEYXRhKGVsZW1lbnRzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2F0aGVyRWxlbWVudHMoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2hhbmRsZXI9J0JveCddXCIpKSxcclxuICAgICAgICAgICAgciA9IFtdLFxyXG4gICAgICAgICAgICBhID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgciA9IGVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihhY2MsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmtlciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibGlua2VyXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY2NbbGlua2VyXSAhPSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NbbGlua2VyXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhY2NbbGlua2VyXS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VTYXZlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgdmFyIGRlc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVzdCA9IGRhdGEucmVkdWNlKGZ1bmN0aW9uKGFjYywgZWxlbWVudHMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJCb3hfXCIgKyBpbmRleDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFjY1tuYW1lXSA9IGVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihhY2NJbiwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlhQm94XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjSW5bXCJjb250ZW50XCJdID0gZWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjSW5bXCJpZFwiXSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaWEtaWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkaWFDdXJzb3JcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NJbltcInBvc2l0aW9uXCJdID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY0luO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geyBkaWFCb3g6IGRlc3QgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9hZChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhW1wiZGlhQm94XCJdKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xyXG4gICAgICAgICAgICB0aGlzLmluc2VydChkYXRhW1wiZGlhQm94XCJdW2tleV1bXCJjb250ZW50XCJdLCBkYXRhW1wiZGlhQm94XCJdW2tleV1bXCJwb3NpdGlvblwiXSwgZGF0YVtcImRpYUJveFwiXVtrZXldW1wiaWRcIl0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgbWFrZUxpc3RlbmVycygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImtleWRvd25cIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLmluc2VydEhlYWRpbmcsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwia2V5ZG93bi5FbnRlclwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuaW5zZXJ0UGFyYWdyYXBoLCB0cnVlIF0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwiaW5wdXQsIGhlYWRpbmdcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLnN5bmNIZWFkaW5nQ29udGVudCwgZmFsc2UgXSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJtb3VzZWRvd24sIGN1cnNvclwiOiBbXHJcbiAgICAgICAgICAgICAgICBbIHRoaXMuc3RhcnREcmFnLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImNsaWNrLCBjdXJzb3JcIjogW1xyXG4gICAgICAgICAgICAgICAgWyB0aGlzLnNldEZyb21PclRvLCBmYWxzZSBdLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcImNsaWNrLCBoZWFkaW5nXCI6IFtcclxuICAgICAgICAgICAgICAgIFsgdGhpcy5zeW5jSGVhZGluZ0NvbnRlbnQsIGZhbHNlIF0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtYWtlQnVpbGRNb2RlbCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcIkJveFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhZ1wiOiBcIjxkaXYgY2xhc3M9J2RpYUJveCcgY29udGVudGVkaXRhYmxlPSd0cnVlJyBoYW5kbGVyPSdCb3gnPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImN1cnNvclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhZ1wiOiBcIjxkaXYgY2xhc3M9J2RpYUN1cnNvcicgaGFuZGxlcj0nQm94JyBzZWdtZW50PSdjdXJzb3InPjwvZGl2PlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRpbmdcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWdcIjogXCI8aDEgc2VnbWVudD0naGVhZGluZyc+PC9kaXY+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFyYWdyYXBoXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFnXCI6IFwiPHAgc2VnbWVudD0ncGFyYWdyYXBoJz48L3A+XCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtYWtlQnVpbGRMb2NhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBcImluc2VydFwiOiBcIiNkaWFUZXh0XCIsXHJcbiAgICAgICAgICAgIFwiaW5zZXJ0Q3Vyc29yXCI6IFwiI2RpYUltYWdlXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBpbnNlcnQoYm94Q29udGVudCA9IG51bGwsIHBvc2l0aW9uID0gbnVsbCwgaWQgPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuYnVpbGQoKSxcclxuICAgICAgICAgICAgaWQgPSBpZCB8fCB0aGlzLm1ha2VJZCgpLFxyXG4gICAgICAgICAgICBjdXJzb3IgPSB0aGlzLmJ1aWxkKFwiY3Vyc29yXCIpLFxyXG4gICAgICAgICAgICBsb2MgPSB0aGlzLmdldEJ1aWxkTG9jYXRpb24oJ2luc2VydCcpLFxyXG4gICAgICAgICAgICBjdXJzb3JMb2MgPSB0aGlzLmdldEJ1aWxkTG9jYXRpb24oJ2luc2VydEN1cnNvcicpLFxyXG4gICAgICAgICAgICBoZWFkaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGluayhib3gsIGN1cnNvcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGJveC5oYXNBdHRyaWJ1dGUoXCJkaWEtaWRcIikpIHtcclxuICAgICAgICAgICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcImRpYS1pZFwiLCBpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWRzLnB1c2goYm94LmdldEF0dHJpYnV0ZShcImRpYS1pZFwiKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImRpYS1pZFwiLCBpZCk7XHJcbiAgICAgICAgICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJkaWEtaWRcIiwgaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmlkcy5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGJveENvbnRlbnQpIHtcclxuICAgICAgICAgICAgYm94LmlubmVySFRNTCA9IGJveENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGhlYWRpbmcgPSBib3gucXVlcnlTZWxlY3RvcihcImgxXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbG9jLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICAgICAgY3Vyc29yTG9jLmFwcGVuZENoaWxkKGN1cnNvcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGhlYWRpbmcpIHtcclxuICAgICAgICAgICAgaGVhZGluZy5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbWFrZUlkKCkge1xyXG4gICAgICAgIHZhciB0ID0gdHJpYWwoKSxcclxuICAgICAgICAgICAgcHVibGlzaGVkID0gdGhpcy5pZHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUgKGV4aXN0KHQpKSB7XHJcbiAgICAgICAgICAgIHQgPSB0cmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiB0cmlhbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMTAwMDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZXhpc3QodCkge1xyXG4gICAgICAgICAgICBwdWJsaXNoZWQuc29tZShmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZCA9PSB0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxpbmsoYm94LCBjdXJzb3IpIHtcclxuICAgICAgICB2YXIgbGlua2VyID0gdGhpcy5saW5rZXJzLmxlbmd0aDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxpbmtlcnMucHVzaChsaW5rZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJsaW5rZXJcIiwgbGlua2VyKTtcclxuICAgICAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibGlua2VyXCIsIGxpbmtlcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgaW5zZXJ0SGVhZGluZyhlZGl0b3IsIGV2ZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGhlYWRpbmcgPSB0aGlzLmJ1aWxkKFwiaGVhZGluZ1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZEVsZW1lbnQoZWRpdG9yLCBoZWFkaW5nKTtcclxuICAgICAgICBcclxuICAgICAgICBoZWFkaW5nLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGV2ZW50LmtleSkpO1xyXG5cclxuICAgICAgICB0aGlzLnB1dFNlbGVjdGlvbihoZWFkaW5nLCBoZWFkaW5nLmlubmVySFRNTC5sZW5ndGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluc2VydFBhcmFncmFwaChlZGl0b3IsIGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHBhcmFncmFwaCA9IHRoaXMuYnVpbGQoXCJwYXJhZ3JhcGhcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRFbGVtZW50KGVkaXRvciwgcGFyYWdyYXBoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnB1dFNlbGVjdGlvbihwYXJhZ3JhcGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VIZWFkaW5nRWxlbWVudChuID0gMSkge1xyXG4gICAgICAgIHZhciBoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChbMSwgMiwgMywgNCwgNSwgNl0uaW5kZXhPZihuKSA9PSAtMSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICBcclxuICAgICAgICBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhcIiArIG4pO1xyXG4gICAgICAgIGguc2V0QXR0cmlidXRlKFwic2VnbWVudFwiLCBcImhlYWRpbmdcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ha2VQYXJhZ3JhcGhFbGVtZW50KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3luY0hlYWRpbmdDb250ZW50KGVkaXRvcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBoID0gZWRpdG9yLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKSxcclxuICAgICAgICAgICAgbGlua2VyID0gZWRpdG9yLmdldEF0dHJpYnV0ZShcImxpbmtlclwiKSxcclxuICAgICAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFJbWFnZVwiKS5xdWVyeVNlbGVjdG9yKFwiZGl2W2xpbmtlcj0nXCIgKyBsaW5rZXIgKyBcIiddXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBoLmlubmVySFRNTDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBzZXRGcm9tT3JUbyhjb250cm9sbGVyLCBlZGl0b3IpIHtcclxuICAgICAgICBpZiAoIWNvbnRyb2xsZXIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldEhhbmRsZXIoXCJGaWd1cmVcIikuc2V0RnJvbU9yVG8oY29udHJvbGxlciwgZWRpdG9yLmdldEF0dHJpYnV0ZSgnZGlhLWlkJykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIHN0YXJ0RHJhZyhlZGl0b3IsIGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGRyYWdPZmZzZXQgPSB7XHJcbiAgICAgICAgICAgIHg6IGV2ZW50Lm9mZnNldFgsXHJcbiAgICAgICAgICAgIHk6IGV2ZW50Lm9mZnNldFlcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZG9EcmFnKTtcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBlbmREcmFnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZG9EcmFnKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBwUmVjdCA9IGVkaXRvci5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICAgICAgZHJhZ1ggPSBldmVudC5jbGllbnRYIC0gcFJlY3QubGVmdCAtIGRyYWdPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgIGRyYWdZID0gZXZlbnQuY2xpZW50WSAtIHBSZWN0LnRvcCAtIGRyYWdPZmZzZXQueTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRyYWdYID0gZHJhZ1ggLSAoZHJhZ1ggJSA1KTtcclxuICAgICAgICAgICAgZHJhZ1kgPSBkcmFnWSAtIChkcmFnWSAlIDUpO1xyXG5cclxuICAgICAgICAgICAgZWRpdG9yLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwidG9wOiBcIiArIE1hdGguZmxvb3IoZHJhZ1kpICsgXCJweDsgbGVmdDogXCIgKyBNYXRoLmZsb29yKGRyYWdYKSArIFwicHg7XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZW5kRHJhZyhldmVudCkge1xyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRvRHJhZyk7XHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGVuZERyYWcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZpZyA9IGhhbmRsZXIuZ2V0SGFuZGxlcihcIkZpZ3VyZVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpZy5maWd1cmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxudmFyIGFwcCA9IG5ldyBBcHBsaWNhdGlvbjtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9