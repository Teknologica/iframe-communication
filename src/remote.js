window.Foobar = function () {
    const remoteFieldSrc = 'https://teknologica.github.io/iframe-communication/';

    function getRemote(page) {
        return remoteFieldSrc + page + '.html';
    }

    const Element = function (target, name) {
        const parent = document.createElement('div');
        parent.setAttribute('data-foobar-internal', target.getAttribute('data-foobar'));
        const iframe = Element.createIframe(getRemote('field'), '', name);
        parent.className = 'foobar-outer-element';
        target.appendChild(parent);
        parent.appendChild(iframe);

        this.parent = parent;
        this.iframe = iframe;
    };

    Element.createIframe = function (url, style, name) {
        const iframe = document.createElement('iframe');
        const appliedStyle = style || 'background: transparent; width: 100%; height: 100%;';
        iframe.setAttribute('src', url);
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('border', '0');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('style', appliedStyle);
        iframe.setAttribute('name', name);

        return iframe;
    };

    const Foobar = function () {
        this.mounted = [];
        this.controller = null;
        this.frameCount = 0;
    };

    Foobar.prototype.prepare = function () {
        const controller = Element.createIframe(getRemote('link'), 'width:0;height:0', 'controller-0');
        document.body.appendChild(controller);
        this.controller = controller;
        controller.onload = function () {
            console.log('controller is ready');
        };

        window.addEventListener('message', this.relay, false);
    };

    Foobar.prototype.relay = function (evt) {
        console.log('received relay: ' + evt.data);
    };

    Foobar.prototype.mount = function (target) {
        const element = document.querySelector(target);
        if (element !== null) {
            this.frameCount += 1;
            const mounted = new Element(element, 'frame-' + this.frameCount);
            this.register(mounted);
            return mounted;
        } else {
            throw new Error('unable to find target for mount');
        }
    };

    Foobar.prototype.register = function (element) {
        this.mounted.push(element);
        const self = this;
        element.iframe.onload = function () {
            self.controller.contentWindow.postMessage('resister:'+element.iframe.getAttribute('name'), '*');
        };
    };

    return new Foobar();
}();
