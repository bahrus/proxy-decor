import {xc, IReactor, IInternals, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {eventName} from 'xtal-decor/xtal-decor.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';
import {ProxyEventDetail} from 'xtal-decor/types.d.js';
import {ProxyDecorMethods} from './types.d.js';
/**
 * @element proxy-decor
 */
export class ProxyDecor extends HTMLElement implements ReactiveSurface, ProxyDecorMethods{
    static is='proxy-decor';
    proxy: any;
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }

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
type P = ProxyDecor;

const propActions = [] as PropAction[];
xc.define(ProxyDecor);

declare global {
    interface HTMLElementTagNameMap {
        'proxy-decor': ProxyDecor;
    }
}
