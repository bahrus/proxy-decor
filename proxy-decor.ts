import {ProxyEventDetail} from 'xtal-decor/types.d.js';
import {ProxyDecorMethods} from './types.js';
import {eventName} from 'xtal-decor/xtal-decor.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';

/**
 * @element proxy-decor
 * @tag proxy-decor
 */
export class ProxyDecor extends HTMLElement{
    static is = 'proxy-decor';

    setProxy(proxy: any, name: string){
        const aThis = this as any;
        const originalVal = aThis[name];
        if(originalVal !== undefined) Object.assign(proxy, originalVal);
        aThis[name] = proxy;
        proxy.addEventListener(eventName, (e: CustomEvent) => {
            const detail = e.detail as ProxyEventDetail;
            const nameOfEvent = (detail.isVirtualProp ? detail.customAttr + ":" : '') + camelToLisp(detail.prop) + '-changed';
            aThis.dispatchEvent(new CustomEvent(nameOfEvent, {
                detail: {
                    value: e.detail.value,
                    proxyEventDetail: detail
                }
            }));
        });
    }
}

customElements.define(ProxyDecor.is, ProxyDecor);

declare global {
    interface HTMLElementTagNameMap {
        'proxy-decor': ProxyDecor;
    }
}