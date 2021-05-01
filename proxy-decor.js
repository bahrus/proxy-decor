import { xc } from 'xtal-element/lib/XtalCore.js';
import { eventName } from 'xtal-decor/xtal-decor.js';
import { camelToLisp } from 'trans-render/lib/camelToLisp.js';
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
const onSetProxy = ({ self, proxy }) => {
    proxy.addEventListener(eventName, (e) => {
        self.dispatchEvent(new CustomEvent(camelToLisp(e.detail.key) + '-changed', {
            detail: {
                value: e.detail.value
            }
        }));
    });
};
const propActions = [onSetProxy];
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
