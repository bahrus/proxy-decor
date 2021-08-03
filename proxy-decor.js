import { xc } from 'xtal-element/lib/XtalCore.js';
import { eventName } from 'xtal-decor/xtal-decor.js';
import { camelToLisp } from 'trans-render/lib/camelToLisp.js';
/**
 * @element proxy-decor
 */
export class ProxyDecor extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    setProxy(proxy, name) {
        const aThis = this;
        const originalVal = aThis[name];
        if (originalVal !== undefined)
            Object.assign(proxy, originalVal);
        aThis[name] = proxy;
        proxy.addEventListener(eventName, (e) => {
            const detail = e.detail;
            const nameOfEvent = (detail.isVirtualProp ? detail.customAttr + ":" : '') + camelToLisp(detail.prop) + '-changed';
            self.dispatchEvent(new CustomEvent(nameOfEvent, {
                detail: {
                    value: e.detail.value,
                    proxyEventDetail: detail
                }
            }));
        });
    }
}
ProxyDecor.is = 'proxy-decor';
const propActions = [];
xc.define(ProxyDecor);
