export interface ProxyDecorProps{
    proxy: any;
}

export interface ProxyDecorMethods extends HTMLElement{
    setProxy(proxy: any, name: string): void;
}

