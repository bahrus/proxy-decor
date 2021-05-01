import { xc } from 'xtal-element/lib/XtalCore.js';
export class ProxyDecor extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
ProxyDecor.is = 'proxy-decor';
const propActions = [];
const baseProp = {
    async: true,
    dry: true,
};
const objProp1 = {
    type: Object
};
const propDefMap = {
    proxy: objProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyDecor, slicedPropDefs, 'onPropChange');
xc.define(ProxyDecor);
