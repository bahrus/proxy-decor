import {xc, IReactor, IInternals, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
export class ProxyDecor extends HTMLElement implements ReactiveSurface{
    static is='proxy-decor';
    proxy: any;
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);
    connectedCallback(){
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
type P = ProxyDecor
const propActions = [] as PropAction[];
const baseProp: PropDef = {
    async: true,
    dry: true,
};
const objProp1: PropDef = {
    type: Object
}
const propDefMap: PropDefMap<P> = {
    proxy: objProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(ProxyDecor, slicedPropDefs, 'onPropChange');
xc.define(ProxyDecor);
