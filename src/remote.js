window.Foobar = function () {
    const remoteFieldSrc = 'https://teknologica.github.io/iframe-communication/';

    function getRemote(page) {
        return remoteFieldSrc + page + '.html';
    }

    const Element = function (target) {
        const parent = document.createElement('div');
        parent.setAttribute('data-foobar-internal', target.getAttribute('data-foobar'));
        const iframe = Element.createIframe(getRemote('field'));
        parent.className = 'foobar-outer-element';
        target.appendChild(parent);
        parent.appendChild(iframe);

        this.parent = parent;
        this.iframe = iframe;
    };

    Element.createIframe = function (url, style, id) {
        const iframe = document.createElement('iframe');
        const appliedStyle = style || 'background: transparent; width: 100%; height: 100%;';
        iframe.setAttribute('src', url);
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('border', '0');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('style', appliedStyle);

        return iframe;
    };

    const Foobar = function () {
        this.mounted = [];
        this.controller = null;
    };

    Foobar.prototype.prepare = function () {
        const controller = Element.createIframe(getRemote('link'), 'width:0;height:0');
        document.body.appendChild(controller);
        this.controller = controller;

        window.addEventListener('message', this.relay, false);
    };

    Foobar.prototype.relay = function (evt) {
        console.log('Relaying: ' + evt.data);
    };

    Foobar.prototype.mount = function (target) {
        const element = document.querySelector(target);
        if (element !== null) {
            const mounted = new Element(element);
            this.register(mounted);
            return mounted;
        } else {
            throw new Error('unable to find target for mount');
        }
    };

    Foobar.prototype.register = function (element) {
        this.mounted.push(element);
        this.controller.contentWindow.postMessage('register', '*');
    };

    return new Foobar();
}();
