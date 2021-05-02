import {xc, IReactor, IInternals, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {eventName} from 'xtal-decor/xtal-decor.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';
import {IProxyDecorProps} from './types.d.js';

/**
 * @element proxy-decor
 */
export class ProxyDecor extends HTMLElement implements ReactiveSurface, IProxyDecorProps{
    static is='proxy-decor';
    proxy: any;
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    connectedCallback(){
        xc.hydrate(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
type P = ProxyDecor;
const onSetProxy = ({self, proxy}: P) => {
    self.style.display = 'none';
    proxy.addEventListener(eventName, (e: CustomEvent) => {
        self.dispatchEvent(new CustomEvent(camelToLisp(e.detail.key) + '-changed', {
            detail: {
                value: e.detail.value
            }
        }));
    });
}
const propActions = [onSetProxy] as PropAction[];
const baseProp: PropDef = {
    async: true,
    dry: true,
};
const objProp1: PropDef = {
    type: Object,
    stopReactionsIfFalsy: true,
};
const propDefMap: PropDefMap<P> = {
    proxy: objProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyDecor, slicedPropDefs, 'onPropChange');
xc.define(ProxyDecor);

declare global {
    interface HTMLElementTagNameMap {
        'proxy-decor': ProxyDecor;
    }
}
