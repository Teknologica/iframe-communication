window.Foobar = function () {
    const remoteFieldSrc = 'https://teknologica.github.io/iframe-communication/field.html';

    const Element = function (target) {
        const parent = document.createElement('div');
        const iframe = document.createElement('iframe');

        parent.className = 'foobar-outer-element';
        parent.setAttribute('data-foobar-internal', target.getAttribute('data-foobar'));
        iframe.setAttribute('src', remoteFieldSrc);
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('border', '0');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('style', 'background: transparent; width: 100%; height: 100%;');

        target.appendChild(parent);
        parent.appendChild(iframe);

        this.parent = parent;
        this.iframe = iframe;
    };

    const Foobar = function () {
        this.mounted = [];
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
    };

    return new Foobar();
}();
