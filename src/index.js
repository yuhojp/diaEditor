import "./css/reset.css";
import "./css/styles.scss";

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





