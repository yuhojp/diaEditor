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

    save() {

        var saveKeys = this.getSaveKeys(),
            handlers = this.getHandlers(),
            data;

        data = saveKeys.reduce(function(acc, key) {
            return Object.assign(acc, handlers[key].save());
        }, {});

        var aTag = document.createElement("a"),
            dName = "ponch.txt",
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
        var buildKey = key ? key + '_' + this.getHandlerName() : this.getHandlerName(),
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

        if (block.test(tag)) {
            data = tag.match(block);
        } else if(inline.test(tag)) {
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
        var attrsPairs = attrData.split(' '),
            dest = {},
            k, v;

        attrsPairs.forEach(function (pair) {
            [k, v] = pair.split('=');
            if (v) {
                dest[k] = v.replace(/^'|'$/ug, "");
            }
        });

        return dest;
    }

    makeContent(element, content) {
        element.appendChild(document.createTextNode(content));
    }

    modelToElement(buildModel, buildKey) {
        return this.planToElement(this.modelToPlan(buildModel, buildKey));
    }


    addElement(parent, child) {
        parent.appendChild(child);
    }

    putSelection(elm) {
        window.getSelection().getRangeAt(0).setStart(elm, 0);
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
            "click, , showFigures": [
                [ this.showFigureMenu, false ],
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
                "tag": "<div id='PonchNavigation' handler='NavigationBar'></div>",
                "children": [
                    "insert",
                    "figure",
                    "save",
                    "load",
                ]
            },
            "insert": {
                "tag": "<span class='PonchCommand' operation='insertBox' trigger='click'>insert</span>",
                "children": []
            },
            "figure": {
                "tag": "<span class='PonchCommand' operation='showFigures'>figure</span>"
            },
            "save": {
                "tag": "<span class='PonchCommand' operation='save' trigger='click'>save</span>"
            },
            "load": {
                "tag": "<label class='PonchCommand'>load</label>",
                "children": [
                    "loadInput",
                ]
            },
            "loadInput": {
                "tag": "<input operation='load' type='file'>"
            }
        };
    }

    makeBuildLocation() {
        return {
            'init': '#PonchHeader'
        };
    }

    insertBox() {
        var box = this.getHandler("Box");

        box.insert();
    }

    showFigureMenu() {
        var figure = this.getHandler("Figure");

        figure.showStatus();
    }

    save() {
        this.getApp().save();
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
        return { Ponch_Figure: this.plan };
    }

    load(data) {
        var keys = Object.keys(data);

        this.plan = data["Ponch_Figure"];
    }


    makeListeners() {
        return {
            "click, , create": [
                [ this.create, false ],
            ],
            "click, , store": [
                [ this.store, false ],
            ],
            "click, , cancel": [
                [ this.cancel, false ],
            ],
            "click, , edit": [
                [ this.edit, false ],
            ],
            "click, , delete": [
                [ this.destroy, false ],
            ],
            "inserted": [
                [ this.expandCanvas, false ],
            ]
        };
    }

    makeBuildModel() {
        return {
            "Figure": {
                "tag": "<canvas id='PonchFigure' width='500' height='500'></canvas>",
            },
            "status": {
                "tag": "<div class='figure-status' handler='Figure'></div>",
                "children": [
                    "title",
                    "show",
                    "edit",
                ]
            },
            "title": {
                "tag": "<div class='figure-title'>status</div>"
            },

            "show": {
                "tag": "<div class='figure-show'></div>",
                "children": [
                    "list",
                    "show-menu",
                ]
            },
            "list": {
                "tag": "<div class='figure-list'></div>"
            },
            "show-menu": {
                "tag": "<div class='figure-show-menu'></div>",
                "children": [
                    "create",
                ]
            },
            "create": {
                "tag": "<div class='figure-create' operation='create'>create</div>"
            },

            "edit": {
                "tag": "<div class='figure-edit'></div>",
                "children": [
                    "panel",
                    "edit-menu",
                ]
            },
            "panel": {
                "tag": "<div class='figure-panel'></div>"
            },
            "edit-menu": {
                "tag": "<div class='figure-edit-menu'></div>",
                "children": [
                    "store",
                    "cancel",
                ]
            },
            "store": {
                "tag": "<div class='figure-store' operation='store'>store</div>"
            },
            "cancel": {
                "tag": "<div class='figure-cancel' operation='cancel'>cancel</div>"
            },

            "create-list": {
                "tag": "<select class='figure-create-list'></select>"
            }
        };
    }

    makeBuildLocation() {
        return {
            'init': "#PonchImage",
            'status': "#PonchImage",
        }
    }


    expandCanvas() {
        var editor = document.getElementById('PonchFigure'),
            image = document.getElementById('PonchImage'),
            rect = image.getBoundingClientRect();

        editor.setAttribute('width', rect.width);
        editor.setAttribute('height', rect.height);
    }

    showStatus() {
        if (document.querySelector('.figure-status')) {
            document.querySelector('.figure-status').parentNode.removeChild(document.querySelector('.figure-status'));
        } else {
            var build = this.build('status'),
                loc = this.getBuildLocation('status'),
                list = build.querySelector('figure-list');

            build.querySelector(".figure-edit").classList.add("figure-n");

            loc.appendChild(build);
        }

        var figureList = this.makeFigureList();
        build.querySelector(".figure-list").appendChild(figureList);

        var box = this.getHandler("Box"),
            ids = box.ids,
            from = this.build('create-list'),
            to = this.build('create-list'),
            c1 = document.createElement("input");

        c1.setAttribute("type", "color");

        for (let i = 0; i < ids.length; i++) {
            var op1 = document.createElement("option"),
                op2 = document.createElement("option");

            op1.appendChild(document.createTextNode(ids[i]));
            op2.appendChild(document.createTextNode(ids[i]));

            op1.setAttribute('value', ids[i]);
            op2.setAttribute('value', ids[i]);

            from.appendChild(op1);
            to.appendChild(op2);
        }

        document.querySelector('.figure-panel').appendChild(from);
        document.querySelector('.figure-panel').appendChild(to);
        document.querySelector(".figure-panel").appendChild(c1);
    }

    makeFigureList() {
        var plan = this.plan,
            figureList = document.createElement("ul");

        for (let i = 0; i < plan.length; i++) {
            var list = document.createElement("li"),
                from = document.createElement("span"),
                to = document.createElement("span"),
                edit = document.createElement("span"),
                destroy = document.createElement("span");

            from.appendChild(document.createTextNode(plan[i][0]));
            to.appendChild(document.createTextNode(plan[i][1]));
            edit.appendChild(document.createTextNode('edit'));
            destroy.appendChild(document.createTextNode('delete'));

            from.setAttribute('list-from-value', plan[i][0]);
            to.setAttribute('list-to-value', plan[i][1]);
            edit.setAttribute('operation', 'edit');
            destroy.setAttribute('operation', 'delete');

            list.appendChild(from);
            list.appendChild(to);
            list.appendChild(edit);
            list.appendChild(destroy);

            figureList.appendChild(list);
        }

        return figureList;
    }

    create() {
        document.querySelector('.figure-show').classList.add("figure-n");
        document.querySelector(".figure-edit").classList.remove("figure-n");
    }

    store() {
        document.querySelector('.figure-edit').classList.add("figure-n");
        document.querySelector(".figure-show").classList.remove("figure-n");

        var lists = document.querySelectorAll('.figure-create-list'),
            from = lists[0].options[lists[0].selectedIndex].value,
            to = lists[1].options[lists[1].selectedIndex].value,
            color = document.querySelector('.figure-panel input[type="color"]').value;

        if (this.editingIndex >= 0) {
            this.plan.splice(this.editingIndex, 1);

            this.editingIndex = null;
        }

        if (from !== to) {
            this.plan.push([from, to, color]);

            this.figure();
        }
    }

    edit(event) {
        var list = event.target.parentNode,
            fromValue = list.querySelector('span[list-from-value]').getAttribute('list-from-value'),
            toValue = list.querySelector('span[list-to-value]').getAttribute('list-to-value'),
            plan = this.plan;

        for (let i = 0; i < plan.length; i++) {
            if (plan[i][0] === fromValue && plan[i][1] === toValue) {
                this.editingIndex = i;
                break;
            }
        }

        document.querySelector('.figure-show').classList.add("figure-n");
        document.querySelector(".figure-edit").classList.remove("figure-n");

        var lists = document.querySelectorAll('.figure-create-list'),
            from = lists[0].options[lists[0].selectedIndex].value,
            to = lists[1].options[lists[1].selectedIndex].value;

        lists[0].querySelector('option[value="' + plan[this.editingIndex][0] + '"]').setAttribute('selected', true);
        lists[1].querySelector('option[value="' + plan[this.editingIndex][1] + '"]').setAttribute('selected', true);
    }

    destroy(event) {
        var list = event.target.parentNode,
            fromValue = list.querySelector('span[list-from-value]').getAttribute('list-from-value'),
            toValue = list.querySelector('span[list-to-value]').getAttribute('list-to-value'),
            plan = this.plan;

        for (let i = 0; i < plan.length; i++) {
            if (plan[i][0] === fromValue && plan[i][1] === toValue) {
                plan.splice(i, 1);
            }
        }

        this.figure();
    }

    cancel() {
        document.querySelector('.figure-edit').classList.add("figure-n");
        document.querySelector(".figure-show").classList.remove("figure-n");

        this.figure();
    }

    figure() {

        this.refreshCanvas();

        var canvas = document.getElementById("PonchFigure");
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.beginPath();

            for (let i = 0; i < this.plan.length; i++) {
                var pair = this.plan[i],
                    fElem = document.querySelector('.PonchCursor[ponch-id="' + pair[0] + '"]'),
                    tElem = document.querySelector('.PonchCursor[ponch-id="' + pair[1] + '"]'),
                    from = this.getFromCord(canvas, fElem, tElem),
                    to = this.getToCord(canvas, fElem, tElem),
                    color = pair[2];

                console.log("from & to");
                console.log(from);
                console.log(to);

                ctx.strokeStyle = color;

                ctx.moveTo(from.left, from.top);
                ctx.lineTo(to.left, to.top);
                ctx.stroke();
            }
        }

    }

    getCord(p, e) {
        var pRect = p.getBoundingClientRect(),
            eRect = e.getBoundingClientRect();

        console.log(pRect.width);

        return { left: eRect.left - pRect.left, top: eRect.top - pRect.top };
    }

    getFromCord(p, f, t) {
        var pRect = p.getBoundingClientRect(),
            fRect = f.getBoundingClientRect(),
            tRect = t.getBoundingClientRect(),
            w = (fRect.left + fRect.width/2) - (tRect.left + tRect.width/2) - pRect.left,
            h = (fRect.top + fRect.height/2) - (tRect.top + tRect.height/2) - pRect.top;

        console.log("getFromCord");
        console.log("w:\t" + w);
        console.log("h:\t" + h);

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

        console.log("getToCord");
        console.log("w:\t" + w);
        console.log("h:\t" + h);

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

    refreshCanvas() {
        var canvas = document.getElementById('PonchFigure'),
            width = canvas.getAttribute('width'),
            height = canvas.getAttribute('height');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, width, height);
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

    load(data) {
        var keys = Object.keys(data);

        for (let key of keys) {
            if (data[key]["handler"] == "Box") {
                this.insert(data[key]["box"], data[key]["cursor"], data[key]["id"]);
            }
        }
    }

    makeSaveData(data) {

        return data.reduce(function(acc, elements, index) {
            var name = "Ponch_" + "Box_" + index;

            acc[name] = elements.reduce(function(accIn, element) {
                if (element.getAttribute("class") == "PonchBox") {
                    accIn["box"] = element.innerHTML;
                    accIn.handler = "Box";
                    accIn.id = element.getAttribute('ponch-id');
                } else if (element.getAttribute("class") == "PonchCursor") {
                    accIn["cursor"] = element.getAttribute("style");
                }
                return accIn;
            }, {});


            return acc;
        }, {});
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
            "click, heading": [
                [ this.syncHeadingContent, false ],
            ]
        };
    }

    makeBuildModel() {
        return {
            "Box": {
                "tag": "<div class='PonchBox' contenteditable='true' handler='Box'></div>",
            },
            "cursor": {
                "tag": "<div class='PonchCursor' handler='Box' segment='cursor'></div>",
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
            "insert": "#PonchText",
            "insertCursor": "#PonchImage",
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

        if (box.hasAttribute("ponch-id")) {
            cursor.setAttribute("ponch-id", id);
            this.ids.push(box.getAttribute("ponch-id"));
        } else {
            box.setAttribute("ponch-id", id);
            cursor.setAttribute("ponch-id", id);
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


    insertHeading(editor) {

        var heading = this.build("heading");

        this.addElement(editor, heading);

        this.putSelection(heading);
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
            target = document.getElementById("PonchImage").querySelector("div[linker='" + linker + "']");

        target.innerHTML = h.innerHTML;
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

            var fig = handler.getHandler("Figure");

            fig.figure();
        }
    }
}



var app = new Application;





